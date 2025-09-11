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

const About = () => {
  const expertise = [
    { name: "Développement Web", percentage: 95 },
    { name: "Administration Système", percentage: 90 },
    { name: "Sécurité Informatique", percentage: 85 },
    { name: "Solutions Cloud", percentage: 88 },
    { name: "Support Technique", percentage: 92 },
    { name: "Formation IT", percentage: 80 }
  ];

  const stats = [
    { number: "1+", label: "Années expérience", icon: Award },
    { number: "10+", label: "Clients satisfaits", icon: Users },
    { number: "20+", label: "Projets réalisés", icon: TrendingUp },
    { number: "24/7", label: "Support technique", icon: HeadphonesIcon }
  ];

  const values = [
    {
      icon: Target,
      title: "Excellence",
      description: "Nous visons l'excellence dans chaque projet, en délivrant des solutions de qualité supérieure qui dépassent vos attentes."
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Nous travaillons en étroite collaboration avec nos clients pour comprendre leurs besoins et co-créer les meilleures solutions."
    },
    {
      icon: Shield,
      title: "Sécurité",
      description: "La sécurité est au cœur de nos préoccupations. Nous mettons en place les meilleures pratiques pour protéger vos données."
    },
    {
      icon: TrendingUp,
      title: "Innovation",
      description: "Nous restons à la pointe des technologies pour vous proposer des solutions innovantes et performantes."
    }
  ];

  const team = [
    {
      icon: Code,
      role: "Développement",
      description: "Équipe de développeurs experts en technologies modernes"
    },
    {
      icon: Server,
      role: "Infrastructure",
      description: "Spécialistes en administration système et réseau"
    },
    {
      icon: Cloud,
      role: "Cloud",
      description: "Experts certifiés AWS, Azure et Google Cloud"
    },
    {
      icon: BookOpen,
      role: "Formation",
      description: "Formateurs expérimentés en informatique"
    }
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <SEO 
        title="À Propos - Expertise Informatique depuis 8 ans"
        description="Découvrez Nguessan-IT, votre expert informatique à Abidjan. +8 ans d'expérience, 10+ clients satisfaits, solutions sur mesure. Développement web, maintenance IT, cloud, formation professionnelle en Côte d'Ivoire."
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
            <span className="gradient-text">À propos de nous</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Nguessan-IT accompagne les entreprises dans leur transformation digitale. 
            Découvrez notre expertise et notre engagement envers l'excellence.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                <span className="gradient-text">Notre Mission</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Nous proposons des solutions informatiques sur mesure pour optimiser la productivité et la sécurité de votre entreprise. 
                Notre expertise couvre le développement web, la maintenance informatique, les solutions cloud et la formation.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                Avec une approche personnalisée et un support technique réactif, nous nous engageons à être votre partenaire de confiance 
                dans tous vos projets informatiques.
              </p>
              <Button size="lg" asChild>
                <Link to="/contact">
                  Travaillons ensemble
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
              <span className="gradient-text">Nos Domaines d'Expertise</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Des compétences techniques éprouvées dans tous les domaines de l'informatique
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
              <span className="gradient-text">Nos Valeurs</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Les principes qui guident notre approche et nos relations clients
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
              <span className="gradient-text">Notre Approche</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Une méthodologie éprouvée pour garantir le succès de vos projets
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                step: "01", 
                title: "Écoute & Analyse", 
                description: "Nous analysons en profondeur vos besoins et contraintes pour proposer la solution la plus adaptée." 
              },
              { 
                step: "02", 
                title: "Conception", 
                description: "Élaboration d'une solution technique détaillée avec architecture et planning précis." 
              },
              { 
                step: "03", 
                title: "Réalisation", 
                description: "Développement et mise en œuvre avec suivi régulier et communication transparente." 
              },
              { 
                step: "04", 
                title: "Accompagnement", 
                description: "Formation, support continu et évolutions pour garantir votre succès à long terme." 
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
            Découvrez comment nous pouvons <span className="gradient-text">vous accompagner</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Forte de notre expérience et de notre expertise, notre équipe est prête à relever tous vos défis informatiques. 
            Contactez-nous pour échanger sur vos projets.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="hero-glow" asChild>
              <Link to="/devis">
                Parlez-nous de votre projet
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/services">Découvrir nos services</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;