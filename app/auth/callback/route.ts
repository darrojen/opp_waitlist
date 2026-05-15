import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { sendWelcomeEmail } from "@/lib/email";
import type { WaitlistUser } from "@/lib/types";

function generateCode(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(`${origin}/`);
  }

  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { session }, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error || !session) {
    console.error("exchangeCodeForSession failed:", error?.message);
    return NextResponse.redirect(`${origin}/`);
  }

  const { user } = session;
  const email     = user.email!.toLowerCase();
  const name      = user.user_metadata?.full_name ?? user.user_metadata?.name ?? null;
  const avatarUrl = user.user_metadata?.avatar_url ?? user.user_metadata?.picture ?? null;
  const refCode   = request.cookies.get("opphex_ref")?.value ?? null;

  const { data: existing, error: selectError } = await supabase
    .from("waitlist_users")
    .select()
    .eq("email", email)
    .single();

  if (selectError && selectError.code !== "PGRST116") {
    console.error("waitlist select:", selectError.message);
  }

  if (!existing) {
    const { data: inserted, error: insertError } = await supabase
      .from("waitlist_users")
      .insert({
        email,
        name,
        avatar_url: avatarUrl,
        referral_code: generateCode(),
        referred_by: refCode,
        google_id: user.id,
      })
      .select()
      .single();
    if (insertError) {
      console.error("waitlist insert:", insertError.message);
    } else if (inserted) {
      sendWelcomeEmail(inserted as WaitlistUser);
    }
  } else if (!existing.google_id) {
    const { error: updateError } = await supabase
      .from("waitlist_users")
      .update({
        google_id: user.id,
        name: existing.name ?? name,
        avatar_url: existing.avatar_url ?? avatarUrl,
      })
      .eq("email", email);
    if (updateError) console.error("waitlist update:", updateError.message);
  }

  const response = NextResponse.redirect(`${origin}/?joined=true`);
  response.cookies.set("opphex_ref", "", { maxAge: 0, path: "/" });
  return response;
}
