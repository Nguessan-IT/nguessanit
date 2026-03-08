import { Link } from "react-router-dom";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram,
  Sparkles,
  ArrowUp,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import logoImg from "@/assets/logo-nguessan-it.png";
import NewsletterSignup from "@/components/shared/NewsletterSignup";

const Footer = () => {
  const navigation = [
    { name: "Accueil", href: "/" },
    { name: "Services", href: "/services" },
    { name: "À propos", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Devis", href: "/devis" },
  ];

  const services = [
    "Développement Web",
    "Maintenance IT",
    "Solutions Cloud", 
    "Formation & Conseil",
    "Audit Sécurité",
    "Support 24/7"
  ];

  const contactInfo = [
    { icon: Mail, text: "fiacrenguessan@outlook.com", href: "mailto:fiacrenguessan@outlook.com" },
    { icon: Phone, text: "+225 0777655416", href: "tel:+2250777655416" },
    { icon: MapPin, text: "Côte d'Ivoire", href: "#" }
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Instagram, href: "#", label: "Instagram" }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
    <NewsletterSignup />
    <footer className="relative bg-primary/10 border-t border-primary/20 overflow-hidden backdrop-blur-lg shadow-lg shadow-primary/10">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <img 
                  src={logoImg}
                  alt="Nguessan-IT Logo" 
                  className="w-12 h-12 rounded-xl shadow-lg"
                />
                <div>
                  <span className="font-bold text-xl gradient-text block">
                    Nguessan-IT
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Solutions Digitales
                  </span>
                </div>
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Solutions informatiques de pointe pour propulser votre entreprise vers l'excellence digitale. 
                Innovation, expertise et accompagnement personnalisé depuis 2025.
              </p>
            </div>
            
            {/* Navigation */}
            <div>
              <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Navigation
              </h3>
              <ul className="space-y-3">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Nos Services
              </h3>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index}>
                    <Link
                      to="/services"
                      className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block"
                    >
                      {service}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Contact
              </h3>
              <ul className="space-y-4">
                {contactInfo.map((info, index) => (
                  <li key={index}>
                    <a
                      href={info.href}
                      className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors duration-300 group"
                    >
                      <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center group-hover:bg-primary transition-colors">
                        <info.icon className="h-4 w-4 group-hover:text-primary-foreground" />
                      </div>
                      <span className="text-sm">{info.text}</span>
                    </a>
                  </li>
                ))}
              </ul>
              
              {/* Social Links */}
              <div className="flex space-x-3 mt-6 mb-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-9 h-9 bg-secondary hover:bg-primary rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                  >
                    <social.icon className="h-4 w-4 text-secondary-foreground group-hover:text-primary-foreground transition-colors" />
                  </a>
                ))}
              </div>
              
              {/* CTA Button */}
              <div className="mt-2">
                <Button className="w-full hero-glow" asChild>
                  <Link to="/devis">
                    🚀 Obtenir un Devis
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Divider */}
        <div className="border-t border-border"></div>
        
        {/* Bottom Section */}
        <div className="py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <span>&copy; {new Date().getFullYear()} Nguessan-IT. Tous droits réservés.</span>
              <span className="hidden md:inline">•</span>
              <span className="flex items-center gap-1">
                Fait avec <Heart className="h-4 w-4 text-red-500 fill-current" /> en Côte d'Ivoire
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              <Link 
                to="/politique-confidentialite" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Politique de confidentialité
              </Link>
              <span className="text-muted-foreground">•</span>
              <Link 
                to="/conditions" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Conditions d'utilisation
              </Link>
              
              {/* Scroll to top button */}
              <Button
                variant="outline"
                size="sm"
                onClick={scrollToTop}
                className="ml-4 w-10 h-10 p-0 transition-all duration-300"
              >
                <ArrowUp className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
    </>
  );
};

export default Footer;
