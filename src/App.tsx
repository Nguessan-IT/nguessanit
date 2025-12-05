import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { CurrencyProvider } from "./contexts/CurrencyContext";
import { AuthProvider } from "./contexts/AuthContext";
import Layout from "./components/Layout";
import TechBackground from "./components/TechBackground";
import Home from "./pages/Home";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Quote from "./pages/Quote";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Legal from "./pages/Legal";
import NotFound from "./pages/NotFound";

// Admin pages
import Login from "./pages/admin/Login";
import Register from "./pages/admin/Register";
import Dashboard from "./pages/admin/Dashboard";
import Clients from "./pages/admin/Clients";
import AdminServices from "./pages/admin/Services";
import Quotes from "./pages/admin/Quotes";
import Invoices from "./pages/admin/Invoices";
import Interactions from "./pages/admin/Interactions";
import { AdminLayout } from "./components/admin/AdminLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <CurrencyProvider>
          <AuthProvider>
            <TechBackground />
            <Toaster />
            <BrowserRouter>
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Layout><Home /></Layout>} />
                <Route path="/services" element={<Layout><Services /></Layout>} />
                <Route path="/about" element={<Layout><About /></Layout>} />
                <Route path="/contact" element={<Layout><Contact /></Layout>} />
                <Route path="/devis" element={<Layout><Quote /></Layout>} />
                <Route path="/politique-confidentialite" element={<Layout><Privacy /></Layout>} />
                <Route path="/conditions" element={<Layout><Terms /></Layout>} />
                <Route path="/mentions-legales" element={<Layout><Legal /></Layout>} />

                {/* Admin auth routes */}
                <Route path="/admin/login" element={<Login />} />
                <Route path="/admin/register" element={<Register />} />

                {/* Admin protected routes */}
                <Route path="/admin" element={<AdminLayout><Dashboard /></AdminLayout>} />
                <Route path="/admin/clients" element={<AdminLayout><Clients /></AdminLayout>} />
                <Route path="/admin/services" element={<AdminLayout><AdminServices /></AdminLayout>} />
                <Route path="/admin/quotes" element={<AdminLayout><Quotes /></AdminLayout>} />
                <Route path="/admin/invoices" element={<AdminLayout><Invoices /></AdminLayout>} />
                <Route path="/admin/interactions" element={<AdminLayout><Interactions /></AdminLayout>} />

                {/* Catch-all */}
                <Route path="*" element={<Layout><NotFound /></Layout>} />
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </CurrencyProvider>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
