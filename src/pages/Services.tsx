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

const Services = () => {
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
      title: "Audit Sécurité",
      description: "Évaluation complète de votre infrastructure"
    },
    {
      icon: Database,
      title: "Gestion BDD",
      description: "Administration et optimisation bases de données"
    },
    {
      icon: Cloud,
      title: "DevOps",
      description: "Automatisation et intégration continue"
    },
    {
      icon: BookOpen,
      title: "Documentation",
      description: "Création documentation technique complète"
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
      <section className="relative py-20 lg:py-32 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-70"></div>
        <div className="code-rain"></div>
        <div className="floating-elements">
          <div className="floating-orb"></div>
          <div className="floating-orb"></div>
          <div className="floating-orb"></div>
        </div>
        <div className="relative max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl font-bold mb-6">
            <span className="gradient-text">Nos Services</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            Des solutions informatiques complètes adaptées à vos besoins professionnels. 
            Découvrez comment nous pouvons transformer votre infrastructure IT.
          </p>
          <div className="flex justify-center">
            <CurrencyIndicator />
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-16 bg-card/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="gradient-text">Services Complémentaires</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Des prestations spécialisées pour répondre à tous vos besoins
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalServices.map((service, index) => (
              <Card key={index} className="card-elegant border-border hover-glow transition-all duration-500 text-center group">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-lg">
                    <service.icon className="h-6 w-6 text-primary-foreground drop-shadow-sm" />
                  </div>
                  <h3 className="font-semibold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground text-sm">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="gradient-text">Notre Processus</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Une approche structurée pour garantir le succès de vos projets
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Analyse", description: "Étude de vos besoins et contraintes" },
              { step: "02", title: "Conception", description: "Élaboration de la solution optimale" },
              { step: "03", title: "Développement", description: "Mise en œuvre avec méthodologie agile" },
              { step: "04", title: "Support", description: "Accompagnement et maintenance continue" }
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 text-primary-foreground font-bold text-xl group-hover:scale-110 group-hover:shadow-glow transition-all duration-500">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Prêt à transformer votre <span className="gradient-text">infrastructure IT</span> ?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Contactez-nous dès aujourd'hui pour discuter de votre projet et obtenir un devis personnalisé
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="hero-glow" asChild>
              <Link to="/devis">
                Demander un devis gratuit
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/about">En savoir plus sur nous</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;