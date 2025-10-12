import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Code, 
  Server, 
  Shield, 
  Headphones, 
  Monitor, 
  Database, 
  Cloud, 
  BookOpen,
  ArrowRight,
  Palette,
  FileText
} from "lucide-react";
import { Link } from "react-router-dom";
import { ServiceCard } from "@/components/ServiceCard";
import { CurrencyIndicator } from "@/components/CurrencyIndicator";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";

const Services = () => {
  const { t } = useLanguage();
  
  const services = [
    {
      icon: Code,
      title: "Développement Web",
      serviceKey: "webDev",
      description: "Créez votre présence en ligne avec nos solutions web modernes et performantes",
      features: [
        "Sites web responsive et modernes",
        "Applications web sur mesure",
        "Solutions e-commerce complètes",
        "Intégration CMS (WordPress, Drupal)",
        "Technologies React, Vue.js, Angular",
        "Optimisation SEO incluse"
      ],
      technologies: ["React", "Vue.js", "WordPress", "Shopify", "Node.js"],
      color: "from-blue-500 to-purple-600"
    },
    {
      icon: Server,
      title: "Maintenance Informatique",
      serviceKey: "maintenance",
      description: "Gardez vos systèmes opérationnels avec notre service de maintenance proactive",
      features: [
        "Support technique 24/7",
        "Maintenance préventive programmée",
        "Dépannage urgent sur site",
        "Monitoring système en temps réel",
        "Mise à jour sécuritaire",
        "Optimisation des performances"
      ],
      technologies: ["Windows", "Linux", "MacOS", "VMware", "Docker"],
      color: "from-green-500 to-teal-600"
    },
    {
      icon: Shield,
      title: "Solutions Cloud",
      serviceKey: "cloud",
      description: "Migrez vers le cloud en toute sécurité et optimisez votre infrastructure",
      features: [
        "Migration vers AWS, Azure, GCP",
        "Architecture cloud native",
        "Sauvegardes automatisées",
        "Sécurité et conformité",
        "Monitoring et alertes",
        "Optimisation des coûts"
      ],
      technologies: ["AWS", "Azure", "Google Cloud", "Kubernetes", "Terraform"],
      color: "from-orange-500 to-red-600"
    },
    {
      icon: Headphones,
      title: "Formation & Conseil",
      serviceKey: "training",
      description: "Accompagnement personnalisé pour votre transformation digitale",
      features: [
        "Formation équipes techniques",
        "Audit infrastructure IT",
        "Stratégie de transformation",
        "Accompagnement projet",
        "Consulting sécurité",
        "Optimisation processus"
      ],
      technologies: ["DevOps", "Agile", "ITIL", "ISO 27001", "GDPR"],
      color: "from-purple-500 to-pink-600"
    },
    {
      icon: Palette,
      title: "Identité Visuelle & Branding Digital",
      serviceKey: "branding",
      description: "Créez une identité visuelle forte et cohérente pour votre marque digitale",
      features: [
        "Création de logo et charte graphique",
        "Identité visuelle complète",
        "Déclinaisons digitales (web, mobile)",
        "Guide de style et brand book",
        "Supports de communication",
        "Stratégie de marque digitale"
      ],
      technologies: ["Adobe Creative Suite", "Figma", "Sketch", "Canva Pro", "Brand Guidelines"],
      color: "from-pink-500 to-rose-600"
    },
    {
      icon: FileText,
      title: "Documents Interactifs",
      serviceKey: "interactive",
      description: "Transformez vos documents statiques en expériences interactives engageantes",
      features: [
        "PDF interactifs et formulaires",
        "Catalogues digitaux animés",
        "Présentations interactives",
        "Rapports dynamiques avec données",
        "Documentation technique interactive",
        "E-books et guides interactifs"
      ],
      technologies: ["Adobe InDesign", "Flipbook", "H5P", "JavaScript", "CSS Animations"],
      color: "from-indigo-500 to-cyan-600"
    }
  ];

  const additionalServices = [
    {
      icon: Monitor,
      title: t('services.additional.audit'),
      description: t('services.additional.audit.desc')
    },
    {
      icon: Database,
      title: t('services.additional.database'),
      description: t('services.additional.database.desc')
    },
    {
      icon: Cloud,
      title: t('services.additional.devops'),
      description: t('services.additional.devops.desc')
    },
    {
      icon: BookOpen,
      title: t('services.additional.documentation'),
      description: t('services.additional.documentation.desc')
    }
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <SEO 
        title="Services Informatiques Professionnels"
        description="Découvrez nos services IT complets : développement web React/Vue.js, maintenance informatique 24/7, solutions cloud AWS/Azure, formation professionnelle, identité visuelle digitale. Expert Abidjan, Côte d'Ivoire."
        keywords={[
          'services informatiques abidjan',
          'développement web react vue.js',
          'maintenance informatique professionnel', 
          'solutions cloud aws azure',
          'formation informatique entreprise',
          'identité visuelle digitale',
          'documents interactifs',
          'consultant IT côte d\'ivoire',
          'expert informatique abidjan',
          'services IT premium'
        ]}
        type="service"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "Services Informatiques Nguessan-IT",
          "description": "Services informatiques professionnels en Côte d'Ivoire",
          "itemListElement": [
            {
              "@type": "Service",
              "position": 1,
              "name": "Développement Web",
              "description": "Sites web modernes et applications sur mesure",
              "provider": {
                "@type": "Organization", 
                "name": "Nguessan-IT"
              },
              "offers": {
                "@type": "Offer",
                "priceRange": "À partir de 800€",
                "priceCurrency": "EUR"
              }
            },
            {
              "@type": "Service",
              "position": 2, 
              "name": "Maintenance Informatique",
              "description": "Support technique 24/7 et maintenance préventive",
              "provider": {
                "@type": "Organization",
                "name": "Nguessan-IT"
              },
              "offers": {
                "@type": "Offer",
                "priceRange": "À partir de 50€/h",
                "priceCurrency": "EUR"
              }
            },
            {
              "@type": "Service", 
              "position": 3,
              "name": "Solutions Cloud",
              "description": "Migration et infrastructure cloud sécurisée",
              "provider": {
                "@type": "Organization",
                "name": "Nguessan-IT"
              }
            },
            {
              "@type": "Service",
              "position": 4,
              "name": "Formation & Conseil", 
              "description": "Formation professionnelle et conseil en transformation digitale",
              "provider": {
                "@type": "Organization",
                "name": "Nguessan-IT"
              }
            }
          ]
        }}
      />
      
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 lg:py-32 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-70"></div>
        <div className="code-rain"></div>
        <div className="floating-elements">
          <div className="floating-orb"></div>
          <div className="floating-orb"></div>
          <div className="floating-orb"></div>
        </div>
        <div className="relative max-w-4xl mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6">
            <span className="gradient-text">{t('services.pageTitle')}</span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-4 sm:mb-6 px-2">
            {t('services.pageDescription')}
          </p>
          <div className="flex justify-center">
            <CurrencyIndicator />
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-2 sm:px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-8 sm:py-12 lg:py-16 bg-card/30">
        <div className="max-w-7xl mx-auto px-2 sm:px-4">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
              <span className="gradient-text">{t('services.complementary.title')}</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground px-4">
              {t('services.complementary.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {additionalServices.map((service, index) => (
              <Card key={index} className="card-elegant border-border hover-glow transition-all duration-500 text-center group">
                <CardContent className="p-3 sm:p-4 lg:p-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3 lg:mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-lg">
                    <service.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary-foreground drop-shadow-sm" />
                  </div>
                  <h3 className="font-semibold text-sm sm:text-base mb-1 sm:mb-2">{service.title}</h3>
                  <p className="text-muted-foreground text-xs sm:text-sm">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-2 sm:px-4">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
              <span className="gradient-text">{t('services.process.title')}</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground px-4">
              {t('services.process.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {[
              { step: "01", title: t('services.process.step1'), description: t('services.process.step1.desc') },
              { step: "02", title: t('services.process.step2'), description: t('services.process.step2.desc') },
              { step: "03", title: t('services.process.step3'), description: t('services.process.step3.desc') },
              { step: "04", title: t('services.process.step4'), description: t('services.process.step4.desc') }
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 text-primary-foreground font-bold text-base sm:text-lg lg:text-xl group-hover:scale-110 group-hover:shadow-glow transition-all duration-500">
                  {item.step}
                </div>
                <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-1 sm:mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-xs sm:text-sm px-2">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 sm:py-12 lg:py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
            {t('services.cta.title')} <span className="gradient-text">{t('services.cta.highlight')}</span> ?
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8">
            {t('services.cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Button size="lg" className="hero-glow w-full sm:w-auto" asChild>
              <Link to="/devis">
                {t('services.cta.getQuote')}
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto" asChild>
              <Link to="/about">{t('services.cta.learnMore')}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;