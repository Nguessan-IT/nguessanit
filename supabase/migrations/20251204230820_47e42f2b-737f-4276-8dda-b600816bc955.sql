-- ============================================
-- SÉCURISATION DE LA TABLE INVOICES
-- ============================================

-- Supprimer l'ancienne politique SELECT trop permissive
DROP POLICY IF EXISTS "Users can view all invoices" ON public.invoices;

-- Créer une nouvelle politique SELECT restrictive (créateurs et admins)
CREATE POLICY "Créateurs et admins peuvent voir les factures"
ON public.invoices
FOR SELECT
USING (
  (auth.uid() = created_by) OR has_role(auth.uid(), 'admin'::app_role)
);

-- Ajouter politique DELETE pour admins uniquement
CREATE POLICY "Admins peuvent supprimer les factures"
ON public.invoices
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- ============================================
-- SÉCURISATION DE LA TABLE INTERACTIONS
-- ============================================

-- Ajouter politique DELETE (créateurs et admins)
CREATE POLICY "Créateurs et admins peuvent supprimer les interactions"
ON public.interactions
FOR DELETE
USING (
  (auth.uid() = created_by) OR has_role(auth.uid(), 'admin'::app_role)
);