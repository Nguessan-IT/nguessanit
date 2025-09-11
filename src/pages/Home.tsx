import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Code, Server, Shield, Headphones, Palette, FileText } from "lucide-react";
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
      title: "Identité Visuelle & Branding Digital",
      description: "Créez une identité visuelle forte et cohérente pour votre marque digitale",
      serviceKey: "branding",
      features: ["Logo & charte graphique", "Identité complète", "Déclinaisons digitales", "Guide de style"]
    },
    {
      icon: FileText,
      title: "Documents Interactifs",
      description: "Transformez vos documents statiques en expériences interactives engageantes",
      serviceKey: "interactive",
      features: ["PDF interactifs", "Catalogues digitaux", "Présentations animées", "Rapports dynamiques"]
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
          <h1 className="text-4xl sm:text-6xl lg:text-7xl mb-6 enhanced-contrast">
            <span className="gradient-text tech-title">{t('hero.title')}</span>
            <br />
            <span className="font-orbitron font-semibold text-foreground tracking-wide">{t('hero.subtitle')}</span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto modern-text enhanced-contrast">
            {t('hero.description')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="hero-glow animate-pulse-glow" asChild>
              <Link to="/services">
                {t('hero.services')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/devis">{t('hero.quote')}</Link>
            </Button>
          </div>
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