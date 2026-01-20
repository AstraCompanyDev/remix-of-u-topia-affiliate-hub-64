-- Enable realtime for key tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.referrals;
ALTER PUBLICATION supabase_realtime ADD TABLE public.purchases;
ALTER PUBLICATION supabase_realtime ADD TABLE public.commission_ledger;
ALTER PUBLICATION supabase_realtime ADD TABLE public.platform_activity;