-- Enable real-time for packages table
ALTER TABLE public.packages REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.packages;