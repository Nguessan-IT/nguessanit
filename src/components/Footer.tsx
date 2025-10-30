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
  Code2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();
  
  const navigation = [
    { name: t('nav.home'), href: "/" },
    { name: t('nav.services'), href: "/services" },
    { name: t('nav.about'), href: "/about" },
    { name: t('nav.contact'), href: "/contact" },
    { name: t('nav.quote'), href: "/devis" },
  ];

  const services = [
    t('services.web.title'),
    t('services.maintenance.title'),
    t('services.cloud.title'), 
    t('services.training.title'),
    "Audit Sécurité",
    "Support 24/7"
  ];

  const contactInfo = [
    { icon: Mail, text: "fiacrenguessan@outlook.com", href: "mailto:fiacrenguessan@outlook.com" },
    { icon: Phone, text: "+225 0777655416", href: "tel:+2250777655416" },
    { icon: MapPin, text: "Côte d'Ivoire", href: "#" }
  ];

  const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/nguessanit", label: "Instagram" },
    { icon: Linkedin, href: "https://www.linkedin.com/company/nguessan-it", label: "LinkedIn" },
    { icon: Facebook, href: "https://www.facebook.com/share/19vPLXiLwK/?mibextid=wwXIfr", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" }
  ];

  return (
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
                  src="/lovable-uploads/b43669b1-97e9-497f-8080-b24192eede10.png" 
                  alt="Nguessan-IT logo entreprise informatique Abidjan - Expert développement web maintenance IT cloud formation Côte d'Ivoire Afrique"
                  title="Nguessan-IT - Votre partenaire informatique de confiance en Côte d'Ivoire"
                  className="w-12 h-12 rounded-xl shadow-lg"
                  loading="lazy"
                  width="48"
                  height="48"
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
                {t('footer.description')}
              </p>
            </div>
            
            {/* Navigation */}
            <div>
              <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                {t('footer.navigation')}
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
                {t('footer.services')}
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
                {t('footer.contact')}
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
                    className="w-9 h-9 bg-secondary hover:bg-primary rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-glow group"
                  >
                    <social.icon className="h-4 w-4 text-secondary-foreground group-hover:text-primary-foreground transition-colors" />
                  </a>
                ))}
              </div>
              
              {/* CTA Button */}
              <div className="mt-2">
                <Button className="w-full hero-glow animate-pulse-glow" asChild>
                  <Link to="/devis">
                    {t('footer.cta')}
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
              <span>{t('footer.copyright')}</span>
              <span className="hidden md:inline">•</span>
              <span className="flex items-center gap-1">
                {t('footer.madeWith')} <Heart className="h-4 w-4 text-red-500 fill-current" /> {t('footer.location')}
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              <Link 
                to="/politique-confidentialite" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {t('footer.privacy')}
              </Link>
              <span className="text-muted-foreground">•</span>
              <Link 
                to="/conditions" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {t('footer.terms')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;