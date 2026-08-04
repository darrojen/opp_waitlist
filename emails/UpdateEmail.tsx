import * as React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Text,
} from "@react-email/components";

import { LOGO_FULL_URI, LOGO_LIGHT_URI } from "./logo-b64";
import type { WaitlistUser } from "../lib/types";

interface Props {
  user?: WaitlistUser;
  siteUrl?: string;
}

export default function UpdateEmail({
  user,
  siteUrl = "https://opphex.com",
}: Props) {
  const firstName = user?.name?.split(" ")[0] ?? "there";

  return (
    <Html lang="en">
      <Head />
      <Preview>We're pushing our launch to November 21 — here's why</Preview>
      <Body style={s.body}>
        <Container style={s.container}>
          {/* ── Top logo ── */}
          <Img
            src="https://res.cloudinary.com/do6ir0tyv/image/upload/v1785852691/centre_n7shsy.svg"
            alt="Opphex"
            height={27}
            style={s.topLogo}
          />

          <Text style={s.text}>Hi {firstName},</Text>

          <Text style={s.text}>
            Building this the right way is taking longer than we expected,
            and we'd rather ship something that actually works well than
            rush it out to hit a date. We're using the extra time to line
            up more opportunities and tighten up the experience so it's
            genuinely useful the moment you get in.
          </Text>

          <Text style={s.text}>
            Your waitlist spot is safe and nothing changes on your end —
            we'll keep you posted as we get closer.
          </Text>

          <Text style={s.text}>
            Thanks for your patience. This one's worth the wait.
          </Text>

          <Text style={s.text}>- The Opphex Team</Text>

          {/* ── CTA ── */}
          <Button href={siteUrl} style={s.ctaButton}>
            See days remaining
          </Button>

          <Hr style={s.divider} />

          {/* ── Footer ── */}
          <Img
            src="https://res.cloudinary.com/do6ir0tyv/image/upload/v1785854236/buttom_fy2tju.png"
            alt="Opphex"
            height={25}

            style={{
    ...s.bottomLogo
  }}
          />

          <Text style={s.footerLinks}>
            <Link href={`${siteUrl}/about`} style={s.footerLink}>About</Link>
            {"  ·  "}
            <Link href={`${siteUrl}/privacy`} style={s.footerLink}>Privacy Policy</Link>
            {"  ·  "}
            <Link href="mailto:hello@opphex.com" style={s.footerLink}>Contact</Link>
          </Text>

          <Text style={s.footerCopy}>
            © 2026 Opphex. All rights reserved.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const s = {
  body: {
    margin: 0,
    padding: "40px 16px",
    background: "#ffffff",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  container: { maxWidth: "480px", margin: "0 auto" },
  topLogo: { display: "block", margin: "0 0 32px" },
  text: {
    fontSize: "15px",
    lineHeight: "1.65",
    color: "#222",
    margin: "0 0 16px",
  },
  ctaButton: {
    display: "inline-block",
    background: "#e97f3b",
    color: "#fff",
    borderRadius: "100px",
    padding: "13px 28px",
    fontSize: "14px",
    fontWeight: 700,
    textDecoration: "none",
    letterSpacing: "-0.01em",
    margin: "12px 0 8px",
  },
  divider: {
    border: "none",
    borderTop: "1px solid #f0f0f0",
    margin: "32px 0 24px",
  },
  bottomLogo: {
    display: "block",
    margin: "0 0 16px",
    opacity: 0.35,
  },
  footerLinks: {
    margin: "0 0 12px",
    fontSize: "12px",
    color: "#aaa",
  },
  footerLink: { color: "#999", textDecoration: "none", fontSize: "12px" },
  footerCopy: {
    margin: 0,
    fontSize: "11px",
    color: "#ccc",
    lineHeight: "1.6",
  },
} satisfies Record<string, React.CSSProperties>;