-- Correction des politiques RLS pour la table quotes
-- Supprimer la politique trop permissive
DROP POLICY IF EXISTS "Users can view all quotes" ON public.quotes;

-- Créer une politique restrictive : seuls les créateurs et les admins peuvent voir les devis
CREATE POLICY "Créateurs et admins peuvent voir les devis" 
ON public.quotes 
FOR SELECT 
USING (
  auth.uid() = created_by OR 
  has_role(auth.uid(), 'admin'::app_role)
);

-- Ajouter une politique de suppression pour les admins
CREATE POLICY "Admins peuvent supprimer les devis" 
ON public.quotes 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));