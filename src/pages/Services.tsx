import { useState, useEffect } from "react";
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
  FileText,
  Brain,
  Users,
  Linkedin,
  Instagram,
  Facebook,
  Globe as GlobeIcon,
  CheckCircle2,
  Sparkles,
  Target,
  Zap
} from "lucide-react";
import { Link } from "react-router-dom";
import { ServiceCard } from "@/components/ServiceCard";
import { CurrencyIndicator } from "@/components/CurrencyIndicator";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

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
      <section className="relative py-16 sm:py-20 lg:py-32 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-70"></div>
        <div className="code-rain"></div>
        <div className="floating-elements">
          <div className="floating-orb"></div>
          <div className="floating-orb"></div>
          <div className="floating-orb"></div>
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative max-w-5xl mx-auto px-4"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 sm:mb-8">
            <span className="gradient-text">Nos Services Digitaux</span>
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-8 sm:mb-10 px-2 max-w-3xl mx-auto">
            Des solutions technologiques sur mesure pour transformer vos idées en réalité.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-6">
            <Button size="lg" className="hero-glow animate-pulse hover:animate-none w-full sm:w-auto" asChild>
              <Link to="/contact">
                <Sparkles className="mr-2 h-5 w-5" />
                Demandez un devis gratuit
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto hover:scale-105 transition-transform duration-300" asChild>
              <Link to="/contact#form">
                <Target className="mr-2 h-5 w-5" />
                Contactez un expert
              </Link>
            </Button>
          </div>
        </motion.div>
      </section>

      {/* 8 Services Cards Section */}
      <section className="py-12 sm:py-16 lg:py-20 -mt-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              {
                icon: Code,
                title: "Développement Web & Mobile",
                description: "Créez des sites web, applications et plateformes performantes, responsives et adaptées à votre identité.",
                tech: "React, .NET, Node.js, Flutter, PWA",
                cta: "Demandez un devis pour votre application",
                link: "/contact"
              },
              {
                icon: Cloud,
                title: "Cloud & Infrastructure",
                description: "Migration, hébergement et sécurisation de vos données dans le cloud.",
                tech: "AWS, Azure, GCP, Cloud Vault Nguessan-IT",
                cta: "Planifiez votre migration cloud",
                link: "/contact"
              },
              {
                icon: Brain,
                title: "Intelligence Artificielle & Automatisation",
                description: "Optimisez vos processus grâce à l'IA : chatbots, analyse prédictive, automatisation sur mesure.",
                tech: "Machine Learning, NLP, RPA",
                cta: "Découvrez nos solutions IA",
                link: "/contact"
              },
              {
                icon: Target,
                title: "Conseil & Stratégie IT",
                description: "Audit, architecture logicielle, transformation digitale et gestion de projets.",
                tech: "Audit IT, Architecture, Digital Strategy",
                cta: "Obtenez un audit gratuit",
                link: "/contact"
              },
              {
                icon: Headphones,
                title: "Formation & Support Technique",
                description: "Formations techniques, DevOps, maintenance applicative et support 24/7.",
                tech: "DevOps, Agile, ITIL, Technical Training",
                cta: "Découvrez nos formations",
                link: "/contact"
              },
              {
                icon: Palette,
                title: "Identité Visuelle & Branding Digital",
                description: "Conception de logos, chartes graphiques, kits visuels et univers de marque cohérents pour web et réseaux sociaux.",
                tech: "Adobe Suite, Figma, Brand Guidelines",
                cta: "Créez votre identité de marque",
                link: "/contact"
              },
              {
                icon: FileText,
                title: "Documents Interactifs & Corporate",
                description: "Création de présentations, rapports, brochures et pitch decks professionnels interactifs (PDF/Docx dynamiques).",
                tech: "Interactive PDF, InDesign, PowerPoint",
                cta: "Obtenez vos supports corporate",
                link: "/contact"
              },
              {
                icon: Database,
                title: "Conception & Gestion de Bases de Données",
                description: "Modélisation, administration et sécurisation de bases de données pour applications et systèmes métiers.",
                tech: "SQL Server, PostgreSQL, Supabase, Firebase",
                cta: "Optimisez votre gestion de données",
                link: "/contact"
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <Card className="card-elegant border-border hover-glow group h-full transition-all duration-500 hover:-translate-y-2 shadow-elegant hover:shadow-glow">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="w-14 h-14 bg-gradient-primary rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                      <service.icon className="h-7 w-7 text-primary-foreground drop-shadow-sm" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4 flex-grow">{service.description}</p>
                    <div className="mb-4">
                      <p className="text-xs text-primary font-medium">Technologies :</p>
                      <p className="text-xs text-muted-foreground mt-1">{service.tech}</p>
                    </div>
                    <Button variant="outline" size="sm" asChild className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Link to={service.link}>
                        {service.cta}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
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

      {/* Notre Méthodologie - Timeline Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-card/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              <span className="gradient-text">Notre Méthodologie</span>
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Un processus éprouvé pour garantir le succès de vos projets digitaux
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-primary transform -translate-y-1/2"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 relative">
              {[
                { 
                  step: "01", 
                  title: "Analyse du besoin", 
                  description: "Compréhension approfondie de vos objectifs et contraintes",
                  icon: Target
                },
                { 
                  step: "02", 
                  title: "Conception", 
                  description: "Design et architecture technique de votre solution",
                  icon: Palette
                },
                { 
                  step: "03", 
                  title: "Développement & tests", 
                  description: "Développement agile avec tests continus",
                  icon: Code
                },
                { 
                  step: "04", 
                  title: "Mise en ligne & support", 
                  description: "Déploiement sécurisé et accompagnement permanent",
                  icon: Zap
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="text-center relative"
                >
                  <div className="relative z-10">
                    <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow group-hover:scale-110 transition-all duration-500">
                      <item.icon className="h-10 w-10 text-primary-foreground" />
                    </div>
                    <div className="bg-card rounded-xl p-6 shadow-elegant border border-border hover-glow transition-all duration-300">
                      <div className="text-primary font-bold text-4xl mb-2 opacity-50">{item.step}</div>
                      <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                      <p className="text-muted-foreground text-sm">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Nos Résultats - Stats Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              <span className="gradient-text">Nos Résultats</span>
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Des chiffres qui témoignent de notre engagement et de notre expertise
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              { value: 50, suffix: "+", label: "Projets livrés", icon: CheckCircle2 },
              { value: 98, suffix: "%", label: "Satisfaction client", icon: Users },
              { value: 3, suffix: "", label: "Continents couverts", icon: GlobeIcon },
              { value: 24, suffix: "/7", label: "Support disponible", icon: Headphones }
            ].map((stat, index) => {
              const [count, setCount] = useState(0);
              
              useEffect(() => {
                const duration = 2000;
                const steps = 60;
                const increment = stat.value / steps;
                let current = 0;
                
                const timer = setInterval(() => {
                  current += increment;
                  if (current >= stat.value) {
                    setCount(stat.value);
                    clearInterval(timer);
                  } else {
                    setCount(Math.floor(current));
                  }
                }, duration / steps);
                
                return () => clearInterval(timer);
              }, [stat.value]);

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="card-elegant border-border hover-glow text-center p-8 transition-all duration-500 hover:-translate-y-2 shadow-elegant hover:shadow-glow">
                    <stat.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                    <div className="text-4xl lg:text-5xl font-bold gradient-text mb-2">
                      {count}{stat.suffix}
                    </div>
                    <p className="text-muted-foreground font-medium">{stat.label}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-primary/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-30"></div>
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Prêt à démarrer <span className="gradient-text">votre projet</span> ?
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Discutons de vos besoins et construisons ensemble la solution digitale qui propulsera votre entreprise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-8">
              <Button size="lg" className="hero-glow w-full sm:w-auto" asChild>
                <Link to="/contact">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Demandez votre devis gratuit
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto hover:scale-105 transition-transform duration-300 border-2" asChild>
                <Link to="/portfolio">
                  Découvrez nos réalisations
                </Link>
              </Button>
            </div>
            
            {/* Social Links */}
            <div className="flex justify-center gap-4 pt-6 border-t border-border/50">
              <a href="https://linkedin.com/company/nguessan-it" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-card hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110 shadow-lg">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://instagram.com/nguessanit" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-card hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110 shadow-lg">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://facebook.com/share/19vPLXiLwK/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-card hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110 shadow-lg">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://www.nguessan-it.com" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-card hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110 shadow-lg">
                <GlobeIcon className="h-5 w-5" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;