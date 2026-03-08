import { Routes, Route, Navigate } from "react-router-dom";
import PublicLayout from "@/components/layout/PublicLayout";
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import PublicServicesPage from "@/pages/PublicServicesPage";
import ContactPage from "@/pages/ContactPage";
import TermsPage from "@/pages/TermsPage";
import PrivacyPage from "@/pages/PrivacyPage";
import AdminPage from "@/pages/AdminPage";

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<PublicServicesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/devis" element={<ContactPage />} />
        <Route path="/conditions" element={<TermsPage />} />
        <Route path="/politique-confidentialite" element={<PrivacyPage />} />
      </Route>
      <Route path="/admin" element={<AdminPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
