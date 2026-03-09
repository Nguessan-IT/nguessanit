
CREATE TABLE public.site_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stat_key text NOT NULL UNIQUE,
  stat_value text NOT NULL,
  label text NOT NULL,
  icon_name text NOT NULL DEFAULT 'Rocket',
  color text NOT NULL DEFAULT '210 100% 55%',
  display_order integer NOT NULL DEFAULT 0,
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.site_stats ENABLE ROW LEVEL SECURITY;

-- Anyone can read stats (public page)
CREATE POLICY "Anyone can view site stats"
  ON public.site_stats FOR SELECT
  USING (true);

-- Only admins can manage stats
CREATE POLICY "Admins can manage site stats"
  ON public.site_stats FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Seed default values
INSERT INTO public.site_stats (stat_key, stat_value, label, icon_name, color, display_order) VALUES
  ('projects', '40+', 'Projets livrés', 'Rocket', '210 100% 55%', 1),
  ('satisfaction', '80%', 'Satisfaction client', 'ThumbsUp', '160 80% 45%', 2),
  ('continents', '2', 'Continents couverts', 'Globe', '270 80% 60%', 3),
  ('support', '19/7', 'Support disponible', 'Headphones', '35 95% 55%', 4);
