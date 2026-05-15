import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendWelcomeEmail } from "@/lib/email";
import type { WaitlistUser } from "@/lib/types";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function generateCode(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

export async function POST(req: NextRequest) {
  const { email, referredBy, name, avatarUrl } = await req.json();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  const normalizedEmail = email.toLowerCase().trim();

  // Return existing user silently (idempotent join)
  const { data: existing } = await supabase
    .from("waitlist_users")
    .select()
    .eq("email", normalizedEmail)
    .single();

  if (existing) {
    return NextResponse.json({ user: existing, alreadyJoined: true });
  }

  const { data, error } = await supabase
    .from("waitlist_users")
    .insert({
      email: normalizedEmail,
      name: name ?? null,
      avatar_url: avatarUrl ?? null,
      referral_code: generateCode(),
      referred_by: referredBy ?? null,
    })
    .select()
    .single();

  if (error) {
    // Race condition: another insert won — fetch and return
    if (error.code === "23505") {
      const { data: race } = await supabase
        .from("waitlist_users")
        .select()
        .eq("email", normalizedEmail)
        .single();
      return NextResponse.json({ user: race, alreadyJoined: true });
    }
    console.error("waitlist insert:", error);
    return NextResponse.json({ error: "Failed to join. Please try again." }, { status: 500 });
  }

  // Fire-and-forget — don't block the response on email delivery
  sendWelcomeEmail(data as WaitlistUser);

  return NextResponse.json({ user: data });
}
