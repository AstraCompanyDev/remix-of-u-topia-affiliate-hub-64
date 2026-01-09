-- Create packages table for membership tiers
CREATE TABLE public.packages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  price_usd numeric NOT NULL CHECK (price_usd > 0),
  shares integer NOT NULL CHECK (shares > 0),
  dividend_cap_percent numeric NOT NULL CHECK (dividend_cap_percent >= 0 AND dividend_cap_percent <= 10),
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_by text
);

-- Insert default packages
INSERT INTO public.packages (name, price_usd, shares, dividend_cap_percent) VALUES
  ('Bronze', 100, 100, 2),
  ('Silver', 500, 550, 3),
  ('Gold', 1000, 1200, 4),
  ('Platinum', 5000, 6500, 5),
  ('Diamond', 10000, 14000, 6);

-- Create platform_settings table for configurable parameters
CREATE TABLE public.platform_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value jsonb NOT NULL,
  description text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_by text
);

-- Insert default settings
INSERT INTO public.platform_settings (key, value, description) VALUES
  ('payout_timing_hours', '24', 'Hours before payout processing'),
  ('payout_cycle_days', '7', 'Days between payout cycles'),
  ('referral_link_single_use', 'false', 'Whether referral links are single-use'),
  ('campaign_enabled', 'true', 'Whether referral campaigns are active');

-- Create admin_audit_log table for tracking admin actions
CREATE TABLE public.admin_audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_email text NOT NULL,
  action text NOT NULL,
  target_table text NOT NULL,
  target_id text,
  before jsonb,
  after jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Add missing columns to admin_whitelist
ALTER TABLE public.admin_whitelist 
  ADD COLUMN IF NOT EXISTS created_by text,
  ADD COLUMN IF NOT EXISTS updated_at timestamp with time zone DEFAULT now(),
  ADD COLUMN IF NOT EXISTS updated_by text;

-- Enable RLS on new tables
ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.platform_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_audit_log ENABLE ROW LEVEL SECURITY;

-- Packages policies (read for all authenticated, write for admins)
CREATE POLICY "Authenticated users can view active packages"
ON public.packages FOR SELECT TO authenticated
USING (is_active = true);

CREATE POLICY "Admins can view all packages"
ON public.packages FOR SELECT TO authenticated
USING (is_admin((auth.jwt() ->> 'email'::text)));

CREATE POLICY "Admins can update packages"
ON public.packages FOR UPDATE TO authenticated
USING (is_admin((auth.jwt() ->> 'email'::text)))
WITH CHECK (is_admin((auth.jwt() ->> 'email'::text)));

CREATE POLICY "Admins can insert packages"
ON public.packages FOR INSERT TO authenticated
WITH CHECK (is_admin((auth.jwt() ->> 'email'::text)));

-- Platform settings policies (admin only)
CREATE POLICY "Admins can view platform settings"
ON public.platform_settings FOR SELECT TO authenticated
USING (is_admin((auth.jwt() ->> 'email'::text)));

CREATE POLICY "Admins can update platform settings"
ON public.platform_settings FOR UPDATE TO authenticated
USING (is_admin((auth.jwt() ->> 'email'::text)))
WITH CHECK (is_admin((auth.jwt() ->> 'email'::text)));

CREATE POLICY "Admins can insert platform settings"
ON public.platform_settings FOR INSERT TO authenticated
WITH CHECK (is_admin((auth.jwt() ->> 'email'::text)));

-- Audit log policies (admin read, insert for logging)
CREATE POLICY "Admins can view audit log"
ON public.admin_audit_log FOR SELECT TO authenticated
USING (is_admin((auth.jwt() ->> 'email'::text)));

CREATE POLICY "Admins can insert audit log"
ON public.admin_audit_log FOR INSERT TO authenticated
WITH CHECK (is_admin((auth.jwt() ->> 'email'::text)));

-- Add delete policy for admin_whitelist (admins only, with protection)
CREATE POLICY "Admins can delete from whitelist"
ON public.admin_whitelist AS RESTRICTIVE FOR DELETE TO authenticated
USING (is_admin((auth.jwt() ->> 'email'::text)));

-- Create trigger for packages updated_at
CREATE TRIGGER update_packages_updated_at
  BEFORE UPDATE ON public.packages
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create trigger for platform_settings updated_at
CREATE TRIGGER update_platform_settings_updated_at
  BEFORE UPDATE ON public.platform_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create trigger for admin_whitelist updated_at
CREATE TRIGGER update_admin_whitelist_updated_at
  BEFORE UPDATE ON public.admin_whitelist
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();