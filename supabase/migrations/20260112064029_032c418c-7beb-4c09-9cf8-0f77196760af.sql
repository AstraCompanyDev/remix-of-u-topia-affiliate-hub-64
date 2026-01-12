-- Create enum types for the commission system
CREATE TYPE public.referral_status AS ENUM ('pending', 'active', 'invalid');
CREATE TYPE public.affiliate_tier AS ENUM ('bronze', 'silver', 'gold', 'platinum', 'diamond');
CREATE TYPE public.revenue_status AS ENUM ('pending', 'settled', 'reversed');
CREATE TYPE public.commission_status AS ENUM ('pending', 'approved', 'paid', 'reversed', 'held');

-- 1) Referral Relationships Table
CREATE TABLE public.referrals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    referrer_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    referred_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    status referral_status NOT NULL DEFAULT 'pending',
    verified_at TIMESTAMP WITH TIME ZONE,
    CONSTRAINT unique_referred_user UNIQUE (referred_user_id)
);

-- 2) Affiliate Tier Status Table
CREATE TABLE public.affiliate_status (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    tier affiliate_tier NOT NULL DEFAULT 'bronze',
    tier_depth_limit INT NOT NULL DEFAULT 1 CHECK (tier_depth_limit >= 1 AND tier_depth_limit <= 5),
    is_active BOOLEAN NOT NULL DEFAULT true,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 3) Commission Rates Table (Admin Editable)
CREATE TABLE public.commission_rates (
    layer INT PRIMARY KEY CHECK (layer >= 1 AND layer <= 5),
    rate_percent NUMERIC NOT NULL CHECK (rate_percent >= 0 AND rate_percent <= 100),
    is_active BOOLEAN NOT NULL DEFAULT true,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_by TEXT
);

-- Insert default commission rates
INSERT INTO public.commission_rates (layer, rate_percent, is_active) VALUES
    (1, 12, true),
    (2, 8, true),
    (3, 4, true),
    (4, 2, true),
    (5, 1, true);

-- 4) Revenue Events Table (Source of Truth)
CREATE TABLE public.revenue_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    source TEXT NOT NULL,
    amount_usd NUMERIC NOT NULL CHECK (amount_usd >= 0),
    status revenue_status NOT NULL DEFAULT 'pending',
    external_reference TEXT UNIQUE,
    occurred_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    settled_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 5) Commission Ledger Table (Payout Records)
CREATE TABLE public.commission_ledger (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    beneficiary_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    source_revenue_event_id UUID NOT NULL REFERENCES public.revenue_events(id) ON DELETE CASCADE,
    layer INT NOT NULL CHECK (layer >= 1 AND layer <= 5),
    referred_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    amount_usd NUMERIC NOT NULL,
    rate_percent NUMERIC NOT NULL,
    status commission_status NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    notes TEXT,
    CONSTRAINT unique_commission_entry UNIQUE (beneficiary_user_id, source_revenue_event_id, layer)
);

-- 6) Approved Revenue Sources Table (Admin Editable)
CREATE TABLE public.approved_revenue_sources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_name TEXT NOT NULL UNIQUE,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert default approved sources
INSERT INTO public.approved_revenue_sources (source_name, is_active) VALUES
    ('ubank', true),
    ('upay', true),
    ('card_services', true),
    ('merchant_acquiring', true),
    ('subscription', true),
    ('nfc_ring', true),
    ('membership', true);

-- Create indexes for performance
CREATE INDEX idx_referrals_referrer ON public.referrals(referrer_user_id);
CREATE INDEX idx_referrals_referred ON public.referrals(referred_user_id);
CREATE INDEX idx_referrals_status ON public.referrals(status);
CREATE INDEX idx_revenue_events_user ON public.revenue_events(user_id);
CREATE INDEX idx_revenue_events_status ON public.revenue_events(status);
CREATE INDEX idx_commission_ledger_beneficiary ON public.commission_ledger(beneficiary_user_id);
CREATE INDEX idx_commission_ledger_status ON public.commission_ledger(status);
CREATE INDEX idx_commission_ledger_source ON public.commission_ledger(source_revenue_event_id);

-- Enable RLS on all tables
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.affiliate_status ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.commission_rates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.revenue_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.commission_ledger ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.approved_revenue_sources ENABLE ROW LEVEL SECURITY;

-- RLS Policies for referrals
CREATE POLICY "Users can view their own referrals as referrer"
ON public.referrals FOR SELECT
USING (auth.uid() = referrer_user_id);

CREATE POLICY "Users can view their own referral record"
ON public.referrals FOR SELECT
USING (auth.uid() = referred_user_id);

CREATE POLICY "Admins can view all referrals"
ON public.referrals FOR SELECT
USING (is_admin((auth.jwt() ->> 'email'::text)));

CREATE POLICY "Service role can insert referrals"
ON public.referrals FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can update referrals"
ON public.referrals FOR UPDATE
USING (is_admin((auth.jwt() ->> 'email'::text)))
WITH CHECK (is_admin((auth.jwt() ->> 'email'::text)));

-- RLS Policies for affiliate_status
CREATE POLICY "Users can view their own affiliate status"
ON public.affiliate_status FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all affiliate statuses"
ON public.affiliate_status FOR SELECT
USING (is_admin((auth.jwt() ->> 'email'::text)));

CREATE POLICY "Service role can insert affiliate status"
ON public.affiliate_status FOR INSERT
WITH CHECK (true);

CREATE POLICY "Service role can update affiliate status"
ON public.affiliate_status FOR UPDATE
USING (true)
WITH CHECK (true);

CREATE POLICY "Admins can update affiliate status"
ON public.affiliate_status FOR UPDATE
USING (is_admin((auth.jwt() ->> 'email'::text)))
WITH CHECK (is_admin((auth.jwt() ->> 'email'::text)));

-- RLS Policies for commission_rates
CREATE POLICY "Anyone can view active commission rates"
ON public.commission_rates FOR SELECT
USING (is_active = true);

CREATE POLICY "Admins can view all commission rates"
ON public.commission_rates FOR SELECT
USING (is_admin((auth.jwt() ->> 'email'::text)));

CREATE POLICY "Admins can update commission rates"
ON public.commission_rates FOR UPDATE
USING (is_admin((auth.jwt() ->> 'email'::text)))
WITH CHECK (is_admin((auth.jwt() ->> 'email'::text)));

CREATE POLICY "Admins can insert commission rates"
ON public.commission_rates FOR INSERT
WITH CHECK (is_admin((auth.jwt() ->> 'email'::text)));

-- RLS Policies for revenue_events
CREATE POLICY "Users can view their own revenue events"
ON public.revenue_events FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all revenue events"
ON public.revenue_events FOR SELECT
USING (is_admin((auth.jwt() ->> 'email'::text)));

CREATE POLICY "Service role can insert revenue events"
ON public.revenue_events FOR INSERT
WITH CHECK (true);

CREATE POLICY "Service role can update revenue events"
ON public.revenue_events FOR UPDATE
USING (true)
WITH CHECK (true);

CREATE POLICY "Admins can update revenue events"
ON public.revenue_events FOR UPDATE
USING (is_admin((auth.jwt() ->> 'email'::text)))
WITH CHECK (is_admin((auth.jwt() ->> 'email'::text)));

-- RLS Policies for commission_ledger
CREATE POLICY "Users can view their own commissions"
ON public.commission_ledger FOR SELECT
USING (auth.uid() = beneficiary_user_id);

CREATE POLICY "Admins can view all commissions"
ON public.commission_ledger FOR SELECT
USING (is_admin((auth.jwt() ->> 'email'::text)));

CREATE POLICY "Service role can insert commissions"
ON public.commission_ledger FOR INSERT
WITH CHECK (true);

CREATE POLICY "Service role can update commissions"
ON public.commission_ledger FOR UPDATE
USING (true)
WITH CHECK (true);

CREATE POLICY "Admins can update commissions"
ON public.commission_ledger FOR UPDATE
USING (is_admin((auth.jwt() ->> 'email'::text)))
WITH CHECK (is_admin((auth.jwt() ->> 'email'::text)));

-- RLS Policies for approved_revenue_sources
CREATE POLICY "Anyone can view active revenue sources"
ON public.approved_revenue_sources FOR SELECT
USING (is_active = true);

CREATE POLICY "Admins can manage revenue sources"
ON public.approved_revenue_sources FOR ALL
USING (is_admin((auth.jwt() ->> 'email'::text)))
WITH CHECK (is_admin((auth.jwt() ->> 'email'::text)));

-- Add updated_at triggers
CREATE TRIGGER update_affiliate_status_updated_at
    BEFORE UPDATE ON public.affiliate_status
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_commission_rates_updated_at
    BEFORE UPDATE ON public.commission_rates
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Function to get upline chain for commission calculation
CREATE OR REPLACE FUNCTION public.get_upline_chain(p_user_id UUID, p_max_depth INT DEFAULT 5)
RETURNS TABLE (
    layer INT,
    referrer_id UUID
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    current_user_id UUID := p_user_id;
    current_layer INT := 0;
    referrer UUID;
BEGIN
    WHILE current_layer < p_max_depth LOOP
        SELECT r.referrer_user_id INTO referrer
        FROM public.referrals r
        WHERE r.referred_user_id = current_user_id
          AND r.status = 'active';
        
        IF referrer IS NULL THEN
            EXIT;
        END IF;
        
        current_layer := current_layer + 1;
        layer := current_layer;
        referrer_id := referrer;
        RETURN NEXT;
        
        current_user_id := referrer;
    END LOOP;
END;
$$;

-- Function to calculate tier depth limit
CREATE OR REPLACE FUNCTION public.get_tier_depth_limit(p_tier affiliate_tier)
RETURNS INT
LANGUAGE sql
IMMUTABLE
AS $$
    SELECT CASE p_tier
        WHEN 'bronze' THEN 1
        WHEN 'silver' THEN 2
        WHEN 'gold' THEN 3
        WHEN 'platinum' THEN 4
        WHEN 'diamond' THEN 5
    END;
$$;