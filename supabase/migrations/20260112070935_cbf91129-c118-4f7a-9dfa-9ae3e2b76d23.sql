-- Add is_test column to relevant tables for test data isolation

-- Add to referrals table
ALTER TABLE public.referrals 
ADD COLUMN IF NOT EXISTS is_test boolean NOT NULL DEFAULT false;

-- Add to revenue_events table
ALTER TABLE public.revenue_events 
ADD COLUMN IF NOT EXISTS is_test boolean NOT NULL DEFAULT false;

-- Add to commission_ledger table
ALTER TABLE public.commission_ledger 
ADD COLUMN IF NOT EXISTS is_test boolean NOT NULL DEFAULT false;

-- Add to purchases table
ALTER TABLE public.purchases 
ADD COLUMN IF NOT EXISTS is_test boolean NOT NULL DEFAULT false;

-- Add to affiliate_status table
ALTER TABLE public.affiliate_status 
ADD COLUMN IF NOT EXISTS is_test boolean NOT NULL DEFAULT false;

-- Add to platform_activity table
ALTER TABLE public.platform_activity 
ADD COLUMN IF NOT EXISTS is_test boolean NOT NULL DEFAULT false;

-- Create index for efficient filtering
CREATE INDEX IF NOT EXISTS idx_referrals_is_test ON public.referrals(is_test);
CREATE INDEX IF NOT EXISTS idx_revenue_events_is_test ON public.revenue_events(is_test);
CREATE INDEX IF NOT EXISTS idx_commission_ledger_is_test ON public.commission_ledger(is_test);
CREATE INDEX IF NOT EXISTS idx_purchases_is_test ON public.purchases(is_test);
CREATE INDEX IF NOT EXISTS idx_affiliate_status_is_test ON public.affiliate_status(is_test);

-- Add platform setting for environment mode
INSERT INTO public.platform_settings (key, value, description)
VALUES ('environment_mode', '"test"', 'Current environment mode: test or production')
ON CONFLICT (key) DO NOTHING;