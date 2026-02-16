import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AdminLayout from "@/components/layout/AdminLayout";
import PublicLayout from "@/components/layout/PublicLayout";
import LoginPage from "@/pages/LoginPage";
import DashboardPage from "@/pages/DashboardPage";
import ClientsPage from "@/pages/ClientsPage";
import ServicesPage from "@/pages/ServicesPage";
import QuotesPage from "@/pages/QuotesPage";
import InvoicesPage from "@/pages/InvoicesPage";
import InteractionsPage from "@/pages/InteractionsPage";
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import PublicServicesPage from "@/pages/PublicServicesPage";
import ContactPage from "@/pages/ContactPage";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public pages */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<PublicServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>

        {/* Admin */}
        <Route path="/admin/login" element={<LoginPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="clients" element={<ClientsPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="quotes" element={<QuotesPage />} />
          <Route path="invoices" element={<InvoicesPage />} />
          <Route path="interactions" element={<InteractionsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}
