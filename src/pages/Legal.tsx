import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, Server, Copyright, Globe, Mail, Scale } from "lucide-react";
import { Link } from "react-router-dom";

const Legal = () => {
  const sections = [
    {
      icon: Building2,
      title: "Éditeur du site",
      content: [
        "Nguessan-IT, Société par Actions Simplifiée Unipersonnelle (SASU)",
        "Siège social : Abidjan, Côte d'Ivoire",
        "Email : contact@nguessan-it.com",
        "Directeur de la publication : Fiacre N'Guessan"
      ]
    },
    {
      icon: Server,
      title: "Hébergement",
      content: [
        "Site hébergé par Lovable Cloud Hosting",
        "Infrastructure sécurisée et conforme aux normes de protection de données",
        "Serveurs basés en Europe et aux États-Unis"
      ]
    },
    {
      icon: Copyright,
      title: "Propriété intellectuelle",
      content: [
        "Tous les éléments du site sont la propriété de Nguessan-IT",
        "Textes, images, codes, logos, documents, vidéos protégés",
        "Reproduction partielle ou totale strictement interdite sans autorisation"
      ]
    },
    {
      icon: Globe,
      title: "Liens externes",
      content: [
        "Liens vers Instagram, LinkedIn, Facebook",
        "Nguessan-IT ne saurait être responsable du contenu de ces plateformes",
        "Vérification régulière des liens externes"
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
            <Scale className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Mentions légales
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-4 max-w-2xl mx-auto">
            Informations légales officielles de <strong>Nguessan-IT</strong>
          </p>
          <p className="text-sm text-muted-foreground">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
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
              <Globe className="h-6 w-6 text-primary" />
              <CardTitle className="text-2xl bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Liens externes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Le site{" "}
                <a href="https://www.nguessan-it.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
                  www.nguessan-it.com
                </a>{" "}
                contient des liens vers :
              </p>
              <ul className="space-y-2 ml-4 text-muted-foreground">
                <li>
                  • <a href="https://instagram.com/nguessanit" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    Instagram
                  </a>
                </li>
                <li>
                  • <a href="https://linkedin.com/company/nguessan-it" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    LinkedIn
                  </a>
                </li>
                <li>
                  • <a href="https://www.facebook.com/share/19vPLXiLwK/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    Facebook
                  </a>
                </li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                Nguessan-IT ne saurait être responsable du contenu de ces plateformes.
              </p>
            </CardContent>
          </Card>

          <Card className="border-primary/20 shadow-md">
            <CardHeader className="flex flex-row items-center gap-3">
              <Scale className="h-6 w-6 text-primary" />
              <CardTitle className="text-2xl bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Loi applicable
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Les présentes mentions légales sont régies par la <strong>loi ivoirienne</strong>.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                En cas de litige, compétence exclusive attribuée aux <strong>tribunaux d'Abidjan</strong>.
              </p>
            </CardContent>
          </Card>

          <Card className="border-primary/20 shadow-md">
            <CardHeader className="flex flex-row items-center gap-3">
              <Copyright className="h-6 w-6 text-primary" />
              <CardTitle className="text-2xl bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Mise à jour
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Cette page peut être modifiée à tout moment. La date de dernière révision est affichée en haut de cette page.
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
                Contactez-nous
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Pour toute question concernant les mentions légales :
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
                    <Link to="/contact">Contactez-nous</Link>
                  </Button>
                  <Button variant="outline" asChild className="hover:bg-primary/10">
                    <Link to="/politique-confidentialite">Politique de confidentialité</Link>
                  </Button>
                  <Button variant="outline" asChild className="hover:bg-primary/10">
                    <Link to="/conditions">Conditions d'utilisation</Link>
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

export default Legal;
