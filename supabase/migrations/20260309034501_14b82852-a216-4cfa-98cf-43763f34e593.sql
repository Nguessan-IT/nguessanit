
CREATE TABLE public.portfolio_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  short_description text NOT NULL DEFAULT '',
  full_description text NOT NULL DEFAULT '',
  image_url text,
  category text NOT NULL DEFAULT 'web',
  technologies text[] NOT NULL DEFAULT '{}',
  client_name text,
  project_url text,
  display_order integer NOT NULL DEFAULT 0,
  active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.portfolio_projects ENABLE ROW LEVEL SECURITY;

-- Public read for active projects
CREATE POLICY "Anyone can view active portfolio projects"
  ON public.portfolio_projects FOR SELECT
  USING (active = true);

-- Admin full access
CREATE POLICY "Admins can manage portfolio projects"
  ON public.portfolio_projects FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Seed some example projects
INSERT INTO public.portfolio_projects (title, short_description, full_description, image_url, category, technologies, client_name, display_order) VALUES
  ('Site E-commerce ModaCI', 'Plateforme e-commerce complète pour une marque de mode ivoirienne', 'Développement d''une plateforme e-commerce moderne avec gestion de catalogue, panier, paiement mobile money et livraison. Interface responsive optimisée pour le marché africain avec intégration de Wave et Orange Money.', 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800', 'web', ARRAY['React', 'Node.js', 'Stripe', 'Mobile Money'], 'ModaCI', 1),
  ('ERP Gestion Industrielle', 'Système ERP complet pour une entreprise industrielle', 'Conception et déploiement d''un ERP intégré couvrant la gestion des stocks, la production, la comptabilité et les ressources humaines. Tableau de bord en temps réel avec alertes automatisées.', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800', 'erp', ARRAY['React', 'Supabase', 'PostgreSQL', 'Charts'], 'IndustriePlus', 2),
  ('Application Mobile Santé', 'App de suivi médical pour cliniques privées', 'Application mobile cross-platform pour la gestion des rendez-vous, le suivi des dossiers patients et la téléconsultation. Système de notifications et rappels automatiques.', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800', 'mobile', ARRAY['React Native', 'Firebase', 'API REST'], 'CliniqueModerne', 3),
  ('Infrastructure Cloud PME', 'Migration cloud complète pour un groupe de PME', 'Migration de l''infrastructure IT de 5 PME vers le cloud avec mise en place de VPN, sauvegarde automatique, monitoring 24/7 et formation des équipes.', 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800', 'cloud', ARRAY['AWS', 'Docker', 'Terraform', 'Monitoring'], 'GroupePME+', 4),
  ('Identité Visuelle TechStart', 'Branding complet pour une startup technologique', 'Création de l''identité visuelle complète : logo, charte graphique, supports marketing digitaux et print, templates réseaux sociaux et guide de marque.', 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800', 'branding', ARRAY['Figma', 'Illustrator', 'Photoshop'], 'TechStart', 5),
  ('Portail Éducatif en Ligne', 'Plateforme e-learning pour un institut de formation', 'Développement d''une plateforme de formation en ligne avec cours vidéo, quiz interactifs, suivi de progression et certification automatique. Espace administrateur pour gérer les contenus.', 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800', 'web', ARRAY['React', 'Node.js', 'Video Streaming', 'PDF'], 'InstitutFormation', 6);
