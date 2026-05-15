import type { Metadata } from "next";

import Link from "next/link";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "About — Opphex",
};

const AGGREGATE_ITEMS = [
  "Hackathons & Competitions",
  "Fellowships & Scholarships",
  "Internships",
  "Grants & Funding",
  "Remote & Side Jobs",
  "Partnerships & Programs",
];

const AUDIENCE_CARDS = [
  {
    title: "Students",
    items: ["Uni fellowships", "Hackathons", "Research positions", "Internships"],
  },
  {
    title: "Early professionals",
    items: ["Entry-level roles", "Side projects", "Grant funding", "Community programs"],
  },
  {
    title: "Founders",
    items: ["Accelerators", "Startup grants", "Co-founder matching", "Partnerships"],
  },
  {
    title: "Professionals",
    items: ["Consulting", "Remote contracts", "Speaking opportunities", "Expert networks"],
  },
];

export default function AboutPage() {
  return (
    <PageShell>
      <div
        className="max-w-4xl mx-auto px-6 md:px-12 py-20"
        style={{ color: "var(--text)" }}
      >
        {/* Eyebrow */}
        <p
          className="text-[11px] uppercase tracking-[0.22em] font-semibold mb-4"
          style={{ color: "var(--muted)" }}
        >
          About Opphex
        </p>

        {/* H1 */}
        <h1
          className="text-[clamp(2rem,6vw,3.5rem)] font-bold leading-[1.08] tracking-tight mb-6"
          style={{ fontFamily: "var(--font-lora)", color: "var(--text)" }}
        >
          One destination for every opportunity.
        </h1>

        {/* Lead */}
        <p
          className="text-[clamp(1rem,1.8vw,1.125rem)] leading-relaxed max-w-2xl mb-16"
          style={{ color: "var(--muted)" }}
        >
          Opphex aggregates hackathons, fellowships, internships, grants, remote work, and more
          into one clean searchable platform — for students, early professionals, founders, and
          professionals who want to discover and act on opportunities faster.
        </p>

        {/* What we aggregate */}
        <section className="mb-16">
          <h2
            className="text-[1.35rem] font-bold tracking-tight mb-6"
            style={{ fontFamily: "var(--font-lora)", color: "var(--text)" }}
          >
            What we aggregate
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {AGGREGATE_ITEMS.map((item) => (
              <div
                key={item}
                className="px-5 py-4 rounded-2xl text-[14px] font-medium"
                style={{
                  border: "1px solid var(--border)",
                  background: "var(--surface)",
                  color: "var(--text)",
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        {/* Who is Opphex for? */}
        <section className="mb-16">
          <h2
            className="text-[1.35rem] font-bold tracking-tight mb-6"
            style={{ fontFamily: "var(--font-lora)", color: "var(--text)" }}
          >
            Who is Opphex for?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {AUDIENCE_CARDS.map((card) => (
              <div
                key={card.title}
                className="px-5 py-5 rounded-2xl"
                style={{
                  border: "1px solid var(--border)",
                  background: "var(--surface)",
                }}
              >
                <h3
                  className="text-[15px] font-semibold mb-3"
                  style={{ color: "var(--text)" }}
                >
                  {card.title}
                </h3>
                <ul className="flex flex-col gap-1.5">
                  {card.items.map((item) => (
                    <li
                      key={item}
                      className="text-[13px] flex items-center gap-2"
                      style={{ color: "var(--muted)" }}
                    >
                      <span
                        className="w-1 h-1 rounded-full flex-shrink-0"
                        style={{ background: "var(--accent)" }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Mission */}
        <section className="mb-16">
          <h2
            className="text-[1.35rem] font-bold tracking-tight mb-5"
            style={{ fontFamily: "var(--font-lora)", color: "var(--text)" }}
          >
            Our mission
          </h2>
          <p
            className="text-[clamp(1rem,1.6vw,1.1rem)] leading-relaxed max-w-2xl"
            style={{ color: "var(--muted)" }}
          >
            Opportunities shape careers. But they&apos;re scattered — buried in emails, Discord
            servers, LinkedIn posts, and obscure websites. Opphex changes that. We believe every
            talented person, regardless of where they are, deserves a fair shot at every
            opportunity that fits them.
          </p>
        </section>

        {/* CTA */}
        <section
          className="rounded-3xl px-8 py-12 text-center"
          style={{ border: "1px solid var(--border)", background: "var(--surface)" }}
        >
          <p
            className="text-[11px] uppercase tracking-[0.22em] font-semibold mb-3"
            style={{ color: "var(--muted)" }}
          >
            Launching August 7, 2026
          </p>
          <h2
            className="text-[1.5rem] font-bold mb-6"
            style={{ fontFamily: "var(--font-lora)", color: "var(--text)" }}
          >
            Be first in line.
          </h2>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-[14px] font-semibold transition-opacity hover:opacity-90"
            style={{ background: "var(--text)", color: "var(--bg)" }}
          >
            Join the waitlist →
          </Link>
        </section>
      </div>
    </PageShell>
  );
}
