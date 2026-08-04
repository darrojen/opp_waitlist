// // scripts/send-update-email.ts
// import "dotenv/config";
// import { createClient } from "@supabase/supabase-js";
// import { Resend } from "resend";
// import { render } from "@react-email/render";
// import UpdateEmail from "../emails/UpdateEmail";
// import type { WaitlistUser } from "../lib/types";

// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.SUPABASE_SERVICE_ROLE_KEY! 
// );

// const resend = new Resend(process.env.RESEND_API_KEY!);

// const BATCH_SIZE = 100;
// const DELAY_MS = 600; 

// function chunk<T>(arr: T[], size: number): T[][] {
//   const out: T[][] = [];
//   for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
//   return out;
// }

// async function main() {
//   const { data: users, error } = await supabase
//     .from("waitlist_users")
//     .select("*")
//     .is("update_email_sent_at", null);

//   if (error) throw error;
//   if (!users || users.length === 0) {
//     console.log("Nobody to send to — all caught up.");
//     return;
//   }

//   console.log(`Sending to ${users.length} users...`);

//   const batches = chunk(users as WaitlistUser[], BATCH_SIZE);

//   for (const [i, batch] of batches.entries()) {
//     const payload = await Promise.all(
//       batch.map(async (user) => ({
//         from: "Opphex <hello@opphex.com>", // must match a verified domain in Resend
//         to: user.email,
//         subject: "We're pushing our launch to November 21 — here's why",
//         html: await render(UpdateEmail({ user })),
//       }))
//     );

//     const { data, error: sendError } = await resend.batch.send(payload);

//     if (sendError) {
//       console.error(`Batch ${i + 1} failed:`, sendError);
//       continue; // skip marking this batch as sent — safe to retry later
//     }

//     // Only mark as sent AFTER Resend confirms the batch went out
//     const ids = batch.map((u) => u.id);
//     const { error: updateError } = await supabase
//       .from("waitlist_users")
//       .update({ update_email_sent_at: new Date().toISOString() })
//       .in("id", ids);

//     if (updateError) {
//       console.error(`Batch ${i + 1} sent but failed to mark as sent:`, updateError);
//       // worth logging these IDs somewhere — rerunning would resend to them
//     } else {
//       console.log(`Batch ${i + 1}/${batches.length} sent and marked (${batch.length} emails).`);
//     }

//     if (i < batches.length - 1) {
//       await new Promise((r) => setTimeout(r, DELAY_MS));
//     }
//   }

//   console.log("Done.");
// }

// main().catch((err) => {
//   console.error("Script failed:", err);
//   process.exit(1);
// });


// scripts/send-update-email.ts
import { config } from "dotenv";
config({ path: ".env.local" });
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { render } from "@react-email/render";
import UpdateEmail from "../emails/UpdateEmail";
import type { WaitlistUser } from "../lib/types";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY!);

const BATCH_SIZE = 100;
const DELAY_MS = 600;

// ── Test mode ───────────────────────────────────────────────
// Run with: npx tsx scripts/send-update-email.ts --test=you@example.com
const testArg = process.argv.find((arg) => arg.startsWith("--test="));
const TEST_EMAIL = testArg ? testArg.split("=")[1] : null;

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

async function main() {
  let users: WaitlistUser[];

  if (TEST_EMAIL) {
    console.log(`TEST MODE — sending only to ${TEST_EMAIL}, no DB writes.`);

    // Use a real user's row if it exists (so name/referral code render properly),
    // otherwise fall back to a dummy so the template still has something to show.
    const { data: existing, error } = await supabase
      .from("waitlist_users")
      .select("*")
      .eq("email", TEST_EMAIL)
      .maybeSingle();

    if (error) throw error;

    users = [
      (existing as WaitlistUser) ?? {
        id: "test",
        email: TEST_EMAIL,
        name: "Test User",
        avatar_url: null,
        referral_code: "TEST123",
        referred_by: null,
        invite_count: 0,
        position: 1,
        tier: "waitlist",
        google_id: null,
        created_at: new Date().toISOString(),
      },
    ];
  } else {
    const { data, error } = await supabase
      .from("waitlist_users")
      .select("*")
      .is("update_email_sent_at", null);

    if (error) throw error;
    if (!data || data.length === 0) {
      console.log("Nobody to send to — all caught up.");
      return;
    }
    users = data as WaitlistUser[];
  }

  console.log(`Sending to ${users.length} user(s)...`);

  const batches = chunk(users, BATCH_SIZE);

  for (const [i, batch] of batches.entries()) {
    const payload = await Promise.all(
      batch.map(async (user) => ({
        from: "Opphex <hello@opphex.com>",
        to: user.email,
        subject: "We're pushing our launch to November 21 — here's why",
        html: await render(UpdateEmail({ user })),
      }))
    );

    const { error: sendError } = await resend.batch.send(payload);

    if (sendError) {
      console.error(`Batch ${i + 1} failed:`, sendError);
      continue;
    }

    if (TEST_EMAIL) {
      console.log("Test email sent. Skipping DB update (test mode).");
      continue;
    }

    const ids = batch.map((u) => u.id);
    const { error: updateError } = await supabase
      .from("waitlist_users")
      .update({ update_email_sent_at: new Date().toISOString() })
      .in("id", ids);

    if (updateError) {
      console.error(`Batch ${i + 1} sent but failed to mark as sent:`, updateError);
    } else {
      console.log(`Batch ${i + 1}/${batches.length} sent and marked (${batch.length} emails).`);
    }

    if (i < batches.length - 1) {
      await new Promise((r) => setTimeout(r, DELAY_MS));
    }
  }

  console.log("Done.");
}

main().catch((err) => {
  console.error("Script failed:", err);
  process.exit(1);
});