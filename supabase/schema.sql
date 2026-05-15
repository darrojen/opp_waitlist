-- ============================================================
-- Opphex Waitlist Schema
-- Run this in: Supabase Dashboard → SQL Editor
-- ============================================================

-- Position auto-increment sequence
CREATE SEQUENCE IF NOT EXISTS waitlist_position_seq START 1;

-- ── waitlist_users ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS waitlist_users (
  id             uuid         DEFAULT gen_random_uuid() PRIMARY KEY,
  email          text         UNIQUE NOT NULL,
  name           text,
  avatar_url     text,
  referral_code  text         UNIQUE NOT NULL,
  referred_by    text,
  invite_count   integer      DEFAULT 0 NOT NULL,
  position       integer      DEFAULT nextval('waitlist_position_seq') NOT NULL,
  tier           text         DEFAULT 'waitlist' NOT NULL,
  google_id      text,
  created_at     timestamptz  DEFAULT now() NOT NULL
);

-- Full replica identity needed for realtime row-level filters
ALTER TABLE waitlist_users REPLICA IDENTITY FULL;

-- ── referrals ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS referrals (
  id             uuid         DEFAULT gen_random_uuid() PRIMARY KEY,
  referrer_code  text         NOT NULL,
  referee_email  text         NOT NULL,
  referee_id     uuid         REFERENCES waitlist_users(id) ON DELETE SET NULL,
  created_at     timestamptz  DEFAULT now() NOT NULL,
  UNIQUE (referrer_code, referee_email)
);

-- ── notifications ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS notifications (
  id         uuid         DEFAULT gen_random_uuid() PRIMARY KEY,
  message    text         NOT NULL,
  is_public  boolean      DEFAULT true NOT NULL,
  user_id    uuid         REFERENCES waitlist_users(id) ON DELETE SET NULL,
  created_at timestamptz  DEFAULT now() NOT NULL
);

-- ── Indexes ─────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_waitlist_referral_code ON waitlist_users (referral_code);
CREATE INDEX IF NOT EXISTS idx_waitlist_email          ON waitlist_users (email);
CREATE INDEX IF NOT EXISTS idx_referrals_referrer      ON referrals (referrer_code);
CREATE INDEX IF NOT EXISTS idx_notifications_created   ON notifications (created_at DESC);

-- ── Row Level Security ───────────────────────────────────────
ALTER TABLE waitlist_users  ENABLE ROW LEVEL SECURITY;
ALTER TABLE referrals       ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications   ENABLE ROW LEVEL SECURITY;

-- waitlist_users: anyone can read + insert; updates handled by trigger (SECURITY DEFINER)
CREATE POLICY "public_read_waitlist"   ON waitlist_users FOR SELECT USING (true);
CREATE POLICY "public_insert_waitlist" ON waitlist_users FOR INSERT WITH CHECK (true);
CREATE POLICY "public_update_waitlist" ON waitlist_users FOR UPDATE USING (true);

-- referrals: anyone can read + insert
CREATE POLICY "public_read_referrals"   ON referrals FOR SELECT USING (true);
CREATE POLICY "public_insert_referrals" ON referrals FOR INSERT WITH CHECK (true);

-- notifications: anyone can read + insert
CREATE POLICY "public_read_notifications"   ON notifications FOR SELECT USING (true);
CREATE POLICY "public_insert_notifications" ON notifications FOR INSERT WITH CHECK (true);

-- ── Trigger: handle new user join ────────────────────────────
CREATE OR REPLACE FUNCTION handle_new_waitlist_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_referrer_invites  integer;
  v_new_tier          text;
  v_referrer_name     text;
  v_display_name      text;
BEGIN
  v_display_name := COALESCE(NEW.name, split_part(NEW.email, '@', 1));

  -- Public join notification
  INSERT INTO notifications (message, is_public, user_id)
  VALUES (v_display_name || ' just joined Opphex 🎉', true, NEW.id);

  -- Referral handling
  IF NEW.referred_by IS NOT NULL THEN
    -- Prevent self-referral
    IF NEW.referral_code = NEW.referred_by THEN
      RETURN NEW;
    END IF;

    -- Atomic increment to avoid race conditions with concurrent inserts
    UPDATE waitlist_users
    SET    invite_count = invite_count + 1,
           tier = CASE
             WHEN invite_count + 1 >= 2000 THEN 'lifetime_premium'
             WHEN invite_count + 1 >= 500  THEN 'discord'
             WHEN invite_count + 1 >= 100  THEN 'founding_member'
             WHEN invite_count + 1 >= 25   THEN 'priority_access'
             WHEN invite_count + 1 >= 5    THEN 'early_access'
             ELSE 'waitlist'
           END
    WHERE  referral_code = NEW.referred_by
    RETURNING invite_count, COALESCE(name, split_part(email, '@', 1))
    INTO   v_referrer_invites, v_referrer_name;

    IF FOUND THEN

      INSERT INTO referrals (referrer_code, referee_email, referee_id)
      VALUES (NEW.referred_by, NEW.email, NEW.id)
      ON CONFLICT DO NOTHING;

      -- Milestone notification
      IF v_referrer_invites IN (5, 25, 100, 500, 2000) THEN
        INSERT INTO notifications (message, is_public)
        VALUES (
          v_referrer_name || ' just reached ' || v_referrer_invites || ' invites! 🔥',
          true
        );
      END IF;
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_waitlist_user_insert ON waitlist_users;
CREATE TRIGGER on_waitlist_user_insert
  AFTER INSERT ON waitlist_users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_waitlist_user();

-- ── Realtime ─────────────────────────────────────────────────
-- Run these two lines if not already in the publication:
ALTER PUBLICATION supabase_realtime ADD TABLE notifications;
ALTER PUBLICATION supabase_realtime ADD TABLE waitlist_users;

-- ============================================================
-- Google OAuth setup (do this in Supabase Dashboard):
--   1. Authentication → Providers → Google → Enable
--   2. Add your Google OAuth Client ID + Secret
--   3. Authentication → URL Configuration → set Site URL
--   4. Add http://localhost:3000 to Additional Redirect URLs
-- ============================================================
