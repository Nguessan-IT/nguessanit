import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Code, Server, Shield, Headphones, Palette, FileText, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCurrency } from "@/contexts/CurrencyContext";
import SEO from "@/components/SEO";
import { ServiceModal } from "@/components/ServiceModal";
import { useState } from "react";

const Home = () => {
  const { t } = useLanguage();
  const { formatPrice, isLoading } = useCurrency();
  const [selectedService, setSelectedService] = useState<string | null>(null);
  
  const services = [
    {
      icon: Code,
      title: t('services.web.title'),
      description: t('services.web.description'),
      serviceKey: "webDev",
      features: [t('features.react'), t('features.ecommerce'), t('features.cms'), t('features.responsive')]
    },
    {
      icon: Server,
      title: t('services.maintenance.title'), 
      description: t('services.maintenance.description'),
      serviceKey: "maintenance",
      features: [t('features.support247'), t('features.maintenance'), t('features.security'), t('features.backup')]
    },
    {
      icon: Shield,
      title: t('services.cloud.title'),
      description: t('services.cloud.description'),
      serviceKey: "cloud",
      features: [t('features.aws'), t('features.migration'), t('features.infrastructure'), t('features.security')]
    },
    {
      icon: Headphones,
      title: t('services.training.title'),
      description: t('services.training.description'),
      serviceKey: "training",
      features: [t('features.training'), t('features.audit'), t('features.strategy'), t('features.accompaniment')]
    },
    {
      icon: Palette,
      title: t('services.branding.title'),
      description: t('services.branding.description'),
      serviceKey: "branding",
      features: [t('features.logo'), t('features.identity'), t('features.digital'), t('features.brandguide')]
    },
    {
      icon: FileText,
      title: t('services.interactive.title'),
      description: t('services.interactive.description'),
      serviceKey: "interactive",
      features: [t('features.interactivePdf'), t('features.catalog'), t('features.presentation'), t('features.dynamicReport')]
    }
  ];

  const getPriceDisplay = (serviceKey: string) => {
    if (isLoading) return "Chargement...";
    
    const priceInfo = formatPrice(serviceKey);
    
    if (priceInfo === "Devis sur mesure") {
      return priceInfo;
    }
    
    return `À partir de ${priceInfo}`;
  };

  const stats = [
    { number: "1+", label: t('stats.experience') },
    { number: "10+", label: t('stats.clients') },
    { number: "20+", label: t('stats.projects') },
    { number: "24/7", label: t('stats.support') }
  ];

  return (
    <div>
      <SEO 
        title="Accueil"
        description="🚀 Solutions informatiques expertes à Abidjan, Côte d'Ivoire. Développement web moderne, maintenance IT 24/7, solutions cloud sécurisées, formation professionnelle. +8 ans d'expérience, devis gratuit 24h."
        keywords={[
          'nguessan-it accueil',
          'solutions informatiques abidjan',
          'expert IT côte d\'ivoire', 
          'développement web professionnel',
          'maintenance informatique entreprise',
          'consultant IT premium',
          'transformation digitale afrique'
        ]}
        ogType="business.business"
        twitterCard="summary_large_image"
        image="/src/assets/og-image.jpg"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Nguessan-IT",
          "url": "https://nguessan-it.lovable.app",
          "description": "Expert en solutions informatiques à Abidjan - Développement web, maintenance IT, cloud, formation",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://nguessan-it.lovable.app/services?q={search_term_string}",
            "query-input": "required name=search_term_string"
          },
          "mainEntity": {
            "@type": "Organization",
            "name": "Nguessan-IT",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "CI",
              "addressLocality": "Abidjan"
            }
          }
        }}
      />
      
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-80"></div>
        <div className="floating-elements">
          <div className="floating-orb"></div>
          <div className="floating-orb"></div>
          <div className="floating-orb"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto text-center">
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <img
              src="/lovable-uploads/bc7144b0-fd62-41b6-942a-989408889f91.png"
              alt="Logo Nguessan-IT"
              className="mx-auto w-32 md:w-40 mb-4"
            />
            <p className="text-primary font-semibold tracking-wide uppercase text-sm md:text-base">
              Votre partenaire digital pour innover et transformer
            </p>
          </motion.div>

          {/* H1 - Titre principal */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-3xl sm:text-5xl lg:text-6xl mb-6 font-extrabold leading-tight enhanced-contrast"
          >
            Transformez vos idées en{" "}
            <span className="gradient-text">solutions digitales performantes</span>.
          </motion.h1>
          
          {/* H2 - Sous-titre principal */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-lg sm:text-xl lg:text-2xl text-foreground mb-6 max-w-4xl mx-auto font-semibold leading-relaxed"
          >
            Chez <strong className="text-primary">Nguessan-IT</strong>, nous aidons entreprises, startups et institutions à
            concevoir, développer et déployer des solutions technologiques sur mesure. 
            Notre mission : <strong className="text-primary">digitaliser vos ambitions</strong> et libérer le potentiel de votre
            organisation.
          </motion.h2>

          {/* Sous-texte services */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-base sm:text-lg text-muted-foreground mb-10 max-w-4xl mx-auto italic enhanced-contrast"
          >
            De la conception à la mise en production : <strong>Développement Web & Mobile</strong> — <strong>Cloud & IA</strong> — <strong>Conseil IT</strong> — <strong>Intégration sur mesure</strong>.
          </motion.p>
          
          {/* CTA Buttons avec animations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Button 
              size="lg" 
              className="hero-glow animate-pulse hover:animate-none shadow-lg transition-all duration-300" 
              style={{ boxShadow: "0 0 20px hsl(var(--primary) / 0.4)" }}
              asChild
            >
              <Link to="/contact">
                Demandez votre devis gratuit
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="relative overflow-hidden group border-2 border-primary"
              asChild
            >
              <Link to="/services">
                <span className="absolute inset-0 bg-primary transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
                <span className="relative z-10 group-hover:text-primary-foreground transition-colors duration-300">
                  Découvrez nos services
                </span>
              </Link>
            </Button>
          </motion.div>

          {/* Section internationale avec Globe */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col items-center mt-8"
          >
            <Globe className="w-12 h-12 text-primary mb-3 animate-pulse" />
            <p className="text-muted-foreground text-base sm:text-lg md:text-xl font-medium text-center max-w-3xl enhanced-contrast">
              Partenaire digital de confiance pour les entreprises d'Afrique, d'Europe et d'Amérique.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl mb-4 enhanced-contrast">
              <span className="gradient-text tech-heading">{t('services.title')}</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto modern-text enhanced-contrast">
              {t('services.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="card-elegant border-border hover:shadow-glow transition-all duration-500 group">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  
                  <h3 className="text-xl tech-heading mb-2 text-center">{service.title}</h3>
                  <p className="text-primary font-semibold text-center mb-4 code-text">{getPriceDisplay(service.serviceKey)}</p>
                  <p className="text-muted-foreground text-center mb-6">{service.description}</p>
                  
                  <div className="flex flex-wrap gap-2 justify-center mb-6">
                    {service.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => setSelectedService(service.serviceKey)}
                  >
                    {t('services.learnMore')}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-card/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-6xl font-bold gradient-text mb-2">
                  {stat.number}
                </div>
                <p className="text-muted-foreground font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-5xl mb-6 enhanced-contrast">
            <span className="tech-heading">{t('cta.title1')}</span> <span className="gradient-text">{t('cta.title2')}</span> <span className="tech-heading">{t('cta.title3')}</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 modern-text enhanced-contrast">
            {t('cta.description')}
          </p>
          <Button size="lg" className="hero-glow" asChild>
            <Link to="/devis">
              {t('cta.button')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <ServiceModal 
        isOpen={selectedService !== null}
        onClose={() => setSelectedService(null)}
        serviceKey={selectedService || ''}
      />
    </div>
  );
};

export default Home;