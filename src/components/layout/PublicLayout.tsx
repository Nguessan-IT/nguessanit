import { NavLink, Outlet } from "react-router-dom";
import { Menu, X, Mail, Phone, MapPin, Linkedin, Instagram, Facebook } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { to: "/", label: "Accueil" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "À propos" },
  { to: "/contact", label: "Contact" },
];

export default function PublicLayout() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <NavLink to="/" className="font-display text-xl font-bold text-primary">
            Nguessan-IT
          </NavLink>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `text-sm font-medium transition ${isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"}`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <NavLink
              to="/contact"
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:opacity-90 transition"
            >
              Demandez un devis
            </NavLink>
          </nav>

          {/* Mobile toggle */}
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <nav className="md:hidden border-t border-border bg-card px-4 pb-4 space-y-2">
            {navLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block py-2 text-sm font-medium ${isActive ? "text-primary" : "text-muted-foreground"}`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <NavLink
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className="block text-center py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium"
            >
              Demandez un devis
            </NavLink>
          </nav>
        )}
      </header>

      {/* Page content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-sidebar text-sidebar-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-display text-lg font-bold mb-3">Nguessan-IT</h3>
            <p className="text-sm text-sidebar-foreground/70 mb-4">
              Votre partenaire digital pour innover et transformer.
            </p>
            <div className="flex gap-3">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition"><Linkedin size={18} /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition"><Instagram size={18} /></a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition"><Facebook size={18} /></a>
            </div>
          </div>

          {/* Liens utiles */}
          <div>
            <h4 className="font-semibold text-sm mb-3">Liens utiles</h4>
            <ul className="space-y-2 text-sm text-sidebar-foreground/70">
              {navLinks.map((l) => (
                <li key={l.to}>
                  <NavLink to={l.to} className="hover:text-sidebar-foreground transition">{l.label}</NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-sm mb-3">Services</h4>
            <ul className="space-y-2 text-sm text-sidebar-foreground/70">
              <li>Transformation digitale</li>
              <li>Cloud & Infrastructure</li>
              <li>Développement web & mobile</li>
              <li>Conseil IT & IA</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm mb-3">Contact</h4>
            <ul className="space-y-2 text-sm text-sidebar-foreground/70">
              <li className="flex items-center gap-2"><MapPin size={14} /> Abidjan, Côte d'Ivoire</li>
              <li className="flex items-center gap-2"><Mail size={14} /> contact@nguessan-it.com</li>
              <li className="flex items-center gap-2"><Phone size={14} /> +225 XX XX XX XX</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-sidebar-accent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-sidebar-foreground/50">
            <p>© 2025 Nguessan-IT — Tous droits réservés</p>
            <div className="flex gap-4">
              <span className="hover:text-sidebar-foreground cursor-pointer transition">Mentions légales</span>
              <span className="hover:text-sidebar-foreground cursor-pointer transition">Politique de confidentialité</span>
              <span className="hover:text-sidebar-foreground cursor-pointer transition">CGU</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
