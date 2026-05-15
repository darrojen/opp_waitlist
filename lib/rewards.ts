import type { Tier } from "./types";

export interface RewardTier {
  invites: number;
  tier: Tier;
  label: string;
  description: string;
  color: string;
  bg: string;
  border: string;
}

export const REWARD_TIERS: RewardTier[] = [
  {
    invites: 0,
    tier: "waitlist",
    label: "On Waitlist",
    description: "You're in the queue",
    color: "#9c9188",
    bg: "#f4f1ec",
    border: "#e8e3dc",
  },
  {
    invites: 5,
    tier: "early_access",
    label: "Opportunity Alerts Beta",
    description: "Skip the queue when we open",
    color: "#e97f3b",
    bg: "#fff4ec",
    border: "#fdd5b2",
  },
  {
    invites: 25,
    tier: "priority_access",
    label: "Priority Access",
    description: "First-day onboarding window",
    color: "#9b6af7",
    bg: "#f5f0ff",
    border: "#ddd0fc",
  },
  {
    invites: 100,
    tier: "founding_member",
    label: "Founding Member",
    description: "Permanent badge + lifetime perks",
    color: "#d4a012",
    bg: "#fffbec",
    border: "#f7e088",
  },
  {
    invites: 500,
    tier: "discord",
    label: "Private Discord",
    description: "Direct line to the founding team",
    color: "#5865f2",
    bg: "#eef0ff",
    border: "#c5cafc",
  },
  {
    invites: 2000,
    tier: "lifetime_premium",
    label: "Premium features for 2 years",
    description: "All future features, no charge for 2 years",
    color: "#16a34a",
    bg: "#f0fdf4",
    border: "#a7f3c1",
  },
];

export function getTier(inviteCount: number): Tier {
  const match = [...REWARD_TIERS].reverse().find((t) => inviteCount >= t.invites);
  return match?.tier ?? "waitlist";
}

export function getCurrentTierInfo(inviteCount: number): RewardTier {
  return (
    [...REWARD_TIERS].reverse().find((t) => inviteCount >= t.invites) ??
    REWARD_TIERS[0]
  );
}

export function getNextTier(inviteCount: number): RewardTier | undefined {
  return REWARD_TIERS.find((t) => t.invites > inviteCount);
}

export function countUnlocked(inviteCount: number): number {
  return REWARD_TIERS.filter((t) => t.invites > 0 && inviteCount >= t.invites).length;
}
