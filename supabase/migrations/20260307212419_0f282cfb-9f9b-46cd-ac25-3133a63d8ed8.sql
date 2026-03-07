CREATE TABLE public.bot_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_key TEXT NOT NULL UNIQUE,
  metric_value TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.bot_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read of bot_stats"
  ON public.bot_stats FOR SELECT
  TO anon, authenticated
  USING (true);

-- Seed with initial metrics
INSERT INTO public.bot_stats (metric_key, metric_value) VALUES
  ('sessions', '0'),
  ('plans_generated', '0'),
  ('steps_completed', '0'),
  ('avg_time_to_plan', '< 2 min');