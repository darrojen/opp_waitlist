import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Privacy Policy — Opphex",
};

export default function PrivacyPage() {
  return (
    <PageShell>
      <div
        className="max-w-3xl mx-auto px-6 md:px-12 py-20"
        style={{ color: "var(--text)" }}
      >
        {/* Eyebrow */}
        <p
          className="text-[11px] uppercase tracking-[0.22em] font-semibold mb-4"
          style={{ color: "var(--muted)" }}
        >
          Legal
        </p>

        {/* H1 */}
        <h1
          className="text-[clamp(2rem,6vw,3rem)] font-bold leading-[1.08] tracking-tight mb-3"
          style={{ fontFamily: "var(--font-lora)", color: "var(--text)" }}
        >
          Privacy Policy
        </h1>

        <p className="text-[13px] mb-12" style={{ color: "var(--muted)" }}>
          Last updated: May 2026
        </p>

        <div className="flex flex-col gap-10 text-[15px] leading-relaxed" style={{ color: "var(--text)" }}>

          {/* Section 1 */}
          <section>
            <h2
              className="text-[1.1rem] font-semibold mb-3"
              style={{ fontFamily: "var(--font-lora)", color: "var(--text)" }}
            >
              1. Information We Collect
            </h2>
            <p style={{ color: "var(--muted)" }}>
              When you join the Opphex waitlist, we collect the following information:
            </p>
            <ul className="mt-3 flex flex-col gap-2" style={{ color: "var(--muted)" }}>
              {[
                "Email address",
                "Name and profile photo (when signing in with Google OAuth)",
                "Referral code and referral source (if you were referred by someone)",
                "Date and time you joined the waitlist",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-[14px]">
                  <span
                    className="mt-2 w-1 h-1 rounded-full flex-shrink-0"
                    style={{ background: "var(--accent)" }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Section 2 */}
          <section>
            <h2
              className="text-[1.1rem] font-semibold mb-3"
              style={{ fontFamily: "var(--font-lora)", color: "var(--text)" }}
            >
              2. How We Use Your Information
            </h2>
            <p style={{ color: "var(--muted)" }}>
              We use the information we collect for the following purposes:
            </p>
            <ul className="mt-3 flex flex-col gap-2" style={{ color: "var(--muted)" }}>
              {[
                "To manage your position on the Opphex waitlist",
                "To determine your order on the list based on join date and referrals",
                "To notify you when we launch or when early access becomes available",
                "To send you occasional updates about Opphex (you may unsubscribe at any time)",
                "To prevent abuse of the referral system",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-[14px]">
                  <span
                    className="mt-2 w-1 h-1 rounded-full flex-shrink-0"
                    style={{ background: "var(--accent)" }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2
              className="text-[1.1rem] font-semibold mb-3"
              style={{ fontFamily: "var(--font-lora)", color: "var(--text)" }}
            >
              3. Data Storage & Security
            </h2>
            <p style={{ color: "var(--muted)" }}>
              Your data is stored securely using{" "}
              <strong style={{ color: "var(--text)" }}>Supabase</strong>, our backend data
              platform, which provides enterprise-grade security and PostgreSQL-based storage.
              All data is encrypted in transit (TLS) and at rest. We follow industry best
              practices to protect your personal information from unauthorized access,
              alteration, disclosure, or destruction.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2
              className="text-[1.1rem] font-semibold mb-3"
              style={{ fontFamily: "var(--font-lora)", color: "var(--text)" }}
            >
              4. Third-Party Services
            </h2>
            <p style={{ color: "var(--muted)" }}>
              We use the following third-party services to operate Opphex:
            </p>
            <ul className="mt-3 flex flex-col gap-2" style={{ color: "var(--muted)" }}>
              {[
                "Supabase — database, authentication, and backend infrastructure",
                "Google OAuth — optional sign-in method (governed by Google's Privacy Policy)",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-[14px]">
                  <span
                    className="mt-2 w-1 h-1 rounded-full flex-shrink-0"
                    style={{ background: "var(--accent)" }}
                  />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-3" style={{ color: "var(--muted)" }}>
              We do not sell, rent, or trade your personal data to third parties. We do not
              use your information for advertising purposes.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2
              className="text-[1.1rem] font-semibold mb-3"
              style={{ fontFamily: "var(--font-lora)", color: "var(--text)" }}
            >
              5. Your Rights
            </h2>
            <p style={{ color: "var(--muted)" }}>
              You have the following rights regarding your personal data:
            </p>
            <ul className="mt-3 flex flex-col gap-2" style={{ color: "var(--muted)" }}>
              {[
                "Access — request a copy of the data we hold about you",
                "Correction — request that we correct inaccurate data",
                "Deletion — request that we delete your data from our systems",
                "Portability — request your data in a machine-readable format",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-[14px]">
                  <span
                    className="mt-2 w-1 h-1 rounded-full flex-shrink-0"
                    style={{ background: "var(--accent)" }}
                  />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-3" style={{ color: "var(--muted)" }}>
              To exercise any of these rights, please email{" "}
              <a
                href="mailto:support@opphex.com"
                className="transition-opacity hover:opacity-70"
                style={{ color: "var(--accent)" }}
              >
                support@opphex.com
              </a>
              . We will respond within 30 days.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2
              className="text-[1.1rem] font-semibold mb-3"
              style={{ fontFamily: "var(--font-lora)", color: "var(--text)" }}
            >
              6. Cookies
            </h2>
            <p style={{ color: "var(--muted)" }}>
              We use minimal cookies to support core functionality, including remembering your
              referral code and maintaining your authentication session. We do not use
              third-party tracking or advertising cookies.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2
              className="text-[1.1rem] font-semibold mb-3"
              style={{ fontFamily: "var(--font-lora)", color: "var(--text)" }}
            >
              7. Changes to This Policy
            </h2>
            <p style={{ color: "var(--muted)" }}>
              We may update this Privacy Policy from time to time. If we make material changes,
              we will notify you by email or by posting a notice on our website. Your continued
              use of Opphex after any changes constitutes your acceptance of the updated policy.
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2
              className="text-[1.1rem] font-semibold mb-3"
              style={{ fontFamily: "var(--font-lora)", color: "var(--text)" }}
            >
              8. Contact Us
            </h2>
            <p style={{ color: "var(--muted)" }}>
              If you have any questions or concerns about this Privacy Policy or how we handle
              your data, please contact us at{" "}
              <a
                href="mailto:support@opphex.com"
                className="transition-opacity hover:opacity-70"
                style={{ color: "var(--accent)" }}
              >
                support@opphex.com
              </a>
              .
            </p>
          </section>

        </div>
      </div>
    </PageShell>
  );
}
