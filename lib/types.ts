export type Tier =
  | "waitlist"
  | "early_access"
  | "priority_access"
  | "founding_member"
  | "discord"
  | "lifetime_premium";

export interface WaitlistUser {
  id: string;
  email: string;
  name: string | null;
  avatar_url: string | null;
  referral_code: string;
  referred_by: string | null;
  invite_count: number;
  position: number;
  tier: Tier;
  google_id: string | null;
  created_at: string;
}

export interface Notification {
  id: string;
  message: string;
  is_public: boolean;
  user_id: string | null;
  created_at: string;
}
