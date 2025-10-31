import { Link } from "react-router-dom";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Linkedin, 
  Instagram,
  Globe,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();
  
  const quickLinks = [
    { name: "Accueil", href: "/" },
    { name: "Services", href: "/services" },
    { name: "À propos", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Devis gratuit", href: "/devis" }
  ];

  const services = [
    { name: "Développement Web & Mobile", href: "/services" },
    { name: "Cloud & Infrastructure", href: "/services" },
    { name: "Intelligence Artificielle", href: "/services" },
    { name: "Conseil & Stratégie IT", href: "/services" },
    { name: "Formation & Support", href: "/services" },
    { name: "Identité Visuelle & Branding", href: "/services" }
  ];

  const contact = [
    { icon: Mail, text: "contact@nguessan-it.com", href: "mailto:contact@nguessan-it.com", label: "Email" },
    { icon: Phone, text: "+225 07 77 65 54 16", href: "tel:+2250777655416", label: "Téléphone" },
    { icon: MapPin, text: "Abidjan, Côte d'Ivoire", href: "#", label: "Adresse" }
  ];
  
  const legalLinks = [
    { name: "Mentions légales", href: "/mentions-legales" },
    { name: "Politique de confidentialité", href: "/politique-confidentialite" },
    { name: "Conditions d'utilisation", href: "/conditions" }
  ];

  const socialLinks = [
    { icon: Linkedin, href: "https://linkedin.com/company/nguessan-it", label: "LinkedIn" },
    { icon: Instagram, href: "https://instagram.com/nguessanit", label: "Instagram" },
    { icon: Facebook, href: "https://facebook.com/share/19vPLXiLwK/?mibextid=wwXIfr", label: "Facebook" },
    { icon: Globe, href: "https://www.nguessan-it.com", label: "Site web" }
  ];

  return (
    <footer className="relative mt-16 bg-gradient-to-br from-card/95 via-background/90 to-card/95 backdrop-blur-lg border-t border-primary/20">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Bloc 1: Logo & Description */}
          <div className="space-y-6">
            <Link to="/" className="inline-block">
              <img
                src="/lovable-uploads/bc7144b0-fd62-41b6-942a-989408889f91.png"
                alt="Logo officiel Nguessan-IT, solutions digitales innovantes"
                className="h-16 w-auto"
                loading="lazy"
              />
            </Link>
            <p className="text-muted-foreground leading-relaxed">
              Votre partenaire digital pour transformer vos idées en solutions technologiques performantes.
            </p>
            <Button className="w-full hero-glow" asChild>
              <Link to="/devis">
                Demandez un devis gratuit
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Bloc 2: Liens rapides */}
          <div>
            <h3 className="text-lg font-semibold mb-6 gradient-text">Liens utiles</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Bloc 3: Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6 gradient-text">Nos Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    to={service.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Bloc 4: Contact Rapide */}
          <div>
            <h3 className="text-lg font-semibold mb-6 gradient-text">Contact Rapide</h3>
            <ul className="space-y-4">
              {contact.map((item) => (
                <li key={item.text}>
                  <a
                    href={item.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 flex items-start gap-3 group"
                  >
                    <item.icon className="h-5 w-5 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{item.label}</p>
                      <p className="text-sm">{item.text}</p>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
            
            {/* Réseaux sociaux */}
            <div className="mt-6">
              <p className="text-sm font-medium text-foreground mb-3">Suivez-nous</p>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-primary/10 hover:bg-primary hover:text-primary-foreground rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border/50 my-8"></div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-center">
          {/* Copyright */}
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} <span className="text-primary font-semibold">Nguessan-IT</span> — Tous droits réservés.
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Made with ❤️ in Abidjan, Côte d'Ivoire
            </p>
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            {legalLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* HTML Sitemap (SEO) */}
          <div className="text-center md:text-right">
            <p className="text-xs text-muted-foreground mb-2">Plan du site</p>
            <div className="flex flex-wrap justify-center md:justify-end gap-3 text-xs">
              <Link to="/" className="text-muted-foreground hover:text-primary">Accueil</Link>
              <span className="text-muted-foreground">•</span>
              <Link to="/services" className="text-muted-foreground hover:text-primary">Services</Link>
              <span className="text-muted-foreground">•</span>
              <Link to="/about" className="text-muted-foreground hover:text-primary">À propos</Link>
              <span className="text-muted-foreground">•</span>
              <Link to="/contact" className="text-muted-foreground hover:text-primary">Contact</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
