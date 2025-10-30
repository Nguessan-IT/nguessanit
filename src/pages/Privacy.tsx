import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Lock, Database, Mail, Cookie, UserCheck, Globe, Server } from "lucide-react";
import { Link } from "react-router-dom";

const Privacy = () => {
  const sections = [
    {
      icon: Database,
      title: "Collecte des données",
      content: [
        "Formulaires (contact, devis, newsletter)",
        "Interactions avec nos services",
        "Navigation (Google Analytics, Meta Ads)",
        "Données transmises : nom, e-mail, téléphone, pays, société"
      ]
    },
    {
      icon: UserCheck,
      title: "Utilisation des données",
      content: [
        "Répondre à vos demandes et devis",
        "Améliorer nos services et votre expérience",
        "Relations commerciales et partenariales",
        "Suivi client personnalisé"
      ]
    },
    {
      icon: Cookie,
      title: "Cookies et technologies",
      content: [
        "Garantir le bon fonctionnement du site",
        "Analyser les performances",
        "Personnaliser les publicités",
        "Refus possible via votre navigateur"
      ]
    },
    {
      icon: Shield,
      title: "Vos droits (RGPD)",
      content: [
        "Accès, rectification, effacement",
        "Portabilité et opposition",
        "Contact : contact@nguessan-it.com",
        "Réponse sous 30 jours maximum"
      ]
    }
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5"></div>
        <div className="relative max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-2xl bg-primary/10 animate-pulse">
            <Lock className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Politique de confidentialité
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-4 max-w-2xl mx-auto">
            Bienvenue sur le site officiel de <strong>Nguessan-IT</strong>.
          </p>
          <p className="text-lg text-muted-foreground mb-8">
            La protection de vos données personnelles est une priorité.
          </p>
          <p className="text-sm text-muted-foreground">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto">
          <Card className="border-primary/20 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-2xl bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Introduction
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-lg max-w-none space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Cette politique explique comment nous collectons, utilisons et protégeons vos informations lorsque vous naviguez sur{" "}
                <a href="https://www.nguessan-it.com" className="text-primary hover:underline font-medium">
                  www.nguessan-it.com
                </a>.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Nguessan-IT s'engage à respecter le <strong>RGPD</strong> et la législation ivoirienne en matière de protection des données.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Main Sections */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {sections.map((section, index) => (
              <Card 
                key={index} 
                className="border-primary/20 hover:border-primary/40 hover:shadow-lg transition-all duration-300 group"
              >
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 group-hover:bg-primary/20 rounded-xl flex items-center justify-center transition-colors duration-300">
                      <section.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl font-bold">{section.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {section.content.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2.5 flex-shrink-0"></div>
                        <span className="text-muted-foreground leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Sections */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto space-y-8">
          <Card className="border-primary/20 shadow-md">
            <CardHeader className="flex flex-row items-center gap-3">
              <Lock className="h-6 w-6 text-primary" />
              <CardTitle className="text-2xl bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Sécurité et conservation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Vos données sont protégées via <strong>SSL</strong>, hébergement sécurisé et accès restreint.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <strong>Durée de conservation :</strong> Maximum 3 ans sans activité.
              </p>
            </CardContent>
          </Card>

          <Card className="border-primary/20 shadow-md">
            <CardHeader className="flex flex-row items-center gap-3">
              <Server className="h-6 w-6 text-primary" />
              <CardTitle className="text-2xl bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Partage des données
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                <strong>Nguessan-IT ne revend ni ne loue aucune donnée.</strong>
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Vos informations peuvent être partagées uniquement avec des sous-traitants techniques (hébergement, analytics) 
                dans le respect strict du RGPD.
              </p>
            </CardContent>
          </Card>

          <Card className="border-primary/20 shadow-md">
            <CardHeader className="flex flex-row items-center gap-3">
              <Globe className="h-6 w-6 text-primary" />
              <CardTitle className="text-2xl bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Mises à jour
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Cette politique peut être révisée à tout moment. La date de dernière mise à jour est affichée en haut de cette page.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <Card className="border-primary/30 shadow-xl">
            <CardHeader>
              <CardTitle className="text-3xl bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent flex items-center gap-3">
                <Mail className="h-8 w-8 text-primary" />
                Pour toute question
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Pour exercer vos droits ou toute question concernant vos données personnelles, contactez-nous :
                </p>
                
                <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-lg">
                  <Mail className="h-6 w-6 text-primary" />
                  <div>
                    <p className="font-semibold text-foreground">Email</p>
                    <a href="mailto:contact@nguessan-it.com" className="text-primary hover:underline text-lg">
                      contact@nguessan-it.com
                    </a>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button asChild className="group hover:scale-105 transition-transform duration-200">
                    <Link to="/contact">
                      Contactez-nous
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="hover:bg-primary/10">
                    <Link to="/conditions">Conditions générales</Link>
                  </Button>
                  <Button variant="outline" asChild className="hover:bg-primary/10">
                    <Link to="/mentions-legales">Mentions légales</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Privacy;