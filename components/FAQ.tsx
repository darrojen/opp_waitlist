"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus } from "@phosphor-icons/react";

import { useState } from "react";

const FAQS = [
  {
    q: "What is Opphex?",
    a: "Opphex is an opportunity aggregator that brings hackathons, internships, fellowships, grants, side jobs, and partnerships into one place — so you never miss what matters. We're building the single destination for students, early professionals, founders, and professionals worldwide.",
  },
  {
    q: "When will Opphex launch?",
    a: "We're targeting August 7, 2026 for our public launch. Join the waitlist now to get notified first and unlock early access features before everyone else.",
  },
  {
    q: "How does the waitlist work?",
    a: "Sign up with your email or Google account and you'll receive a unique referral link. Each person you refer moves you higher on the waitlist, getting you closer to early access. The more you share, the sooner you get in.",
  },
  {
    q: "Is Opphex free to use?",
    a: "Yes. Opphex will be free to use. Core features — discovery, search, and alerts — will always be free. We plan to offer optional premium features for power users in the future.",
  },
  {
    q: "What types of opportunities will Opphex list?",
    a: "Everything: hackathons, coding competitions, university fellowships, research grants, internships, remote side jobs, sponsored partnerships, and community programs — sourced globally and updated continuously.",
  },
  {
    q: "How does the referral system work?",
    a: "Every waitlist member gets a unique referral link. When someone joins using your link, they count as your referral. Accumulate referrals to climb the list and unlock special perks like early access and founding member status.",
  },
  {
    q: "Will Opphex be available globally?",
    a: "Yes. While we're initially focused on communities in Africa, Europe, and North America, Opphex is designed to surface opportunities for talent everywhere in the world. Our goal is a truly global platform.",
  },
  {
    q: "How can I get involved or give feedback?",
    a: "We'd love to hear from you. Reach out on X (@OfficialOpphex) or drop us an email. We're also looking for passionate community ambassadors who want to help shape Opphex from the ground up — DM us if you're interested.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="relative z-10 w-full max-w-2xl mx-auto px-6 pb-24">
      <p
        className="text-center text-[11px] uppercase tracking-[0.22em] font-semibold mb-8"
        style={{ color: "var(--muted)" }}
      >
        Frequently asked questions
      </p>

      <div className="flex flex-col gap-2">
        {FAQS.map((item, i) => (
          <div
            key={i}
            className="rounded-2xl overflow-hidden"
            style={{ border: "1px solid var(--border)", background: "var(--surface)" }}
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between px-6 py-4 text-left"
              style={{ color: "var(--text)" }}
            >
              <span className="text-[15px] font-semibold pr-4">{item.q}</span>
              <div
                className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-200"
                style={{
                  background: open === i ? "var(--accent)" : "var(--surface2)",
                  border: "1px solid var(--border)",
                  color: open === i ? "#fff" : "var(--muted)",
                }}
              >
                {open === i
                  ? <Minus size={12} weight="bold" />
                  : <Plus size={12} weight="bold" />
                }
              </div>
            </button>

            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div
                  key="body"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22, ease: "easeInOut" }}
                  style={{ overflow: "hidden" }}
                >
                  <p
                    className="px-6 pb-5 text-[14px] leading-relaxed"
                    style={{ color: "var(--muted)" }}
                  >
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
