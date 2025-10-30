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
      title: t('services.main.webDev.title'),
      serviceKey: "webDev",
      tagline: "Créez votre présence digitale avec impact",
      description: "Nous concevons des sites web et applications mobiles performants, esthétiques et adaptés à vos objectifs business. De la landing page au portail e-commerce complexe, nous transformons vos besoins en expériences utilisateur exceptionnelles.",
      benefits: [
        "Augmentez votre visibilité en ligne et générez plus de prospects",
        "Optimisez l'expérience utilisateur pour convertir vos visiteurs en clients",
        "Bénéficiez d'une plateforme évolutive qui grandit avec votre entreprise"
      ],
      features: [
        t('services.main.webDev.feature1'),
        t('services.main.webDev.feature2'),
        t('services.main.webDev.feature3'),
        t('services.main.webDev.feature4'),
        t('services.main.webDev.feature5'),
        t('services.main.webDev.feature6')
      ],
      technologies: ["React", "Vue.js", "WordPress", "Shopify", "Node.js"],
      color: "from-blue-500 to-purple-600"
    },
    {
      icon: Server,
      title: t('services.main.maintenance.title'),
      serviceKey: "maintenance",
      tagline: "Garantissez la performance et la stabilité de vos systèmes",
      description: "Assurez la continuité et l'efficacité de vos opérations IT avec nos services de maintenance proactive. Nous surveillons, optimisons et sécurisons vos infrastructures pour que vous puissiez vous concentrer sur votre cœur de métier.",
      benefits: [
        "Réduisez les temps d'arrêt et maximisez la disponibilité de vos services",
        "Prévenez les problèmes avant qu'ils n'impactent votre activité",
        "Économisez sur les coûts de réparation grâce à une maintenance préventive"
      ],
      features: [
        t('services.main.maintenance.feature1'),
        t('services.main.maintenance.feature2'),
        t('services.main.maintenance.feature3'),
        t('services.main.maintenance.feature4'),
        t('services.main.maintenance.feature5'),
        t('services.main.maintenance.feature6')
      ],
      technologies: ["Windows", "Linux", "MacOS", "VMware", "Docker"],
      color: "from-green-500 to-teal-600"
    },
    {
      icon: Shield,
      title: t('services.main.cloud.title'),
      serviceKey: "cloud",
      tagline: "Accélérez votre transformation digitale avec le cloud",
      description: "Migrez vers le cloud en toute sécurité et optimisez vos infrastructures pour gagner en agilité, réduire vos coûts et améliorer vos performances. Nos experts vous accompagnent de la stratégie à l'implémentation avec des solutions IA innovantes.",
      benefits: [
        "Réduisez vos coûts IT jusqu'à 40% grâce à une infrastructure optimisée",
        "Gagnez en flexibilité et scalabilité pour accompagner votre croissance",
        "Renforcez votre sécurité avec des solutions cloud de niveau entreprise"
      ],
      features: [
        t('services.main.cloud.feature1'),
        t('services.main.cloud.feature2'),
        t('services.main.cloud.feature3'),
        t('services.main.cloud.feature4'),
        t('services.main.cloud.feature5'),
        t('services.main.cloud.feature6')
      ],
      technologies: ["AWS", "Azure", "Google Cloud", "Kubernetes", "Terraform"],
      color: "from-orange-500 to-red-600"
    },
    {
      icon: Headphones,
      title: t('services.main.training.title'),
      serviceKey: "training",
      tagline: "Montez en compétences et libérez le potentiel de vos équipes",
      description: "Formez vos collaborateurs aux dernières technologies et méthodologies IT avec des programmes sur mesure adaptés à votre secteur. De DevOps à l'IA, nous proposons des formations pratiques qui transforment réellement vos équipes.",
      benefits: [
        "Augmentez la productivité de vos équipes grâce à des compétences actualisées",
        "Réduisez votre dépendance aux prestataires externes",
        "Attirez et retenez les meilleurs talents grâce à un plan de développement solide"
      ],
      features: [
        t('services.main.training.feature1'),
        t('services.main.training.feature2'),
        t('services.main.training.feature3'),
        t('services.main.training.feature4'),
        t('services.main.training.feature5'),
        t('services.main.training.feature6')
      ],
      technologies: ["DevOps", "Agile", "ITIL", "ISO 27001", "GDPR"],
      color: "from-purple-500 to-pink-600"
    },
    {
      icon: Palette,
      title: t('services.main.branding.title'),
      serviceKey: "branding",
      tagline: "Construisez une identité de marque mémorable et cohérente",
      description: "Créez une identité visuelle forte qui reflète les valeurs de votre entreprise et vous démarque de la concurrence. Du logo aux guidelines complètes, nous donnons vie à votre marque sur tous les supports digitaux et print.",
      benefits: [
        "Renforcez votre reconnaissance de marque auprès de vos clients",
        "Créez une cohérence visuelle sur tous vos points de contact",
        "Différenciez-vous de vos concurrents avec une identité unique"
      ],
      features: [
        t('services.main.branding.feature1'),
        t('services.main.branding.feature2'),
        t('services.main.branding.feature3'),
        t('services.main.branding.feature4'),
        t('services.main.branding.feature5'),
        t('services.main.branding.feature6')
      ],
      technologies: ["Adobe Creative Suite", "Figma", "Sketch", "Canva Pro", "Brand Guidelines"],
      color: "from-pink-500 to-rose-600"
    },
    {
      icon: FileText,
      title: t('services.main.interactive.title'),
      serviceKey: "interactive",
      tagline: "Captivez votre audience avec des contenus interactifs",
      description: "Transformez vos documents statiques en expériences immersives et engageantes. Catalogues, rapports annuels, présentations commerciales : nous créons des supports qui marquent les esprits et augmentent l'engagement de vos lecteurs.",
      benefits: [
        "Augmentez l'engagement de vos lecteurs jusqu'à 300%",
        "Mesurez précisément l'impact de vos contenus grâce à l'analytics intégré",
        "Réduisez vos coûts d'impression tout en modernisant votre image"
      ],
      features: [
        t('services.main.interactive.feature1'),
        t('services.main.interactive.feature2'),
        t('services.main.interactive.feature3'),
        t('services.main.interactive.feature4'),
        t('services.main.interactive.feature5'),
        t('services.main.interactive.feature6')
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
        title="Services Nguessan-IT | Développement web, Cloud & Solutions digitales"
        description="Nos services : développement web & mobile, solutions cloud, IA, conseil IT et intégration sur mesure. Bénéficiez d'accompagnement stratégique et technique."
        keywords={[
          'services informatiques',
          'développement web mobile',
          'solutions cloud',
          'intelligence artificielle',
          'conseil IT',
          'intégration sur mesure',
          'accompagnement stratégique',
          'expertise technique',
          'transformation digitale'
        ]}
        canonical="https://www.nguessan-it.com/services"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": "IT Services",
          "provider": {
            "@type": "Organization",
            "name": "Nguessan-IT",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "CI",
              "addressLocality": "Abidjan"
            },
            "areaServed": ["Africa", "Europe", "America"]
          },
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Services Nguessan-IT",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Développement Web & Mobile",
                  "description": "Sites web modernes, applications mobiles et solutions e-commerce sur mesure"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Solutions Cloud & Infrastructure",
                  "description": "Migration cloud, hébergement sécurisé et optimisation d'infrastructure IT"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Intelligence Artificielle & Automatisation",
                  "description": "Solutions IA intelligentes pour automatiser et optimiser vos processus"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Conseil & Stratégie IT",
                  "description": "Audit, digitalisation et optimisation de votre stratégie technologique"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Formation & Support",
                  "description": "Accompagnement technique et montée en compétences de vos équipes"
                }
              }
            ]
          }
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

      {/* Summary Cards Section */}
      <section className="py-8 sm:py-12 lg:py-16 -mt-16 relative z-10">
        <div className="max-w-7xl mx-auto px-2 sm:px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                icon: Code,
                title: "Développement Web & Mobile",
                description: "Sites web modernes, applications mobiles et solutions e-commerce sur mesure",
                link: "/services#webdev"
              },
              {
                icon: Cloud,
                title: "Solutions Cloud & IA",
                description: "Migration cloud, hébergement sécurisé et solutions d'intelligence artificielle",
                link: "/services#cloud"
              },
              {
                icon: Headphones,
                title: "Conseil & Support IT",
                description: "Audit, formation et accompagnement technique de vos équipes",
                link: "/services#support"
              }
            ].map((item, index) => (
              <Card key={index} className="card-elegant border-border hover-glow group hover:-translate-y-2 transition-all duration-500 shadow-elegant hover:shadow-glow">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-primary rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                    <item.icon className="h-8 w-8 text-primary-foreground drop-shadow-sm" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{item.description}</p>
                  <Button variant="outline" size="sm" asChild className="w-full">
                    <a href={item.link}>
                      En savoir plus
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
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