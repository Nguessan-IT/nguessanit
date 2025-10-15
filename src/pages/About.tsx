import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Target, 
  Users, 
  Award, 
  TrendingUp,
  Code,
  Server,
  Shield,
  Cloud,
  HeadphonesIcon,
  BookOpen,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { t } = useLanguage();
  
  const expertise = [
    { name: t('about.expertise.webDev'), percentage: 95 },
    { name: t('about.expertise.sysAdmin'), percentage: 90 },
    { name: t('about.expertise.security'), percentage: 85 },
    { name: t('about.expertise.cloud'), percentage: 88 },
    { name: t('about.expertise.support'), percentage: 92 },
    { name: t('about.expertise.training'), percentage: 80 }
  ];

  const stats = [
    { number: "1+", label: t('about.stats.experience'), icon: Award },
    { number: "10+", label: t('about.stats.clients'), icon: Users },
    { number: "20+", label: t('about.stats.projects'), icon: TrendingUp },
    { number: "24/7", label: t('about.stats.support'), icon: HeadphonesIcon }
  ];

  const values = [
    {
      icon: Target,
      title: t('about.values.excellence.title'),
      description: t('about.values.excellence.description')
    },
    {
      icon: Users,
      title: t('about.values.collaboration.title'),
      description: t('about.values.collaboration.description')
    },
    {
      icon: Shield,
      title: t('about.values.security.title'),
      description: t('about.values.security.description')
    },
    {
      icon: TrendingUp,
      title: t('about.values.innovation.title'),
      description: t('about.values.innovation.description')
    }
  ];

  const team = [
    {
      icon: Code,
      role: t('about.team.development.role'),
      description: t('about.team.development.description')
    },
    {
      icon: Server,
      role: t('about.team.infrastructure.role'),
      description: t('about.team.infrastructure.description')
    },
    {
      icon: Cloud,
      role: t('about.team.cloud.role'),
      description: t('about.team.cloud.description')
    },
    {
      icon: BookOpen,
      role: t('about.team.training.role'),
      description: t('about.team.training.description')
    }
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <SEO 
        title={t('about.seo.title')}
        description={t('about.seo.description')}
        keywords={[
          'à propos nguessan-it',
          'expert informatique abidjan expérience',
          'entreprise informatique côte d\'ivoire',
          'consultant IT professionnel',
          'équipe développement web',
          'spécialiste maintenance informatique',
          'solutions digitales sur mesure',
          'transformation digitale entreprise'
        ]}
        type="article"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "mainEntity": {
            "@type": "Organization",
            "name": "Nguessan-IT",
            "description": "Expert en solutions informatiques à Abidjan, Côte d'Ivoire depuis 8 ans",
            "foundingDate": "2016",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "CI",
              "addressLocality": "Abidjan"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Services IT",
              "itemListElement": [
                "Développement Web",
                "Maintenance Informatique", 
                "Solutions Cloud",
                "Formation & Conseil"
              ]
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "10"
            }
          }
        }}
      />
      
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-60"></div>
        <div className="floating-elements">
          <div className="floating-orb"></div>
          <div className="floating-orb"></div>
          <div className="floating-orb"></div>
        </div>
        <div className="relative max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl font-bold mb-6">
            <span className="gradient-text">{t('about.hero.title')}</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            {t('about.hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                <span className="gradient-text">{t('about.mission.title')}</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                {t('about.mission.description1')}
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                {t('about.mission.description2')}
              </p>
              <Button size="lg" asChild>
                <Link to="/contact">
                  {t('about.mission.cta')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="card-elegant border-border text-center">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                      <stat.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div className="text-3xl font-bold gradient-text mb-2">{stat.number}</div>
                    <p className="text-muted-foreground font-medium">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-16 bg-card/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="gradient-text">{t('about.expertiseSection.title')}</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              {t('about.expertiseSection.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {expertise.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-muted-foreground">{skill.percentage}%</span>
                  </div>
                  <Progress value={skill.percentage} className="h-3" />
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              {team.map((member, index) => (
                <Card key={index} className="card-elegant border-border text-center hover:shadow-glow transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <member.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <h3 className="font-semibold mb-2">{member.role}</h3>
                    <p className="text-muted-foreground text-sm">{member.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="gradient-text">{t('about.valuesSection.title')}</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              {t('about.valuesSection.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="card-elegant border-border hover:shadow-glow transition-all duration-500 group">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <value.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-card/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="gradient-text">{t('about.approachSection.title')}</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              {t('about.approachSection.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                step: "01", 
                title: t('about.approach.step1.title'),
                description: t('about.approach.step1.description')
              },
              { 
                step: "02", 
                title: t('about.approach.step2.title'),
                description: t('about.approach.step2.description')
              },
              { 
                step: "03", 
                title: t('about.approach.step3.title'),
                description: t('about.approach.step3.description')
              },
              { 
                step: "04", 
                title: t('about.approach.step4.title'),
                description: t('about.approach.step4.description')
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 text-primary-foreground font-bold text-xl">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
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
            {t('about.cta.title')} <span className="gradient-text">{t('about.cta.titleHighlight')}</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            {t('about.cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="hero-glow" asChild>
              <Link to="/devis">
                {t('about.cta.primaryButton')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/services">{t('about.cta.secondaryButton')}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;