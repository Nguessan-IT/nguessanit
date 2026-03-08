import { NavLink, Outlet } from "react-router-dom";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import { useState } from "react";
import logoImg from "@/assets/logo-nguessan-it.png";
import HighTechBackground from "@/components/shared/HighTechBackground";
import Footer from "@/components/layout/Footer";
import WhatsAppChat from "@/components/shared/WhatsAppChat";

const navLinks = [
  { to: "/", label: "Accueil" },
  { to: "/about", label: "À propos" },
  { to: "/services", label: "Services" },
  { to: "/contact", label: "Contact" },
];

export default function PublicLayout() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col text-foreground relative">
      <HighTechBackground />
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-3">
            <img src={logoImg} alt="Logo Nguessan-IT" className="h-9 w-auto" />
            <div className="hidden sm:block">
              <span className="font-display text-lg font-bold text-primary leading-tight block">Nguessan-IT</span>
              <span className="text-[11px] text-muted-foreground leading-tight block">Votre partenaire digital pour innover et transformer</span>
            </div>
          </NavLink>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-md text-sm font-medium transition ${isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-accent"}`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {/* Language selector */}
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition">
              <Globe size={16} />
              <span className="text-xs">🇫🇷</span>
              <span className="text-sm">Français</span>
              <ChevronDown size={14} />
            </button>
            <NavLink
              to="/contact"
              className="px-5 py-2 border border-foreground/20 rounded-md text-sm font-medium text-foreground hover:bg-accent transition"
            >
              Devis gratuit
            </NavLink>
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <nav className="md:hidden border-t border-border bg-card px-4 pb-4 space-y-1 pt-2">
            {navLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block py-2.5 px-3 rounded-md text-sm font-medium ${isActive ? "bg-primary/10 text-primary" : "text-muted-foreground"}`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <NavLink
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className="block text-center py-2.5 border border-foreground/20 rounded-md text-sm font-medium mt-2"
            >
              Devis gratuit
            </NavLink>
          </nav>
        )}
      </header>

      {/* Page content */}
      <main className="flex-1 relative z-10">
        <Outlet />
      </main>

      <Footer />
      <WhatsAppChat />
    </div>
  );
}
