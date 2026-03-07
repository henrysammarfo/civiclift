CREATE POLICY "Allow service role update of bot_stats"
  ON public.bot_stats FOR UPDATE
  USING (true)
  WITH CHECK (true);