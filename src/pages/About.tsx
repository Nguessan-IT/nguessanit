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
  ArrowRight,
  Lightbulb,
  Heart,
  MapPin,
  Linkedin,
  Globe as GlobeIcon,
  CheckCircle2
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
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
      icon: Lightbulb,
      title: "Innovation pragmatique",
      description: "Nous transformons les technologies émergentes en solutions concrètes et mesurables pour votre entreprise."
    },
    {
      icon: Target,
      title: "Excellence technique",
      description: "Notre équipe allie expertise pointue et méthodologie rigoureuse pour garantir la qualité de chaque projet."
    },
    {
      icon: Shield,
      title: "Fiabilité & transparence",
      description: "Communication claire, délais respectés et engagement total envers la réussite de vos projets."
    },
    {
      icon: Heart,
      title: "Impact social",
      description: "Nous contribuons à la transformation digitale en Afrique et accompagnons la croissance des entrepreneurs locaux."
    }
  ];

  const teamLocations = [
    { city: "Abidjan", country: "Côte d'Ivoire", icon: MapPin },
    { city: "Paris", country: "France", icon: MapPin },
    { city: "Montréal", country: "Canada", icon: MapPin },
    { city: "Lisbonne", country: "Portugal", icon: MapPin }
  ];

  const counters = [
    { target: 50, label: "Projets livrés", suffix: "+" },
    { target: 3, label: "Continents couverts", suffix: "" },
    { target: 98, label: "Satisfaction client", suffix: "%" },
    { target: 24, label: "Support disponible", suffix: "/7" }
  ];

  const [counts, setCounts] = useState(counters.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            counters.forEach((counter, index) => {
              let current = 0;
              const increment = counter.target / 50;
              const timer = setInterval(() => {
                current += increment;
                if (current >= counter.target) {
                  setCounts((prev) => {
                    const newCounts = [...prev];
                    newCounts[index] = counter.target;
                    return newCounts;
                  });
                  clearInterval(timer);
                } else {
                  setCounts((prev) => {
                    const newCounts = [...prev];
                    newCounts[index] = Math.floor(current);
                    return newCounts;
                  });
                }
              }, 30);
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    const statsSection = document.getElementById("stats-counter");
    if (statsSection) {
      observer.observe(statsSection);
    }

    return () => {
      if (statsSection) {
        observer.unobserve(statsSection);
      }
    };
  }, [hasAnimated]);

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
        title="À propos de Nguessan-IT | Votre partenaire digital international"
        description="Découvrez l'équipe, la mission et les valeurs de Nguessan-IT — expertise en transformation digitale pour entreprises en Afrique, Europe et Amérique."
        keywords={[
          'à propos nguessan-it',
          'équipe nguessan-it',
          'mission nguessan-it',
          'partenaire digital international',
          'expertise transformation digitale',
          'valeurs entreprise IT',
          'innovation technologique',
          'accompagnement entreprises'
        ]}
        type="article"
        canonical="https://www.nguessan-it.com/about"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "mainEntity": {
            "@type": "Organization",
            "name": "Nguessan-IT",
            "description": "Votre partenaire digital international pour la transformation digitale",
            "foundingDate": "2016",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "CI",
              "addressLocality": "Abidjan"
            },
            "areaServed": ["Africa", "Europe", "America"],
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Services IT",
              "itemListElement": [
                "Développement Web & Mobile",
                "Solutions Cloud",
                "Intelligence Artificielle",
                "Conseil IT",
                "Intégration sur mesure"
              ]
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
          <h1 className="text-4xl sm:text-6xl font-bold mb-6 animate-fade-in">
            <span className="gradient-text">À propos de Nguessan-IT</span>
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Votre partenaire digital international pour transformer vos ambitions en solutions technologiques concrètes.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-card/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              <span className="gradient-text">Notre Mission</span>
            </h2>
            <div className="max-w-4xl mx-auto space-y-6">
              <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed">
                Dans un monde où <strong className="text-foreground">80% des entreprises accélèrent leur transformation digitale</strong> post-COVID, nous positionnons vos organisations à l'avant-garde de cette révolution technologique.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Notre mission : <strong className="text-foreground">transformer la complexité technologique en avantage concurrentiel</strong>. Nous accompagnons les entreprises, startups et institutions dans la maîtrise des enjeux critiques de l'ère numérique : <span className="text-primary">scalabilité cloud</span>, <span className="text-primary">sécurité des données</span>, <span className="text-primary">expérience utilisateur optimale</span> et <span className="text-primary">intégration IA</span>.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <Card className="card-elegant border-border text-center p-6 hover:shadow-glow transition-all duration-300">
                  <CheckCircle2 className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h3 className="font-bold text-lg mb-2">ROI mesurable</h3>
                  <p className="text-sm text-muted-foreground">Solutions conçues pour générer un retour sur investissement quantifiable</p>
                </Card>
                <Card className="card-elegant border-border text-center p-6 hover:shadow-glow transition-all duration-300">
                  <CheckCircle2 className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h3 className="font-bold text-lg mb-2">Innovation pragmatique</h3>
                  <p className="text-sm text-muted-foreground">Technologies de pointe adaptées à vos réalités opérationnelles</p>
                </Card>
                <Card className="card-elegant border-border text-center p-6 hover:shadow-glow transition-all duration-300">
                  <CheckCircle2 className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h3 className="font-bold text-lg mb-2">Agilité stratégique</h3>
                  <p className="text-sm text-muted-foreground">Infrastructures évolutives pour accompagner votre croissance</p>
                </Card>
              </div>
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
            <div className="max-w-4xl mx-auto space-y-4">
              <p className="text-xl text-muted-foreground">
                Des compétences techniques de niveau entreprise pour relever vos défis les plus critiques
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                Face à l'accélération technologique (<strong className="text-foreground">cycle de vie moyen d'une stack technique : 3 ans</strong>), nous maintenons une expertise constamment actualisée sur les frameworks modernes, les architectures cloud-native et les standards de cybersécurité. Notre approche combine <span className="text-primary">méthodologies agiles</span>, <span className="text-primary">DevOps/CI-CD</span> et <span className="text-primary">architecture microservices</span> pour des solutions robustes et évolutives.
              </p>
            </div>
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
      <section className="py-16 bg-card/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="gradient-text">Nos Valeurs</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Les principes qui guident chaque projet et interaction
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card 
                key={index} 
                className="card-elegant border-border hover:shadow-glow hover:-translate-y-2 transition-all duration-500 group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
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

      {/* Team & Leadership Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="gradient-text">Équipe & Leadership</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Une expertise internationale au service de votre transformation digitale
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            <Card className="card-elegant border-border hover:shadow-glow transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center shrink-0">
                    <Users className="h-10 w-10 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Fiacre N'Guessan</h3>
                    <p className="text-primary font-semibold mb-4">Fondateur & CTO</p>
                    <p className="text-muted-foreground leading-relaxed">
                      Fort de plus de 8 ans d'expérience dans le développement web et les infrastructures cloud, 
                      Fiacre pilote la vision technologique de Nguessan-IT et accompagne personnellement chaque client 
                      dans sa transformation digitale.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-elegant border-border hover:shadow-glow transition-all duration-300">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-6">Notre équipe internationale</h3>
                <div className="space-y-4">
                  {teamLocations.map((location, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-card/50 hover:bg-card transition-colors">
                      <MapPin className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-semibold">{location.city}</p>
                        <p className="text-sm text-muted-foreground">{location.country}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section id="stats-counter" className="py-16 bg-card/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="gradient-text">En Chiffres</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Notre impact mesuré en résultats concrets
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {counters.map((counter, index) => (
              <Card key={index} className="card-elegant border-border text-center hover:shadow-glow transition-all duration-300">
                <CardContent className="p-8">
                  <div className="text-5xl font-bold gradient-text mb-2">
                    {counts[index]}{counter.suffix}
                  </div>
                  <p className="text-muted-foreground font-medium">{counter.label}</p>
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
            Prêt à transformer votre entreprise ?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Discutons de vos projets et explorons ensemble les meilleures solutions pour atteindre vos objectifs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" className="hero-glow animate-pulse" asChild>
              <Link to="/contact">
                Discutons-en maintenant
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="hover:bg-primary hover:text-primary-foreground transition-all duration-300" 
              asChild
            >
              <Link to="/services">Découvrez nos solutions</Link>
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-6 pt-8 border-t border-border">
            <a
              href="https://linkedin.com/company/nguessan-it"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
            >
              <Linkedin className="h-5 w-5 group-hover:scale-110 transition-transform" />
              <span className="font-medium">LinkedIn</span>
            </a>
            <span className="text-muted-foreground">•</span>
            <a
              href="https://www.nguessan-it.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
            >
              <GlobeIcon className="h-5 w-5 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Site officiel</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;