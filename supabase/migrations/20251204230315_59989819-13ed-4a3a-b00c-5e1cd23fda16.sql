-- Supprimer l'ancienne politique SELECT trop permissive
DROP POLICY IF EXISTS "Users can view all interactions" ON public.interactions;

-- Créer une nouvelle politique SELECT restrictive
CREATE POLICY "Créateurs, assignés et admins peuvent voir les interactions"
ON public.interactions
FOR SELECT
USING (
  (auth.uid() = created_by) 
  OR (auth.uid() = assigned_to) 
  OR has_role(auth.uid(), 'admin'::app_role)
);