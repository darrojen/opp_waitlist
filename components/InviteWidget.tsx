"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, LinkedinLogo, Ticket, User, X, XLogo } from "@phosphor-icons/react";
import { useCallback, useState } from "react";

import { REWARD_TIERS } from "@/lib/rewards";
import type { WaitlistUser } from "@/lib/types";
import { supabase } from "@/lib/supabase";

export function InviteWidget() {
  const [open,   setOpen]   = useState(false);
  const [email,  setEmail]  = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "found" | "error">("idle");
  const [user,   setUser]   = useState<WaitlistUser | null>(null);
  const [errMsg, setErrMsg] = useState("");
  const [copied, setCopied] = useState(false);

  const lookup = useCallback(async () => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrMsg("Enter a valid email.");
      return;
    }
    setErrMsg("");
    setStatus("loading");
    const { data, error } = await supabase
      .from("waitlist_users")
      .select()
      .eq("email", email.toLowerCase().trim())
      .single();
    if (error || !data) {
      setStatus("error");
      setErrMsg("No account found for this email.");
    } else {
      setUser(data as WaitlistUser);
      setStatus("found");
    }
  }, [email]);

  const referralUrl = user
    ? `${typeof window !== "undefined" ? window.location.origin : ""}?ref=${user.referral_code}`
    : "";

  const copy = useCallback(() => {
    if (!user) return;
    navigator.clipboard.writeText(referralUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [user, referralUrl]);

  const reset = () => { setStatus("idle"); setUser(null); setEmail(""); setErrMsg(""); };

  const nextTier  = user ? REWARD_TIERS.find(t => t.invites > user.invite_count) : null;
  const needed    = nextTier ? nextTier.invites - (user?.invite_count ?? 0) : 0;
  const filled    = Math.min(user?.invite_count ?? 0, 5);
  const empty     = Math.min(needed, 5);

  const shareText = encodeURIComponent("Join me on Opphex — the best place to find student opportunities!");
  const shareUrl  = encodeURIComponent(referralUrl);

  return (
    <>
      {/* FAB */}
      <motion.button
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-xl"
        style={{ background: "var(--accent)", color: "#fff" }}
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.95 }}
        aria-label="View your invite code"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.div key="x"
              initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.16 }}
            >
              <X size={22} weight="bold" />
            </motion.div>
          ) : (
            <motion.div key="ticket"
              initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.16 }}
            >
              <Ticket size={22} weight="fill" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed bottom-24 left-4 right-4 sm:left-auto sm:right-6 sm:w-[340px] z-50 rounded-2xl overflow-hidden shadow-2xl"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
          >
            {/* Header */}
            <div className="px-5 pt-5 pb-4" style={{ borderBottom: "1px solid var(--border)" }}>
              <p className="text-[14px] font-semibold" style={{ color: "var(--text)" }}>Your invite code</p>
              <p className="text-[12px] mt-0.5" style={{ color: "var(--muted)" }}>
                Enter your email to find your referral link
              </p>
            </div>

            <div className="px-5 py-5">
              {status !== "found" ? (
                /* ── Lookup form ── */
                <>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && lookup()}
                    placeholder="your@email.com"
                    className="w-full rounded-xl px-4 py-3 text-[14px] outline-none"
                    style={{ background: "var(--surface2)", border: "1px solid var(--border)", color: "var(--text)" }}
                  />
                  {errMsg && <p className="mt-2 text-[12px] text-red-400">{errMsg}</p>}
                  <button
                    onClick={lookup}
                    disabled={status === "loading"}
                    className="mt-3 w-full rounded-xl py-3 text-[14px] font-semibold transition-opacity disabled:opacity-60 hover:opacity-90"
                    style={{ background: "var(--text)", color: "var(--bg)" }}
                  >
                    {status === "loading" ? "Looking up…" : "Find my code →"}
                  </button>
                </>
              ) : user && (
                /* ── Result ── */
                <div className="flex flex-col items-center gap-5 text-center">

                  {/* Avatar progress row */}
                  <div className="flex items-center justify-center gap-2 flex-wrap">
                    {Array.from({ length: filled }).map((_, i) => (
                      <div
                        key={`f-${i}`}
                        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: "linear-gradient(135deg, #e97f3b 0%, #c45e1e 100%)" }}
                      >
                        <User size={18} weight="fill" color="#fff" />
                      </div>
                    ))}
                    {filled > 0 && empty > 0 && (
                      <span className="text-[13px] font-bold px-0.5" style={{ color: "var(--muted)" }}>+</span>
                    )}
                    {Array.from({ length: empty }).map((_, i) => (
                      <div
                        key={`e-${i}`}
                        className="w-10 h-10 rounded-full flex-shrink-0"
                        style={{ border: "2px dashed var(--border)" }}
                      />
                    ))}
                  </div>

                  {/* Message */}
                  <p className="text-[15px] font-bold leading-snug px-2" style={{ color: "var(--text)" }}>
                    {needed > 0
                      ? `Invite ${needed} more to unlock ${nextTier?.label}!`
                      : "You've unlocked all tiers! 🎉"}
                  </p>

                  {/* Stats row */}
                  <div className="flex gap-3 w-full">
                    <div className="flex-1 rounded-xl py-2.5 text-center" style={{ background: "var(--surface2)", border: "1px solid var(--border)" }}>
                      <p className="text-[20px] font-black leading-none" style={{ color: "var(--text)" }}>#{user.position}</p>
                      <p className="text-[10px] mt-1 font-medium" style={{ color: "var(--muted)" }}>Position</p>
                    </div>
                    <div className="flex-1 rounded-xl py-2.5 text-center" style={{ background: "var(--surface2)", border: "1px solid var(--border)" }}>
                      <p className="text-[20px] font-black leading-none" style={{ color: "var(--accent)" }}>{user.invite_count}</p>
                      <p className="text-[10px] mt-1 font-medium" style={{ color: "var(--muted)" }}>Referred</p>
                    </div>
                  </div>

                  {/* Copy link button */}
                  <button
                    onClick={copy}
                    className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-full text-[14px] font-semibold transition-opacity hover:opacity-90"
                    style={{ background: "var(--text)", color: "var(--bg)" }}
                  >
                    {copied
                      ? <Check size={17} weight="bold" />
                      : <Copy size={17} weight="bold" />}
                    {copied ? "Copied!" : "Copy link"}
                  </button>

                  {/* Share buttons */}
                  <div className="flex items-center gap-3">
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                      target="_blank" rel="noopener noreferrer"
                      className="w-11 h-11 rounded-full flex items-center justify-center transition-opacity hover:opacity-70"
                      style={{ border: "1px solid var(--border)", color: "var(--muted)" }}
                      aria-label="Share on LinkedIn"
                    >
                      <LinkedinLogo size={19} weight="fill" />
                    </a>
                    <a
                      href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
                      target="_blank" rel="noopener noreferrer"
                      className="w-11 h-11 rounded-full flex items-center justify-center transition-opacity hover:opacity-70"
                      style={{ border: "1px solid var(--border)", color: "var(--muted)" }}
                      aria-label="Share on X"
                    >
                      <XLogo size={18} weight="bold" />
                    </a>
                  </div>

                  <button
                    onClick={reset}
                    className="text-[11px] transition-opacity hover:opacity-60"
                    style={{ color: "var(--muted)" }}
                  >
                    Not you? Look up a different email
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
