import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Scale, FileText, AlertCircle, CheckCircle, XCircle, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Terms = () => {
  const sections = [
    {
      icon: FileText,
      title: "Prestations de services",
      content: [
        "Développement web et applications sur mesure",
        "Maintenance informatique préventive et corrective",
        "Solutions cloud et migration de données",
        "Formation et conseil en informatique",
        "Support technique et assistance utilisateur"
      ]
    },
    {
      icon: CheckCircle,
      title: "Nos engagements",
      content: [
        "Respect des délais convenus contractuellement",
        "Qualité des prestations selon les standards du marché",
        "Support technique réactif pendant les heures ouvrables",
        "Confidentialité et sécurité des données clients",
        "Formation et documentation complètes"
      ]
    },
    {
      icon: AlertCircle,
      title: "Responsabilités client",
      content: [
        "Fourniture d'informations exactes et complètes",
        "Accès aux systèmes et données nécessaires",
        "Respect des procédures de sécurité établies",
        "Formation des utilisateurs aux nouvelles solutions",
        "Sauvegarde régulière des données critiques"
      ]
    },
    {
      icon: XCircle,
      title: "Limitations",
      content: [
        "Force majeure et événements indépendants de notre volonté",
        "Problèmes liés aux systèmes tiers non maintenus par nous",
        "Dommages résultant d'une utilisation non conforme",
        "Pertes de données non sauvegardées par le client",
        "Interruptions dues à la maintenance programmée"
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
          <Scale className="h-16 w-16 mx-auto mb-6 text-primary" />
          <h1 className="text-4xl sm:text-6xl font-bold mb-6">
            <span className="gradient-text">Conditions d'Utilisation</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Conditions générales de vente et d'utilisation des services Nguessan-IT
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
              <CardTitle className="text-2xl gradient-text">Informations légales</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-lg max-w-none">
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <strong>Raison sociale :</strong> Nguessan-IT<br/>
                  <strong>Forme juridique :</strong> Entreprise individuelle / Auto-entrepreneur<br/>
                  <strong>Siège social :</strong> [Adresse à compléter]<br/>
                  <strong>SIRET :</strong> [Numéro à compléter]<br/>
                  <strong>Email :</strong> contact@nguessan-it.fr<br/>
                  <strong>Téléphone :</strong> +33 (0)1 XX XX XX XX
                </p>
                <p>
                  Les présentes conditions générales s'appliquent à toutes les prestations de services informatiques 
                  fournies par Nguessan-IT. Elles constituent, avec le devis accepté, l'intégralité du contrat.
                </p>
              </div>
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

      {/* Detailed Terms */}
      <section className="py-16 bg-card/30">
        <div className="max-w-4xl mx-auto space-y-8">
          <Card className="card-elegant border-border">
            <CardHeader>
              <CardTitle className="text-2xl gradient-text">Commande et devis</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-lg max-w-none">
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <strong>Devis :</strong> Tout devis est valable 30 jours à compter de sa date d'émission. 
                  L'acceptation du devis vaut commande ferme et définitive.
                </p>
                <p>
                  <strong>Bon de commande :</strong> Le client peut passer commande en retournant le devis signé 
                  avec la mention "Bon pour accord" accompagné du règlement d'acompte si prévu.
                </p>
                <p>
                  <strong>Modifications :</strong> Toute modification du cahier des charges initial fera l'objet 
                  d'un avenant au devis initial et pourra entraîner une facturation supplémentaire.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="card-elegant border-border">
            <CardHeader>
              <CardTitle className="text-2xl gradient-text">Tarifs et paiement</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-lg max-w-none">
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <strong>Tarifs :</strong> Les prix sont exprimés en euros hors taxes. La TVA est applicable 
                  selon la réglementation en vigueur.
                </p>
                <p>
                  <strong>Modalités de paiement :</strong>
                </p>
                <ul className="space-y-1 ml-4">
                  <li>• Prestations &lt; 500€ : Paiement à la commande</li>
                  <li>• Prestations 500€ - 2000€ : 50% à la commande, 50% à la livraison</li>
                  <li>• Prestations &gt; 2000€ : Échéancier personnalisé selon le projet</li>
                </ul>
                <p>
                  <strong>Délais de paiement :</strong> Les factures sont payables à 30 jours nets. 
                  Tout retard entraîne des pénalités de 3 fois le taux de l'intérêt légal.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="card-elegant border-border">
            <CardHeader>
              <CardTitle className="text-2xl gradient-text">Livraison et réception</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-lg max-w-none">
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <strong>Délais :</strong> Les délais indiqués sont donnés à titre indicatif et courent 
                  à compter de la réception de la commande et de l'acompte si prévu.
                </p>
                <p>
                  <strong>Livraison :</strong> La livraison s'effectue par mise à disposition des livrables 
                  convenus (site web, logiciel, documentation) accompagnés des codes d'accès nécessaires.
                </p>
                <p>
                  <strong>Réception :</strong> Le client dispose de 15 jours pour tester et valider la livraison. 
                  Passé ce délai, la prestation est réputée acceptée définitivement.
                </p>
                <p>
                  <strong>Formation :</strong> Une formation à l'utilisation des solutions livrées est incluse 
                  dans la prestation (durée et modalités selon devis).
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="card-elegant border-border">
            <CardHeader>
              <CardTitle className="text-2xl gradient-text">Garantie et support</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-lg max-w-none">
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <strong>Garantie :</strong> Nguessan-IT garantit ses prestations pendant 3 mois à compter 
                  de la livraison contre tout vice de conformité par rapport aux spécifications convenues.
                </p>
                <p>
                  <strong>Support technique :</strong>
                </p>
                <ul className="space-y-1 ml-4">
                  <li>• Support inclus : 30 jours après livraison</li>
                  <li>• Horaires : Lundi au vendredi, 9h-18h</li>
                  <li>• Moyens : Email, téléphone, intervention sur site selon contrat</li>
                </ul>
                <p>
                  <strong>Maintenance :</strong> Au-delà de la période de support inclus, la maintenance 
                  fait l'objet d'un contrat spécifique avec tarification horaire ou forfaitaire.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="card-elegant border-border">
            <CardHeader>
              <CardTitle className="text-2xl gradient-text">Propriété intellectuelle</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-lg max-w-none">
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <strong>Développements spécifiques :</strong> Le client acquiert les droits d'usage 
                  sur les développements réalisés spécifiquement pour ses besoins, après paiement intégral.
                </p>
                <p>
                  <strong>Outils et méthodologies :</strong> Nguessan-IT conserve la propriété de ses outils, 
                  méthodologies et connaissances utilisés dans le cadre de la prestation.
                </p>
                <p>
                  <strong>Données client :</strong> Le client reste propriétaire de ses données. 
                  Nguessan-IT s'engage à les restituer sur support exploitable à la fin du contrat.
                </p>
                <p>
                  <strong>Logiciels tiers :</strong> Les licences des logiciels tiers restent soumises 
                  à leurs conditions d'utilisation respectives.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="card-elegant border-border">
            <CardHeader>
              <CardTitle className="text-2xl gradient-text">Résiliation et litiges</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-lg max-w-none">
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <strong>Résiliation :</strong> En cas de manquement grave d'une partie à ses obligations, 
                  le contrat peut être résilié de plein droit après mise en demeure restée infructueuse pendant 15 jours.
                </p>
                <p>
                  <strong>Droit applicable :</strong> Les présentes conditions sont soumises au droit français.
                </p>
                <p>
                  <strong>Médiation :</strong> En cas de litige, les parties privilégieront une solution amiable. 
                  À défaut, compétence exclusive est donnée aux tribunaux du ressort du siège social.
                </p>
                <p>
                  <strong>Nullité partielle :</strong> Si une clause s'avérait nulle, cela n'affecterait pas 
                  la validité des autres dispositions.
                </p>
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
                Questions et contact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <p className="text-muted-foreground">
                  Pour toute question concernant ces conditions d'utilisation ou nos services, 
                  n'hésitez pas à nous contacter :
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
                    <FileText className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Devis gratuit</p>
                      <p className="text-muted-foreground">Réponse sous 24h</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild>
                    <Link to="/contact">Nous contacter</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/devis">Demander un devis</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/politique-confidentialite">Politique de confidentialité</Link>
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

export default Terms;