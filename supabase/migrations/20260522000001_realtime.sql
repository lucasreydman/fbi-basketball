-- Enable realtime publishes on the tables the subscriber views listen to.
alter publication supabase_realtime add table public.ranked_lists;
alter publication supabase_realtime add table public.trade_calc_versions;
