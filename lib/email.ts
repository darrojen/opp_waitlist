import { render } from "@react-email/components";
import { Resend } from "resend";
import * as React from "react";

import WelcomeEmail from "@/emails/WelcomeEmail";
import type { WaitlistUser } from "./types";

const resend  = new Resend(process.env.RESEND_API_KEY);
const FROM    = process.env.RESEND_FROM    ?? "Opphex <onboarding@resend.dev>";
const SITE    = process.env.NEXT_PUBLIC_SITE_URL ?? "https://opphex.com";

export async function sendWelcomeEmail(user: WaitlistUser): Promise<void> {
  try {
    const firstName = user.name?.split(" ")[0];
    const subject   = firstName
      ? `${firstName}, you're on the Opphex waitlist 🎉`
      : "You're on the Opphex waitlist 🎉";

    const html = await render(React.createElement(WelcomeEmail, { user, siteUrl: SITE }));

    const { data, error } = await resend.emails.send({ from: FROM, to: user.email, subject, html });
    if (error) console.error("[email] Resend error:", error);
    else console.log("[email] Sent to", user.email, "id:", data?.id);
  } catch (err) {
    console.error("[email] sendWelcomeEmail threw:", err);
  }
}
