-- Add notification preferences column to profiles
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS notification_preferences jsonb DEFAULT '{"marketing": true, "referral_updates": true, "commission_alerts": true, "platform_news": true}'::jsonb;