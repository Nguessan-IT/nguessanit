import { Routes, Route, Navigate } from "react-router-dom";
import PublicLayout from "@/components/layout/PublicLayout";
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import PublicServicesPage from "@/pages/PublicServicesPage";
import ContactPage from "@/pages/ContactPage";

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<PublicServicesPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
