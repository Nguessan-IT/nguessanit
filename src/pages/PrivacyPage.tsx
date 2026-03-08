import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Eye, Lock, Database, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Privacy = () => {
  const sections = [
    {
      icon: Database,
      title: "Collecte des données",
      content: [
        "Données d'identification : nom, prénom, entreprise, fonction",
        "Coordonnées : adresse e-mail, numéro de téléphone, adresse postale",
        "Données techniques : adresse IP, navigateur, système d'exploitation",
        "Données de navigation : pages visitées, durée de session, interactions"
      ]
    },
    {
      icon: Eye,
      title: "Utilisation des données",
      content: [
        "Traitement des demandes de devis et services",
        "Communication commerciale et support client",
        "Amélioration de nos services et site web",
        "Respect des obligations légales et contractuelles"
      ]
    },
    {
      icon: Lock,
      title: "Protection des données",
      content: [
        "Chiffrement SSL/TLS pour toutes les communications",
        "Stockage sécurisé sur serveurs européens certifiés",
        "Accès restreint aux données selon le principe du besoin d'en connaître",
        "Sauvegardes régulières et plan de continuité d'activité"
      ]
    },
    {
      icon: Shield,
      title: "Vos droits",
      content: [
        "Droit d'accès à vos données personnelles",
        "Droit de rectification et de mise à jour",
        "Droit à l'effacement (droit à l'oubli)",
        "Droit à la portabilité des données"
      ]
    }
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-60"></div>
        <div className="floating-elements">
          <div className="floating-orb"></div>
          <div className="floating-orb"></div>
        </div>
        <div className="relative max-w-4xl mx-auto">
          <Shield className="h-16 w-16 mx-auto mb-6 text-primary" />
          <h1 className="text-4xl sm:text-6xl font-bold mb-6">
            <span className="gradient-text">Politique de Confidentialité</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Nguessan-IT s'engage à protéger vos données personnelles conformément au RGPD
          </p>
          <p className="text-sm text-muted-foreground">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto">
          <Card className="card-elegant border-border mb-8">
            <CardHeader>
              <CardTitle className="text-2xl gradient-text">Introduction</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-lg max-w-none">
              <p className="text-muted-foreground">
                La société <strong>Nguessan-IT</strong>, prestataire de services informatiques, s'engage à respecter et protéger 
                la vie privée de ses clients, prospects et utilisateurs de son site web. Cette politique de confidentialité 
                explique comment nous collectons, utilisons, stockons et protégeons vos données personnelles.
              </p>
              <p className="text-muted-foreground">
                En utilisant nos services ou notre site web, vous acceptez les pratiques décrites dans cette politique, 
                établie conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Main Sections */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {sections.map((section, index) => (
              <Card key={index} className="card-elegant border-border hover:shadow-glow transition-all duration-500">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                      <section.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-xl">{section.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {section.content.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-muted-foreground">{item}</span>
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
      <section className="py-16 bg-card/30">
        <div className="max-w-4xl mx-auto space-y-8">
          <Card className="card-elegant border-border">
            <CardHeader>
              <CardTitle className="text-2xl gradient-text">Base légale du traitement</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-lg max-w-none">
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <strong>Exécution contractuelle :</strong> Traitement des demandes de devis, prestation de services informatiques, 
                  support technique et maintenance.
                </p>
                <p>
                  <strong>Intérêt légitime :</strong> Amélioration de nos services, prospection commerciale auprès de nos clients existants, 
                  sécurisation de nos systèmes.
                </p>
                <p>
                  <strong>Consentement :</strong> Newsletter, communications marketing pour les non-clients, cookies non essentiels.
                </p>
                <p>
                  <strong>Obligation légale :</strong> Facturation, archivage comptable, déclarations fiscales et sociales.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="card-elegant border-border">
            <CardHeader>
              <CardTitle className="text-2xl gradient-text">Durée de conservation</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-lg max-w-none">
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <strong>Clients actifs :</strong> Durée de la relation contractuelle + 5 ans pour les obligations comptables.
                </p>
                <p>
                  <strong>Prospects :</strong> 3 ans maximum à compter du dernier contact ou de la prospection.
                </p>
                <p>
                  <strong>Données techniques :</strong> 13 mois maximum pour les logs de connexion et statistiques.
                </p>
                <p>
                  <strong>Cookies :</strong> 13 mois maximum selon les recommandations de la CNIL.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="card-elegant border-border">
            <CardHeader>
              <CardTitle className="text-2xl gradient-text">Partage des données</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-lg max-w-none">
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Nguessan-IT ne vend jamais vos données personnelles. Nous pouvons partager certaines données avec :
                </p>
                <ul className="space-y-2 ml-4">
                  <li>• <strong>Sous-traitants techniques :</strong> Hébergeurs, outils de communication (sous contrat RGPD)</li>
                  <li>• <strong>Partenaires commerciaux :</strong> Uniquement avec votre consentement explicite</li>
                  <li>• <strong>Autorités compétentes :</strong> En cas d'obligation légale ou judiciaire</li>
                </ul>
                <p>
                  Tous nos sous-traitants sont situés dans l'Union Européenne, en Afrique, en Amérique ou dans des pays reconnus comme adéquats par la Commission Européenne.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="card-elegant border-border">
            <CardHeader>
              <CardTitle className="text-2xl gradient-text">Sécurité des données</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-lg max-w-none">
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Nguessan-IT met en œuvre des mesures techniques et organisationnelles appropriées :
                </p>
                <ul className="space-y-2 ml-4">
                  <li>• <strong>Chiffrement :</strong> SSL/TLS pour les transmissions, chiffrement des données sensibles</li>
                  <li>• <strong>Accès :</strong> Authentification forte, principe du besoin d'en connaître</li>
                  <li>• <strong>Surveillance :</strong> Monitoring 24/7, détection d'intrusion, journalisation</li>
                  <li>• <strong>Formation :</strong> Sensibilisation du personnel à la sécurité des données</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto">
          <Card className="card-elegant border-border">
            <CardHeader>
              <CardTitle className="text-2xl gradient-text flex items-center gap-2">
                <Mail className="h-6 w-6" />
                Exercer vos droits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <p className="text-muted-foreground">
                  Pour exercer vos droits ou pour toute question concernant cette politique de confidentialité, 
                  vous pouvez nous contacter :
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-muted-foreground">contact@nguessan-it.fr</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Téléphone</p>
                      <p className="text-muted-foreground">+33 (0)1 XX XX XX XX</p>
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground">
                  Nous nous engageons à répondre à vos demandes dans un délai maximum d'un mois. 
                  Vous avez également le droit de déposer une réclamation auprès de la CNIL 
                  (Commission Nationale de l'Informatique et des Libertés).
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild>
                    <Link to="/contact">Nous contacter</Link>
                  </Button>
                  <Button variant="outline" asChild>
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

export default Privacy;