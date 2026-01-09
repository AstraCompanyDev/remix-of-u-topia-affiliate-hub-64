-- Create referral_links table for one-time use referral links
CREATE TABLE public.referral_links (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  code TEXT NOT NULL UNIQUE,
  is_active BOOLEAN NOT NULL DEFAULT true,
  used_at TIMESTAMP WITH TIME ZONE,
  used_by_email TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.referral_links ENABLE ROW LEVEL SECURITY;

-- Users can view their own referral links
CREATE POLICY "Users can view their own referral links"
ON public.referral_links
FOR SELECT
USING (auth.uid() = user_id);

-- Service role can insert referral links (for edge function)
CREATE POLICY "Service role can insert referral links"
ON public.referral_links
FOR INSERT
WITH CHECK (true);

-- Service role can update referral links (for marking as used)
CREATE POLICY "Service role can update referral links"
ON public.referral_links
FOR UPDATE
USING (true)
WITH CHECK (true);

-- Create index for faster lookups
CREATE INDEX idx_referral_links_code ON public.referral_links(code);
CREATE INDEX idx_referral_links_user_active ON public.referral_links(user_id, is_active);

-- Function to generate a unique referral code
CREATE OR REPLACE FUNCTION public.generate_referral_code()
RETURNS TEXT AS $$
DECLARE
  new_code TEXT;
  code_exists BOOLEAN;
BEGIN
  LOOP
    -- Generate a random 8-character alphanumeric code
    new_code := upper(substr(md5(random()::text || clock_timestamp()::text), 1, 8));
    
    -- Check if code already exists
    SELECT EXISTS(SELECT 1 FROM public.referral_links WHERE code = new_code) INTO code_exists;
    
    -- Exit loop if code is unique
    EXIT WHEN NOT code_exists;
  END LOOP;
  
  RETURN new_code;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;