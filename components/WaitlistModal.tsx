"use client";

import Image from "next/image";
import {
  ArrowRight,
  CheckCircle,
  CopySimple,
  EnvelopeSimple,
  Hash,
  Infinity,
  Lightning,
  Rocket,
  Crown,
  WhatsappLogo,
  XLogo,
} from "@phosphor-icons/react";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { REWARD_TIERS, countUnlocked, getCurrentTierInfo, getNextTier } from "@/lib/rewards";
import type { WaitlistUser } from "@/lib/types";

// ─── Tier icon map ─────────────────────────────────────────────────────────────
const TIER_ICONS: Record<string, React.ReactNode> = {
  early_access:    <Lightning weight="fill" size={16} />,
  priority_access: <Rocket weight="fill" size={16} />,
  founding_member: <Crown weight="fill" size={16} />,
  discord:         <Hash weight="bold" size={16} />,
  lifetime_premium:<Infinity weight="bold" size={16} />,
};

// ─── Props ─────────────────────────────────────────────────────────────────────
interface Props {
  user: WaitlistUser;
  totalCount?: number;
  onClose: () => void;
}

export default function WaitlistModal({ user, totalCount = 2400, onClose }: Props) {
  const [tab, setTab]       = useState<"status" | "invite">("status");
  const [copied, setCopied] = useState(false);

  const inviteLink = useMemo(() => {
    const base = typeof window !== "undefined" ? window.location.origin : "https://opphex.com";
    return `${base}?ref=${user.referral_code}`;
  }, [user.referral_code]);

  const nextTier    = getNextTier(user.invite_count);
  const currentTier = getCurrentTierInfo(user.invite_count);
  const unlocked    = countUnlocked(user.invite_count);
  const invitesNeeded = nextTier ? nextTier.invites - user.invite_count : 0;
  const aheadOf = totalCount > user.position
    ? (totalCount - user.position).toLocaleString()
    : "0";
  const estimatedWeeks = Math.max(1, Math.ceil(user.position / 200));

  const copyLink = async () => {
    await navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const shareTwitter = () => {
    const text = `Just joined @opphex – the OS for ambitious students.\nHackathons, internships, fellowships & more in one place.\n\nJoin me 👉 ${inviteLink}`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, "_blank");
  };

  const shareWhatsApp = () => {
    const text = `Just joined Opphex – find hackathons, internships, fellowships & more 🚀\n\n${inviteLink}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  const shareEmail = () => {
    const subject = "Join me on Opphex";
    const body = `Hey,\n\nI just joined Opphex – a platform that brings together hackathons, internships, fellowships, and more for ambitious students.\n\nJoin using my link: ${inviteLink}\n\nSee you there!`;
    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center"
        style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)" }}
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 380, damping: 38 }}
          className="w-full sm:max-w-[560px] rounded-t-[28px] sm:rounded-[28px] overflow-hidden max-h-[92dvh] flex flex-col"
          style={{ background: "var(--surface)", color: "var(--text)" }}
        >
          {/* Accent bar */}
          <div className="h-[3px] w-full flex-shrink-0" style={{ background: "var(--accent)" }} />

          {/* Scrollable content */}
          <div className="overflow-y-auto flex-1">

            {/* ── Header ── */}
            <div
              className="flex items-center justify-between px-6 pt-5 pb-4"
              style={{ borderBottom: "1px solid var(--border)" }}
            >
              <div className="flex items-center gap-2">
                <Image src="/logo-full.svg" alt="opphex" width={80} height={28} className="h-6 w-auto" />
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm transition hover:opacity-70"
                style={{ background: "var(--surface2)", color: "var(--muted)" }}
              >
                ✕
              </button>
            </div>

            {/* ── Hero ── */}
            <div className="px-6 pt-6 pb-5" style={{ borderBottom: "1px solid var(--border)" }}>
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: "var(--accent)" }}
                />
                <span
                  className="text-[10px] font-bold tracking-[0.2em] uppercase"
                  style={{ color: "var(--accent)" }}
                >
                  You&apos;re Confirmed
                </span>
              </div>

              <h2
                className="text-[2.4rem] leading-[1.1] font-black mb-3"
                style={{ fontFamily: "var(--font-lora)" }}
              >
                You&apos;re on
                <br />
                the list
                <span style={{ color: "var(--accent)" }}>.</span>
              </h2>

              <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                A confirmation has been sent to{" "}
                <span className="font-semibold" style={{ color: "var(--text)" }}>
                  {user.email}
                </span>
                .<br />
                We&apos;ll let you know the moment your spot opens.
              </p>
            </div>

            {/* ── Stats grid ── */}
            <div
              className="grid grid-cols-2"
              style={{ borderBottom: "1px solid var(--border)" }}
            >
              {/* Position */}
              <div
                className="px-6 py-5"
                style={{ borderRight: "1px solid var(--border)" }}
              >
                <p
                  className="text-[9px] uppercase tracking-[0.18em] font-bold mb-2"
                  style={{ color: "var(--muted)" }}
                >
                  Position in Queue
                </p>
                <p
                  className="text-[2.6rem] font-black leading-none mb-2"
                  style={{ fontFamily: "var(--font-lora)" }}
                >
                  <span className="text-base font-semibold mr-1" style={{ color: "var(--muted)" }}>
                    No.
                  </span>
                  {user.position.toLocaleString()}
                </p>
                <span
                  className="inline-flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-full"
                  style={{ background: "var(--surface2)", color: "var(--accent)" }}
                >
                  ✦ Ahead of {aheadOf} others
                </span>
              </div>

              {/* Invites */}
              <div className="px-6 py-5">
                <p
                  className="text-[9px] uppercase tracking-[0.18em] font-bold mb-2"
                  style={{ color: "var(--muted)" }}
                >
                  Invites Sent
                </p>
                <p
                  className="text-[2.6rem] font-black leading-none mb-2"
                  style={{ fontFamily: "var(--font-lora)" }}
                >
                  {user.invite_count}
                  {nextTier && (
                    <span
                      className="text-lg font-semibold ml-1"
                      style={{ color: "var(--muted)" }}
                    >
                      / {nextTier.invites}
                    </span>
                  )}
                </p>
                {nextTier && (
                  <p className="text-[11px]" style={{ color: "var(--muted)" }}>
                    <span className="font-semibold" style={{ color: "var(--text)" }}>
                      {invitesNeeded} invite{invitesNeeded !== 1 ? "s" : ""}
                    </span>{" "}
                    to {nextTier.label}
                  </p>
                )}
                {!nextTier && (
                  <p className="text-[11px] font-semibold" style={{ color: currentTier.color }}>
                    All tiers unlocked 🎉
                  </p>
                )}
              </div>
            </div>

            {/* ── Tabs ── */}
            <div
              className="flex"
              style={{ borderBottom: "1px solid var(--border)" }}
            >
              {(["status", "invite"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className="flex-1 py-3.5 text-[11px] font-bold uppercase tracking-widest transition-colors hover:opacity-80"
                  style={{
                    color: tab === t ? "var(--accent)" : "var(--muted)",
                    borderBottom: tab === t ? `2px solid var(--accent)` : "2px solid transparent",
                    background: "none",
                  }}
                >
                  {t === "status" ? "Reward Status" : "Invite & Earn"}
                </button>
              ))}
            </div>

            {/* ── Tab: Status ── */}
            {tab === "status" && (
              <div className="px-6 py-5">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "var(--muted)" }}>
                    Reward Ladder
                  </p>
                  <p className="text-[10px] font-semibold" style={{ color: "var(--muted)" }}>
                    {unlocked} of 5 unlocked
                  </p>
                </div>

                <div className="space-y-0">
                  {REWARD_TIERS.slice(1).map((tier, idx, arr) => {
                    const isUnlocked = user.invite_count >= tier.invites;
                    const isCurrent  = currentTier.tier === tier.tier;
                    const isLast     = idx === arr.length - 1;
                    const toGo       = tier.invites - user.invite_count;

                    return (
                      <div key={tier.tier} className="flex items-stretch gap-4">
                        {/* Timeline */}
                        <div className="flex flex-col items-center flex-shrink-0 w-8">
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 z-10"
                            style={{
                              background: isUnlocked ? tier.color : "var(--surface2)",
                              color:      isUnlocked ? "#fff" : "var(--muted)",
                              border:     isCurrent  ? `2px solid ${tier.color}` : "none",
                            }}
                          >
                            {TIER_ICONS[tier.tier]}
                          </div>
                          {!isLast && (
                            <div
                              className="w-px flex-1 my-1"
                              style={{ background: isUnlocked ? tier.color + "40" : "var(--border)" }}
                            />
                          )}
                        </div>

                        {/* Content */}
                        <div className={`flex-1 flex items-start justify-between gap-3 py-1 ${!isLast ? "pb-4" : ""}`}>
                          <div>
                            <p className="text-[13px] font-bold leading-tight" style={{ color: "var(--text)" }}>
                              {tier.label}
                            </p>
                            <p className="text-[11px] mt-0.5" style={{ color: "var(--muted)" }}>
                              {tier.description}
                            </p>
                          </div>
                          <div className="flex-shrink-0 flex flex-col items-end gap-1">
                            <p className="text-[11px]" style={{ color: "var(--muted)" }}>
                              <span className="font-bold" style={{ color: "var(--text)" }}>
                                {tier.invites.toLocaleString()}
                              </span>{" "}
                              invite{tier.invites !== 1 ? "s" : ""}
                            </p>
                            {isUnlocked ? (
                              <span
                                className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                                style={{ background: tier.color + "18", color: tier.color }}
                              >
                                <CheckCircle weight="fill" size={10} /> Unlocked
                              </span>
                            ) : toGo > 0 && idx === REWARD_TIERS.slice(1).findIndex((t) => user.invite_count < t.invites) ? (
                              <span
                                className="inline-flex items-center text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                                style={{ background: "var(--accent)", color: "#fff" }}
                              >
                                {toGo} to go
                              </span>
                            ) : (
                              <span
                                className="inline-flex items-center text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                                style={{ background: "var(--surface2)", color: "var(--muted)" }}
                              >
                                Locked
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── Tab: Invite ── */}
            {tab === "invite" && (
              <div className="px-6 py-5 space-y-5">

                {/* Progress bar */}
                {nextTier && (
                  <div
                    className="rounded-2xl p-4"
                    style={{ background: "var(--surface2)", border: "1px solid var(--border)" }}
                  >
                    <div className="flex items-center justify-between mb-2.5">
                      <p className="text-xs font-semibold" style={{ color: "var(--text)" }}>
                        Progress to {nextTier.label}
                      </p>
                      <p className="text-xs" style={{ color: "var(--muted)" }}>
                        {user.invite_count} / {nextTier.invites}
                      </p>
                    </div>
                    <div
                      className="h-1.5 rounded-full overflow-hidden"
                      style={{ background: "var(--border)" }}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${Math.min(100, (user.invite_count / nextTier.invites) * 100)}%`,
                        }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        className="h-full rounded-full"
                        style={{ background: nextTier.color }}
                      />
                    </div>
                    <p className="text-[11px] mt-2" style={{ color: "var(--muted)" }}>
                      {invitesNeeded} more invite{invitesNeeded !== 1 ? "s" : ""} → unlock {nextTier.label}
                    </p>
                  </div>
                )}

                {/* Invite link */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p
                      className="text-[9px] font-bold uppercase tracking-[0.18em]"
                      style={{ color: "var(--muted)" }}
                    >
                      Your Invite Link
                    </p>
                    <p
                      className="text-[9px] font-mono font-bold tracking-wider"
                      style={{ color: "var(--muted)" }}
                    >
                      REF · {user.referral_code}
                    </p>
                  </div>

                  <div
                    className="flex items-center rounded-xl overflow-hidden"
                    style={{ border: "1px solid var(--border)", background: "var(--surface2)" }}
                  >
                    <div className="flex items-center gap-2 flex-1 px-3 py-3 min-w-0">
                      <CopySimple size={14} style={{ color: "var(--muted)", flexShrink: 0 }} />
                      <span
                        className="text-[12px] truncate font-mono"
                        style={{ color: "var(--muted)" }}
                      >
                        {inviteLink}
                      </span>
                    </div>
                    <button
                      onClick={copyLink}
                      className="px-4 py-3 text-[11px] font-bold transition flex-shrink-0 flex items-center gap-1.5 hover:opacity-80"
                      style={{
                        background: copied ? "#16a34a" : "var(--text)",
                        color: "var(--bg)",
                      }}
                    >
                      {copied ? (
                        <><CheckCircle weight="fill" size={13} /> Copied</>
                      ) : (
                        "Copy link"
                      )}
                    </button>
                  </div>
                </div>

                {/* Share buttons */}
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={shareTwitter}
                    className="flex flex-col items-center gap-1.5 py-3.5 rounded-2xl transition text-[11px] font-semibold hover:opacity-80"
                    style={{
                      border: "1px solid var(--border)",
                      background: "var(--surface2)",
                      color: "var(--text)",
                    }}
                  >
                    <XLogo size={18} weight="bold" />
                    Share on X
                  </button>
                  <button
                    onClick={shareWhatsApp}
                    className="flex flex-col items-center gap-1.5 py-3.5 rounded-2xl transition text-[11px] font-semibold hover:opacity-80"
                    style={{
                      border: "1px solid var(--border)",
                      background: "var(--surface2)",
                      color: "var(--text)",
                    }}
                  >
                    <WhatsappLogo size={18} weight="fill" style={{ color: "#25d366" }} />
                    WhatsApp
                  </button>
                  <button
                    onClick={shareEmail}
                    className="flex flex-col items-center gap-1.5 py-3.5 rounded-2xl transition text-[11px] font-semibold hover:opacity-80"
                    style={{
                      border: "1px solid var(--border)",
                      background: "var(--surface2)",
                      color: "var(--text)",
                    }}
                  >
                    <EnvelopeSimple size={18} weight="bold" />
                    Email
                  </button>
                </div>
              </div>
            )}

            {/* ── Footer ── */}
            <div
              className="px-6 py-4 flex items-center justify-between gap-4"
              style={{ borderTop: "1px solid var(--border)" }}
            >
              <div>
                <p className="text-[11px]" style={{ color: "var(--muted)" }}>
                  Estimated wait{" "}
                  <span className="font-bold" style={{ color: "var(--text)" }}>
                    ~{estimatedWeeks} week{estimatedWeeks !== 1 ? "s" : ""}
                  </span>
                </p>
                <p className="text-[11px]" style={{ color: "var(--muted)" }}>
                  Skip ahead by inviting friends
                </p>
              </div>
              <button
                onClick={onClose}
                className="flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold transition flex-shrink-0 hover:opacity-85"
                style={{ background: "var(--text)", color: "var(--bg)" }}
              >
                Continue
                <ArrowRight size={15} weight="bold" />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
