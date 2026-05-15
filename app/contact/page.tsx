import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Contact — Opphex",
};

const CONTACT_CARDS = [
  {
    title: "General Inquiries",
    email: "hello@opphex.com",
    description: "For questions about the waitlist, the platform, or anything else.",
  },
  {
    title: "Press & Partnerships",
    email: "support@opphex.com",
    description:
      "Media enquiries, partnership proposals, and sponsorship opportunities.",
  },
  {
    title: "Ambassador Program",
    email: null,
    description:
      "Want to help us grow? DM us on X (@OfficialOpphex) or email support@opphex.com. We're looking for passionate community builders.",
  },
];

export default function ContactPage() {
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
          Get in touch
        </p>

        {/* H1 */}
        <h1
          className="text-[clamp(2rem,6vw,3.2rem)] font-bold leading-[1.08] tracking-tight mb-5"
          style={{ fontFamily: "var(--font-lora)", color: "var(--text)" }}
        >
          We&apos;d love to hear from you.
        </h1>

        {/* Lead */}
        <p
          className="text-[clamp(1rem,1.8vw,1.1rem)] leading-relaxed max-w-xl mb-12"
          style={{ color: "var(--muted)" }}
        >
          Whether you have a question, want to partner with us, or just want to say hello —
          reach out.
        </p>

        {/* Contact cards */}
        <div className="flex flex-col gap-4 mb-12">
          {CONTACT_CARDS.map((card) => (
            <div
              key={card.title}
              className="rounded-2xl px-6 py-6"
              style={{
                border: "1px solid var(--border)",
                background: "var(--surface)",
              }}
            >
              <h2
                className="text-[15px] font-semibold mb-1"
                style={{ color: "var(--text)" }}
              >
                {card.title}
              </h2>
              {card.email && (
                <a
                  href={`mailto:${card.email}`}
                  className="text-[13px] font-medium mb-3 inline-block transition-opacity hover:opacity-70"
                  style={{ color: "var(--accent)" }}
                >
                  {card.email}
                </a>
              )}
              <p
                className={`text-[13px] leading-relaxed${card.email ? " mt-2" : ""}`}
                style={{ color: "var(--muted)" }}
              >
                {card.description}
              </p>
            </div>
          ))}
        </div>

        {/* Social links */}
        <div className="flex items-center gap-4 mb-8">
          <a
            href="https://x.com/OfficialOpphex"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium transition-opacity hover:opacity-70"
            style={{
              border: "1px solid var(--border)",
              background: "var(--surface)",
              color: "var(--text)",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.261 5.635 5.903-5.635zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            @OfficialOpphex
          </a>

          <a
            href="#"
            className="flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium transition-opacity hover:opacity-70"
            style={{
              border: "1px solid var(--border)",
              background: "var(--surface)",
              color: "var(--text)",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            Instagram
          </a>
        </div>

        {/* Note */}
        <p
          className="text-[12px]"
          style={{ color: "var(--muted)" }}
        >
          We try to respond to all emails within 48 hours.
        </p>
      </div>
    </PageShell>
  );
}
