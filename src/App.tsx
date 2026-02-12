import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AdminLayout from "@/components/layout/AdminLayout";
import LoginPage from "@/pages/LoginPage";
import DashboardPage from "@/pages/DashboardPage";
import ClientsPage from "@/pages/ClientsPage";
import ServicesPage from "@/pages/ServicesPage";
import QuotesPage from "@/pages/QuotesPage";
import InvoicesPage from "@/pages/InvoicesPage";
import InteractionsPage from "@/pages/InteractionsPage";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
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
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </AuthProvider>
  );
}
