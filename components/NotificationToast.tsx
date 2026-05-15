"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Crown,
  Hash,
  Infinity,
  Lightning,
  Rocket,
  Trophy,
  UserPlus,
} from "@phosphor-icons/react";

import { supabase } from "@/lib/supabase";
import { getCurrentTierInfo, REWARD_TIERS } from "@/lib/rewards";
import type { WaitlistUser } from "@/lib/types";

interface Toast {
  id: number;
  message: string;
  sub?: string;
  icon: React.ReactNode;
  type: "join" | "milestone" | "tier" | "personal";
}

interface Props {
  userReferralCode?: string | null;
}

const TIER_ICONS: Record<string, React.ReactNode> = {
  early_access:     <Lightning weight="fill" size={14} />,
  priority_access:  <Rocket weight="fill" size={14} />,
  founding_member:  <Crown weight="fill" size={14} />,
  discord:          <Hash weight="bold" size={14} />,
  lifetime_premium: <Infinity weight="bold" size={14} />,
};

const TIER_COLORS: Record<string, string> = {
  early_access:     "#e97f3b",
  priority_access:  "#9b6af7",
  founding_member:  "#d4a012",
  discord:          "#5865f2",
  lifetime_premium: "#16a34a",
};

// Wait this long after the first join in a batch before showing the toast.
// Allows stragglers to be grouped together.
const BATCH_WINDOW_MS = 2500;

// Minimum gap between successive join toasts.
// During a surge, joins are accumulated and shown in one batch
// once the cooldown expires — so users never see a flood.
const COOLDOWN_MS = 8000;

export default function NotificationToast({ userReferralCode }: Props) {
  const [toasts, setToasts]   = useState<Toast[]>([]);
  const counter               = useRef(0);
  const joinBuffer            = useRef<string[]>([]);
  const joinTimer             = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastJoinToastAt       = useRef<number>(0);
  const prevTierRef           = useRef<string | null>(null);

  const push = (toast: Omit<Toast, "id">) => {
    const id = ++counter.current;
    setToasts((prev) => [...prev.slice(-2), { ...toast, id }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 5500);
  };

  // ── Public join + milestone notifications ─────────────────────────────────
  useEffect(() => {
    // Flush the accumulated buffer.
    // If still in cooldown, reschedule for when it expires (accumulating more names).
    const flushJoinBuffer = () => {
      if (joinBuffer.current.length === 0) return;

      const elapsed = Date.now() - lastJoinToastAt.current;
      if (elapsed < COOLDOWN_MS) {
        joinTimer.current = setTimeout(flushJoinBuffer, COOLDOWN_MS - elapsed);
        return;
      }

      const names = [...joinBuffer.current];
      joinBuffer.current = [];
      lastJoinToastAt.current = Date.now();

      if (names.length === 1) {
        push({
          icon: <UserPlus weight="fill" size={15} />,
          type: "join",
          message: `${names[0]} just joined Opphex`,
          sub: "Welcome to the waitlist 🎉",
        });
      } else {
        push({
          icon: <UserPlus weight="fill" size={15} />,
          type: "join",
          message: `${names[0]} and ${names.length - 1} other${names.length > 2 ? "s" : ""} just joined`,
          sub: "Growing fast 🚀",
        });
      }
    };

    const channel = supabase
      .channel("public-notifications")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "notifications" },
        (payload) => {
          const row      = payload.new as { message: string; is_public: boolean };
          if (!row.is_public) return;

          // ── Join event ─────────────────────────────────────────────────────
          const joinMatch = row.message.match(/^(.+?) just joined Opphex/);
          if (joinMatch) {
            joinBuffer.current.push(joinMatch[1]);
            // (Re)start the batching window — every new arrival resets the 2.5s clock
            if (joinTimer.current) clearTimeout(joinTimer.current);
            joinTimer.current = setTimeout(flushJoinBuffer, BATCH_WINDOW_MS);
            return;
          }

          // ── Milestone / tier-unlock event ─────────────────────────────────
          const milestoneMatch = row.message.match(/^(.+?) just reached (\d+) invites/);
          if (milestoneMatch) {
            const invites = parseInt(milestoneMatch[2]);
            const tier    = REWARD_TIERS.find((t) => t.invites === invites);
            push({
              icon: tier
                ? (TIER_ICONS[tier.tier] ?? <Trophy weight="fill" size={15} />)
                : <Trophy weight="fill" size={15} />,
              type: "milestone",
              message: tier
                ? `${milestoneMatch[1]} unlocked ${tier.label}!`
                : `${milestoneMatch[1]} reached ${invites.toLocaleString()} invites`,
              sub: tier?.description,
            });
          }
        }
      )
      .subscribe();

    return () => {
      if (joinTimer.current) clearTimeout(joinTimer.current);
      supabase.removeChannel(channel);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── User-specific tier upgrades ───────────────────────────────────────────
  useEffect(() => {
    if (!userReferralCode) return;

    const channel = supabase
      .channel(`user-tier-${userReferralCode}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "waitlist_users",
          filter: `referral_code=eq.${userReferralCode}`,
        },
        (payload) => {
          const updated  = payload.new as WaitlistUser;
          const tierInfo = getCurrentTierInfo(updated.invite_count);

          if (prevTierRef.current && prevTierRef.current !== tierInfo.tier) {
            push({
              icon: TIER_ICONS[tierInfo.tier] ?? <Trophy weight="fill" size={15} />,
              type: "tier",
              message: `You unlocked ${tierInfo.label}!`,
              sub: tierInfo.description,
            });
          } else if (prevTierRef.current === tierInfo.tier) {
            const nextTier = REWARD_TIERS.find((t) => t.invites > updated.invite_count);
            if (nextTier) {
              const needed = nextTier.invites - updated.invite_count;
              push({
                icon: <UserPlus weight="fill" size={15} />,
                type: "personal",
                message: "Someone joined via your link!",
                sub: `${needed} more to unlock ${nextTier.label}`,
              });
            }
          }

          prevTierRef.current = tierInfo.tier;
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [userReferralCode]);

  const colors: Record<Toast["type"], { bg: string; icon: string; border: string; accent: string }> = {
    join:     { bg: "var(--surface)",  icon: "#e97f3b", border: "var(--border)", accent: "#e97f3b" },
    milestone:{ bg: "var(--surface)",  icon: "#d4a012", border: "var(--border)", accent: "#d4a012" },
    tier:     { bg: "var(--surface)",  icon: "#e97f3b", border: "var(--border)", accent: "#e97f3b" },
    personal: { bg: "var(--surface)",  icon: "#9b6af7", border: "var(--border)", accent: "#9b6af7" },
  };

  return (
    <div className="fixed bottom-24 left-4 right-4 sm:left-auto sm:right-5 sm:max-w-75 z-90 flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => {
          const c = colors[toast.type];
          const iconColor = toast.type === "tier"
            ? (TIER_COLORS[getCurrentTierInfo(0).tier] ?? "#e97f3b")
            : c.icon;

          return (
            <motion.div
              key={toast.id}
              initial={{ y: 16, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 8, opacity: 0, scale: 0.95, transition: { duration: 0.16 } }}
              className="flex items-start gap-3 rounded-2xl px-4 py-3.5 shadow-xl overflow-hidden"
              style={{
                background: c.bg,
                border: `1px solid ${c.border}`,
                borderLeft: `3px solid ${c.accent}`,
                backdropFilter: "blur(16px)",
              }}
            >
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: iconColor + "18", color: iconColor }}
              >
                {toast.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className="text-[13px] font-semibold leading-snug"
                  style={{ color: "var(--text)" }}
                >
                  {toast.message}
                </p>
                {toast.sub && (
                  <p className="text-[11px] mt-0.5 leading-relaxed" style={{ color: "var(--muted)" }}>
                    {toast.sub}
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
