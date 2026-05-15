import * as React from "react";
import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";

import { LOGO_FULL_URI, LOGO_LIGHT_URI } from "./logo-b64";
import { getNextTier, REWARD_TIERS } from "../lib/rewards";
import type { WaitlistUser } from "../lib/types";
interface Props {
  user?: WaitlistUser;
  siteUrl?: string;
}

const PREVIEW_USER: WaitlistUser = {
  id: "preview",
  email: "darlington@opphex.com",
  name: "Darlington Ogu",
  avatar_url: null,
  referral_code: "ABC123",
  referred_by: null,
  invite_count: 2,
  position: 47,
  tier: "waitlist",
  google_id: null,
  created_at: new Date().toISOString(),
};

const TIERED_REWARDS = REWARD_TIERS.filter((t) => t.invites > 0);

// ─── Sub-components ───────────────────────────────────────────────────────────

function TopLogo() {
  return <Img src={LOGO_FULL_URI} alt="Opphex" height={28} />;
}

function BottomLogo() {
  return (
    <Img
      src={LOGO_LIGHT_URI}
      alt="Opphex"
      height={22}
      style={{ opacity: 0.35, display: "block", margin: "0 auto" }}
    />
  );
}


const SOCIALS: { label: string; href: string; icon: string }[] = [
  {
    label: "X",
    href: "https://x.com/OfficialOpphex",
    icon: "https://img.icons8.com/ios-filled/50/888888/twitterx.png",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/opphex",
    icon: "https://img.icons8.com/ios-filled/50/888888/linkedin.png",
  },
  {
    label: "Instagram",
    href: "https://instagram.com/opphex",
    icon: "https://img.icons8.com/ios-filled/50/888888/instagram-new.png",
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@opphex",
    icon: "https://img.icons8.com/ios-filled/50/888888/youtube-play.png",
  },
];
export default function WelcomeEmail({
  user = PREVIEW_USER,
  siteUrl = "https://opphex.com",
}: Props) {
  const firstName   = user.name?.split(" ")[0] ?? null;
  const referralUrl = `${siteUrl}?ref=${user.referral_code}`;
  const nextTier    = getNextTier(user.invite_count);
  const needed      = nextTier ? nextTier.invites - user.invite_count : 0;

  const twitterUrl  = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    `Just joined @opphex — the best place to find hackathons, internships, fellowships and more. Join me: ${referralUrl}`
  )}`;
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(referralUrl)}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
    `Join me on Opphex — find hackathons, internships, fellowships & more 🚀 ${referralUrl}`
  )}`;

  return (
    <Html lang="en">
      <Head>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
          * { box-sizing: border-box; }
        `}</style>
      </Head>

      <Preview>
        {firstName
          ? `${firstName}, you're on the Opphex waitlist 🎉`
          : "You're on the Opphex waitlist 🎉"}
      </Preview>

      <Body style={s.body}>
        <Container style={s.container}>

          {/* ── Top logo ── */}
          <Section style={s.header}>
            <img src="https://i.imgur.com/xSWaebk.png" alt="Opphex" width={140} height="auto" />              

          </Section>

          {/* ── Hero ── */}
          <Section style={s.heroSection}>
            <div style={s.heroFallback}>
              <svg width="320" height="140" viewBox="0 0 320 140" fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ display: "block", margin: "0 auto" }}
              >
                <rect x="80" y="35" width="160" height="100" rx="10" fill="#f0f0f0" stroke="#ddd" strokeWidth="1.5"/>
                <path d="M80 45L160 93L240 45" stroke="#ccc" strokeWidth="1.5" fill="none"/>
                <rect x="30" y="20" width="36" height="28" rx="4" fill="#fff" stroke="#e0e0e0" strokeWidth="1.2" transform="rotate(-15 48 34)"/>
                <rect x="33" y="26" width="16" height="2" rx="1" fill="#ddd" transform="rotate(-15 41 27)"/>
                <rect x="33" y="31" width="22" height="2" rx="1" fill="#ddd" transform="rotate(-15 44 32)"/>
                <rect x="250" y="18" width="36" height="28" rx="4" fill="#fff" stroke="#e0e0e0" strokeWidth="1.2" transform="rotate(12 268 32)"/>
                <rect x="253" y="24" width="16" height="2" rx="1" fill="#ddd" transform="rotate(12 261 25)"/>
                <rect x="253" y="29" width="22" height="2" rx="1" fill="#ddd" transform="rotate(12 264 30)"/>
                <rect x="200" y="8" width="32" height="24" rx="4" fill="#fff" stroke="#e0e0e0" strokeWidth="1.2" transform="rotate(-8 216 20)"/>
                <rect x="90" y="60" width="28" height="22" rx="4" fill="#fff" stroke="#e0e0e0" strokeWidth="1.2" transform="rotate(20 104 71)"/>
                <circle cx="160" cy="20" r="7" fill="#e97f3b" opacity="0.15"/>
                <circle cx="160" cy="20" r="4" fill="#e97f3b" opacity="0.3"/>
                <circle cx="160" cy="20" r="2" fill="#e97f3b"/>
                <circle cx="58"  cy="68" r="5" fill="#e97f3b" opacity="0.2"/>
                <circle cx="265" cy="72" r="5" fill="#e97f3b" opacity="0.2"/>
              </svg>
            </div>
          </Section>

          {/* ── Main card ── */}
          <Section style={s.card}>

            {firstName && <Text style={s.greeting}>Hey {firstName} 👋</Text>}
            <Text style={s.headline}>You&rsquo;re on the list.</Text>
            <Text style={s.subtext}>
              Welcome to Opphex — the single destination for hackathons,
              internships, fellowships, grants, and more. We launch on{" "}
              <span style={{ color: "#111", fontWeight: 700 }}>August 7, 2026</span>.
              We&rsquo;ll notify you the moment your spot opens.
            </Text>

            <Section style={s.positionPillSection}>
              <span style={s.positionPill}>
                <span style={s.positionHash}>#</span>
                <span style={s.positionNum}>{user.position.toLocaleString()}</span>
                <span style={s.positionLabel}> in queue</span>
              </span>
            </Section>

            <Hr style={s.divider} />

            {/* Referral */}
            <Section style={s.referralSection}>
              <Text style={s.referralHeading}>Move up faster 🚀</Text>
              {nextTier ? (
                <Text style={s.referralSub}>
                  Invite{" "}
                  <strong>{needed} more friend{needed !== 1 ? "s" : ""}</strong>{" "}
                  to unlock{" "}
                  <span style={{ color: nextTier.color, fontWeight: 700 }}>{nextTier.label}</span>.
                </Text>
              ) : (
                <Text style={s.referralSub}>You&rsquo;ve unlocked every reward tier. Amazing!</Text>
              )}

              <Section style={s.codeBox}>
                <Text style={s.codeLabel}>Your invite code</Text>
                <Text style={s.code}>{user.referral_code}</Text>
              </Section>

              <Button href={referralUrl} style={s.ctaButton}>
                Share your invite link →
              </Button>

              <Text style={s.orText}>or copy your link</Text>
              <Text style={s.linkText}>{referralUrl}</Text>
            </Section>

            <Hr style={s.divider} />

            {/* Reward ladder */}
            <Section style={s.tiersSection}>
              <Text style={s.tiersHeading}>Unlock as you invite</Text>
              {TIERED_REWARDS.map((t) => {
                const isUnlocked = user.invite_count >= t.invites;
                return (
                  <Row key={t.tier} style={{ marginBottom: "12px" }}>
                    <Column style={{ width: "36px", verticalAlign: "middle" }}>
                      <div style={{
                        width: "24px", height: "24px", borderRadius: "50%",
                        background: isUnlocked ? t.color : "#f5f5f5",
                        border: `1.5px solid ${isUnlocked ? t.color : "#e8e8e8"}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        {isUnlocked && (
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path d="M2 5L4 7L8 3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
                          </svg>
                        )}
                      </div>
                    </Column>
                    <Column style={{ verticalAlign: "middle" }}>
                      <Text style={{ ...s.tierName, color: isUnlocked ? "#111" : "#888" }}>
                        {t.label}{isUnlocked && <span style={{ color: t.color, fontWeight: 500 }}> ✓</span>}
                      </Text>
                      <Text style={s.tierDesc}>{t.description}</Text>
                    </Column>
                    <Column style={{ textAlign: "right", verticalAlign: "middle", width: "60px" }}>
                      <Text style={s.tierInvites}>{t.invites.toLocaleString()}</Text>
                      <Text style={s.tierInvitesLabel}>invites</Text>
                    </Column>
                  </Row>
                );
              })}
            </Section>

          </Section>

          {/* ── Share banner ── */}
          <Section style={s.shareBanner}>
            <Text style={s.shareText}>Share on</Text>
            <Row>
              <Column style={{ textAlign: "center" }}>
                <Link href={twitterUrl} style={s.socialBtn}>𝕏 Twitter</Link>
              </Column>
              <Column style={{ textAlign: "center" }}>
                <Link href={linkedInUrl} style={s.socialBtn}>LinkedIn</Link>
              </Column>
              <Column style={{ textAlign: "center" }}>
                <Link href={whatsappUrl} style={s.socialBtn}>WhatsApp</Link>
              </Column>
            </Row>
          </Section>

          {/* ── Footer ── */}
          <Section style={s.footer}>

            {/* Social icon circles */}
            <Text style={s.followText}>Follow us</Text>
            <Row style={{ marginBottom: "24px" }}>
              {SOCIALS.map((social) => (
  <Column key={social.label} style={{ textAlign: "center" }}>
    <Link href={social.href} style={s.socialCircle}>
      <Img
        src={social.icon}
        alt={social.label}
        width={20}
        height={20}
        style={{ display: "block", margin: "0 auto" }}
      />
    </Link>
  </Column>
))}
            </Row>

            <Hr style={s.footerDivider} />

            {/* Nav links */}
            <Text style={s.footerLinks}>
              <Link href={`${siteUrl}/about`}      style={s.footerLink}>About</Link>
              {"  ·  "}
              <Link href={`${siteUrl}/privacy`}    style={s.footerLink}>Privacy Policy</Link>
              {"  ·  "}
              <Link href={`${siteUrl}/terms`}      style={s.footerLink}>Terms</Link>
              {"  ·  "}
              <Link href="mailto:hello@opphex.com" style={s.footerLink}>Contact</Link>
            </Text>

            <Hr style={s.footerDivider} />

            {/* Bottom colorless logo */}
            <Section style={{ textAlign: "center", paddingTop: "20px" }}>
<img src="https://i.imgur.com/bdxgSkd.png" alt="Opphex" width={140} height="auto" />              
            </Section>

            <Text style={s.footerCopy}>
              © 2026 Opphex. All rights reserved.{"\n"}
              Built for students, professionals, and founders worldwide.
            </Text>

          </Section>

        </Container>
      </Body>
    </Html>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const s = {
  body: {
    margin: 0,
    padding: "32px 16px 48px",
    background: "#f6f6f6",
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  container:           { maxWidth: "540px", margin: "0 auto" },
  header:              { textAlign: "center" as const, paddingBottom: "24px" },
  heroSection: {
    background: "#fff",
    borderRadius: "16px 16px 0 0",
    overflow: "hidden",
    borderBottom: "1px solid #f0f0f0",
    padding: "8px 0 0",
  },
  heroFallback:        { padding: "24px 0 0", textAlign: "center" as const },
  card:                { background: "#fff", padding: "32px 40px", borderRadius: "0 0 16px 16px" },
  greeting:            { margin: "0 0 4px", fontSize: "15px", color: "#888" },
  headline: {
    margin: "0 0 14px",
    fontSize: "38px",
    fontWeight: 900,
    lineHeight: "1.1",
    color: "#111",
    letterSpacing: "-0.03em",
  },
  subtext:             { margin: "0 0 28px", fontSize: "15px", lineHeight: "1.65", color: "#555" },
  positionPillSection: { textAlign: "center" as const, marginBottom: "28px" },
  positionPill: {
    display: "inline-block",
    background: "#fff8f4",
    border: "1.5px solid #fdd5b2",
    borderRadius: "100px",
    padding: "10px 24px",
    textAlign: "center" as const,
  },
  positionHash:        { fontSize: "20px", fontWeight: 700, color: "#e97f3b" },
  positionNum:         { fontSize: "32px", fontWeight: 900, color: "#111", letterSpacing: "-0.03em" },
  positionLabel:       { fontSize: "14px", color: "#888", fontWeight: 500 },
  divider:             { border: "none", borderTop: "1px solid #f0f0f0", margin: "0 0 28px" },
  referralSection:     { marginBottom: "8px" },
  referralHeading:     { margin: "0 0 6px", fontSize: "17px", fontWeight: 800, color: "#111" },
  referralSub:         { margin: "0 0 20px", fontSize: "14px", lineHeight: "1.55", color: "#555" },
  codeBox: {
    background: "#f9f9f9",
    border: "1.5px dashed #e0e0e0",
    borderRadius: "12px",
    padding: "14px 20px",
    marginBottom: "20px",
    textAlign: "center" as const,
  },
  codeLabel: {
    margin: "0 0 4px",
    fontSize: "10px",
    fontWeight: 700,
    letterSpacing: "0.15em",
    textTransform: "uppercase" as const,
    color: "#aaa",
  },
  code:                { margin: 0, fontSize: "26px", fontWeight: 900, letterSpacing: "0.12em", color: "#111", fontFamily: "monospace" },
  ctaButton: {
    display: "inline-block",
    background: "#e97f3b",
    color: "#fff",
    borderRadius: "100px",
    padding: "15px 32px",
    fontSize: "15px",
    fontWeight: 700,
    textDecoration: "none",
    letterSpacing: "-0.01em",
    textAlign: "center" as const,
    width: "100%",
  },
  orText: {
    margin: "16px 0 6px",
    fontSize: "11px",
    color: "#bbb",
    textAlign: "center" as const,
    textTransform: "uppercase" as const,
    letterSpacing: "0.1em",
  },
  linkText:            { margin: 0, fontSize: "12px", color: "#aaa", textAlign: "center" as const, fontFamily: "monospace", wordBreak: "break-all" as const },
  tiersSection:        { paddingTop: "4px" },
  tiersHeading: {
    margin: "0 0 18px",
    fontSize: "13px",
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase" as const,
    color: "#aaa",
  },
  tierName:            { margin: "0 0 1px", fontSize: "13px", fontWeight: 700 },
  tierDesc:            { margin: 0, fontSize: "11px", color: "#bbb" },
  tierInvites:         { margin: 0, fontSize: "15px", fontWeight: 800, color: "#111", lineHeight: "1" },
  tierInvitesLabel:    { margin: 0, fontSize: "10px", color: "#bbb" },
  shareBanner: {
    background: "#fff",
    borderRadius: "12px",
    padding: "20px 24px",
    marginTop: "12px",
    textAlign: "center" as const,
  },
  shareText: {
    margin: "0 0 14px",
    fontSize: "12px",
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase" as const,
    color: "#bbb",
    textAlign: "center" as const,
  },
  socialBtn:           { display: "inline-block", background: "#f5f5f5", color: "#333", borderRadius: "8px", padding: "10px 16px", fontSize: "12px", fontWeight: 700, textDecoration: "none" },
  // Footer
  footer:              { padding: "32px 0 0", textAlign: "center" as const },
  followText: {
    margin: "0 0 16px",
    fontSize: "13px",
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase" as const,
    color: "#aaa",
    textAlign: "center" as const,
  },
  socialCircle: {
    display: "inline-block",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    border: "1.5px solid #ddd",
    background: "#fff",
    lineHeight: "38px",
    textAlign: "center" as const,
    textDecoration: "none",
    padding: "8px",
  },
  footerDivider:       { border: "none", borderTop: "1px solid #e8e8e8", margin: "0 0 16px" },
  footerLinks:         { margin: "0 0 16px", fontSize: "12px", textAlign: "center" as const, color: "#aaa" },
  footerLink:          { color: "#999", textDecoration: "none", fontSize: "12px" },
  footerCopy: {
    margin: "12px 0 0",
    fontSize: "11px",
    color: "#ccc",
    textAlign: "center" as const,
    lineHeight: "1.6",
    whiteSpace: "pre-line" as const,
  },
} satisfies Record<string, React.CSSProperties>;
