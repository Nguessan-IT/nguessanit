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
  const { t, language } = useLanguage();
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

  const seoContent = {
    fr: {
      title: "Nguessan-IT | Digitalisez vos idées et transformez votre entreprise",
      description: "Nguessan-IT accompagne entreprises, startups et institutions pour concevoir et déployer des solutions digitales sur mesure en Afrique, Europe et Amérique. Demandez un devis gratuit.",
      ogDescription: "Développement web, cloud, IA et branding digital. Solutions sur mesure pour entreprises."
    },
    en: {
      title: "Nguessan-IT | Digitize your ideas and unlock your business potential",
      description: "Nguessan-IT helps businesses, startups and institutions design and deploy custom digital solutions across Africa, Europe and America. Get a free quote.",
      ogDescription: "Web development, cloud, AI and digital branding. Tailored solutions for businesses."
    },
    es: {
      title: "Nguessan-IT | Digitaliza tus ideas y potencia tu empresa",
      description: "Nguessan-IT ayuda a empresas, startups e instituciones a diseñar y desplegar soluciones digitales a medida en África, Europa y América. Solicita una cotización gratuita.",
      ogDescription: "Desarrollo web, nube, IA y branding digital. Soluciones a medida para empresas."
    },
    pt: {
      title: "Nguessan-IT | Digitalize suas ideias e libere o potencial do seu negócio",
      description: "Nguessan-IT ajuda empresas, startups e instituições a projetar e implementar soluções digitais personalizadas na África, Europa e América. Solicite um orçamento gratuito.",
      ogDescription: "Desenvolvimento web, nuvem, IA e branding digital. Soluções personalizadas para empresas."
    },
    it: {
      title: "Nguessan-IT | Digitalizza le tue idee e sblocca il potenziale della tua azienda",
      description: "Nguessan-IT aiuta aziende, startup e istituzioni a progettare e implementare soluzioni digitali personalizzate in Africa, Europa e America. Richiedi un preventivo gratuito.",
      ogDescription: "Sviluppo web, cloud, IA e branding digitale. Soluzioni su misura per le aziende."
    }
  };

  const currentContent = seoContent[language as keyof typeof seoContent] || seoContent.fr;
  const baseUrl = "https://www.nguessan-it.com";
  const languagePath = language === 'fr' ? '' : `/${language}`;

  return (
    <div>
      <SEO 
        title={currentContent.title}
        description={currentContent.description}
        keywords={[
          'transformation digitale',
          'solutions digitales sur mesure',
          'développement web mobile',
          'entreprise numérique',
          'innovation IT',
          'Afrique Europe Amérique',
          'nguessan-it',
          'cloud computing',
          'conseil IT'
        ]}
        ogType="website"
        twitterCard="summary_large_image"
        image="https://www.nguessan-it.com/assets/og-home.jpg"
        url={`${baseUrl}${languagePath}/`}
        canonical={`${baseUrl}${languagePath}/`}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Nguessan-IT",
          "url": baseUrl,
          "logo": `${baseUrl}/logo.png`,
          "sameAs": [
            "https://linkedin.com/company/nguessan-it",
            "https://instagram.com/nguessanit",
            "https://www.facebook.com/share/19vPLXiLwK/?mibextid=wwXIfr"
          ],
          "founder": "Fiacre N'Guessan",
          "foundingLocation": "Abidjan, Côte d'Ivoire",
          "areaServed": ["Afrique", "Europe", "Amérique"],
          "description": currentContent.ogDescription
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
        
        <div className="relative max-w-7xl mx-auto">
          {/* Layout avec texte à gauche et logo à droite */}
          <div className="flex flex-col lg:flex-row-reverse items-center justify-between gap-8 lg:gap-12">
            
            {/* Logo à gauche */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex-shrink-0"
            >
              <img
                src="/lovable-uploads/bc7144b0-fd62-41b6-942a-989408889f91.png"
                alt="Logo officiel Nguessan-IT - Expertise en transformation numérique et innovation digitale"
                className="w-48 md:w-64 lg:w-80"
                loading="eager"
              />
            </motion.div>

            {/* Contenu texte à droite */}
            <div className="flex-1 text-center lg:text-left">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-primary font-semibold tracking-wide uppercase text-sm md:text-base mb-6"
              >
                {t('hero.subtitle')}
              </motion.p>

              {/* H1 - Titre principal */}
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-3xl sm:text-5xl lg:text-6xl mb-6 font-extrabold leading-tight enhanced-contrast"
              >
                {t('home.hero.title1')}{" "}
                <span className="gradient-text">{t('home.hero.title2')}</span>
              </motion.h1>
              
              {/* H2 - Sous-titre principal */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-lg sm:text-xl lg:text-2xl text-foreground mb-6 font-semibold leading-relaxed"
              >
                {t('home.hero.description')}
              </motion.h2>
            </div>
          </div>

          {/* Sous-texte services - centré sous les deux colonnes */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-base sm:text-lg text-muted-foreground mt-8 mb-10 italic enhanced-contrast text-center"
          >
            {t('home.hero.servicesLine')}
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
                {t('home.cta.primary')}
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
                  {t('home.hero.cta2')}
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
              {t('home.hero.international')}
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