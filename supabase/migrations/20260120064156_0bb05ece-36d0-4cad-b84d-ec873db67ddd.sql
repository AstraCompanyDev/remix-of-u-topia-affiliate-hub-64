-- Add unique constraint on used_by_email to prevent same email being referred multiple times
-- Only apply to non-null values (partial unique index)
CREATE UNIQUE INDEX idx_referral_links_used_by_email_unique 
ON public.referral_links (used_by_email) 
WHERE used_by_email IS NOT NULL;