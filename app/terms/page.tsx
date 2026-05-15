import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Terms of Service — Opphex",
};

export default function TermsPage() {
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
          Terms of Service
        </h1>

        <p className="text-[13px] mb-12" style={{ color: "var(--muted)" }}>
          Effective: August 7, 2026
        </p>

        <div className="flex flex-col gap-10 text-[15px] leading-relaxed" style={{ color: "var(--text)" }}>

          {/* Section 1 */}
          <section>
            <h2
              className="text-[1.1rem] font-semibold mb-3"
              style={{ fontFamily: "var(--font-lora)", color: "var(--text)" }}
            >
              1. Acceptance of Terms
            </h2>
            <p style={{ color: "var(--muted)" }}>
              By accessing or using Opphex (the &quot;Service&quot;), including joining the
              waitlist, you agree to be bound by these Terms of Service. If you do not agree
              to these terms, please do not use the Service. These terms apply to all
              visitors, users, and others who access or use the Service.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2
              className="text-[1.1rem] font-semibold mb-3"
              style={{ fontFamily: "var(--font-lora)", color: "var(--text)" }}
            >
              2. Description of Service
            </h2>
            <p style={{ color: "var(--muted)" }}>
              Opphex is an opportunity aggregator platform that brings together hackathons,
              fellowships, internships, grants, remote work, side jobs, and other opportunities
              into one searchable destination. The Service is designed for students, early
              professionals, founders, and professionals who want to discover and act on
              opportunities faster. Opphex is currently in pre-launch, and features are subject
              to change.
            </p>
          </section>

          {/* Section 3 */}
          <section>
            <h2
              className="text-[1.1rem] font-semibold mb-3"
              style={{ fontFamily: "var(--font-lora)", color: "var(--text)" }}
            >
              3. Waitlist & Early Access
            </h2>
            <p style={{ color: "var(--muted)" }}>
              You may join the Opphex waitlist by providing your email address or signing in
              with Google. Joining the waitlist does not guarantee access to the Service upon
              launch. Your position on the waitlist is determined by your join date and the
              number of valid referrals you make. We reserve the right to modify waitlist
              mechanics, grant early access at our discretion, and adjust reward tiers at any
              time without notice.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2
              className="text-[1.1rem] font-semibold mb-3"
              style={{ fontFamily: "var(--font-lora)", color: "var(--text)" }}
            >
              4. User Accounts
            </h2>
            <p style={{ color: "var(--muted)" }}>
              You are responsible for maintaining the confidentiality of your account
              credentials and for all activity that occurs under your account. You must
              provide accurate information when creating an account. You may not create
              accounts using automated means or impersonate any person or entity. We
              reserve the right to suspend or terminate accounts that violate these terms.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2
              className="text-[1.1rem] font-semibold mb-3"
              style={{ fontFamily: "var(--font-lora)", color: "var(--text)" }}
            >
              5. Acceptable Use
            </h2>
            <p style={{ color: "var(--muted)" }}>
              You agree not to:
            </p>
            <ul className="mt-3 flex flex-col gap-2" style={{ color: "var(--muted)" }}>
              {[
                "Use the Service for any unlawful purpose or in violation of any regulations",
                "Attempt to gain unauthorized access to any part of the Service",
                "Abuse the referral system through fraudulent or automated referrals",
                "Scrape, crawl, or otherwise extract data from the Service without permission",
                "Interfere with or disrupt the integrity or performance of the Service",
                "Submit false, misleading, or spam content",
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

          {/* Section 6 */}
          <section>
            <h2
              className="text-[1.1rem] font-semibold mb-3"
              style={{ fontFamily: "var(--font-lora)", color: "var(--text)" }}
            >
              6. Intellectual Property
            </h2>
            <p style={{ color: "var(--muted)" }}>
              The Opphex name, logo, website design, and all content on the Service are the
              intellectual property of Opphex and its creators. You may not reproduce,
              distribute, or create derivative works from any part of the Service without
              our express written permission. Opportunity listings aggregated from third
              parties remain the property of their respective owners.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2
              className="text-[1.1rem] font-semibold mb-3"
              style={{ fontFamily: "var(--font-lora)", color: "var(--text)" }}
            >
              7. Disclaimers
            </h2>
            <p style={{ color: "var(--muted)" }}>
              The Service is provided on an &quot;as is&quot; and &quot;as available&quot;
              basis without warranties of any kind, either express or implied. Opphex does
              not warrant that the Service will be uninterrupted, error-free, or free of
              viruses. We make no representations about the accuracy, completeness, or
              availability of opportunity listings on the platform.
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2
              className="text-[1.1rem] font-semibold mb-3"
              style={{ fontFamily: "var(--font-lora)", color: "var(--text)" }}
            >
              8. Limitation of Liability
            </h2>
            <p style={{ color: "var(--muted)" }}>
              To the fullest extent permitted by law, Opphex and its creators shall not be
              liable for any indirect, incidental, special, consequential, or punitive damages
              arising from your use of or inability to use the Service. Our total liability
              for any claims arising from these terms or the Service shall not exceed the
              amount you paid us in the twelve months preceding the claim (which, given the
              Service is currently free, may be zero).
            </p>
          </section>

          {/* Section 9 */}
          <section>
            <h2
              className="text-[1.1rem] font-semibold mb-3"
              style={{ fontFamily: "var(--font-lora)", color: "var(--text)" }}
            >
              9. Termination
            </h2>
            <p style={{ color: "var(--muted)" }}>
              We reserve the right to suspend or terminate your access to the Service at
              any time, with or without cause and with or without notice. Upon termination,
              your right to use the Service ceases immediately. Provisions of these terms
              that by their nature should survive termination will survive, including
              ownership provisions, warranty disclaimers, and limitations of liability.
            </p>
          </section>

          {/* Section 10 */}
          <section>
            <h2
              className="text-[1.1rem] font-semibold mb-3"
              style={{ fontFamily: "var(--font-lora)", color: "var(--text)" }}
            >
              10. Governing Law
            </h2>
            <p style={{ color: "var(--muted)" }}>
              These Terms of Service are governed by and construed in accordance with the
              laws of England and Wales. Any disputes arising under these terms shall be
              subject to the exclusive jurisdiction of the courts of England and Wales.
            </p>
          </section>

          {/* Section 11 */}
          <section>
            <h2
              className="text-[1.1rem] font-semibold mb-3"
              style={{ fontFamily: "var(--font-lora)", color: "var(--text)" }}
            >
              11. Contact
            </h2>
            <p style={{ color: "var(--muted)" }}>
              If you have any questions about these Terms of Service, please contact us at{" "}
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
