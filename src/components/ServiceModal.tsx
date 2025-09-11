import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowRight, Star, Shield, Zap, Users, TrendingUp, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { useCurrency } from "@/contexts/CurrencyContext";
import CallRequestModal from "./CallRequestModal";

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceKey: string;
}

const serviceContent = {
  webDev: {
    title: "Développement Web Moderne & Sur-Mesure",
    subtitle: "Transformez votre vision en réalité digitale performante",
    description: "À l'ère du numérique, votre présence en ligne détermine votre succès. Un site web n'est plus un luxe, c'est une nécessité vitale pour toute entreprise qui souhaite prospérer.",
    context: "Aujourd'hui, 97% des consommateurs recherchent des entreprises locales en ligne avant de faire un achat. Sans une présence web professionnelle, vous perdez des opportunités chaque jour.",
    solution: "Chez Nguessan-IT, nous créons des expériences web exceptionnelles qui convertissent vos visiteurs en clients fidèles.",
    benefits: [
      "Sites web ultra-rapides avec des temps de chargement < 2 secondes",
      "Design responsive parfait sur tous les appareils",
      "SEO optimisé pour une visibilité maximale sur Google",
      "Sécurité bancaire avec certificats SSL et protection avancée",
      "Interface utilisateur intuitive qui augmente les conversions de 40%",
      "Intégration e-commerce pour vendre 24h/7j",
      "Tableau de bord admin simple pour gérer votre contenu"
    ],
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL"],
    stats: [
      { label: "Temps de chargement moyen", value: "< 2s" },
      { label: "Taux de conversion client", value: "+40%" },
      { label: "Score Google PageSpeed", value: "95+" },
      { label: "Uptime garanti", value: "99.9%" }
    ],
    testimonial: "Depuis le lancement de notre nouveau site par Nguessan-IT, nos ventes en ligne ont explosé de 300%. L'équipe est exceptionnelle !",
    whyUs: [
      "1+ année d'expertise en développement web moderne",
      "Portfolio de projets réussis à travers le monde",
      "Support technique 24/7 en français",
      "Garantie satisfaction ou remboursé",
      "Formation complète pour gérer votre site",
      "Maintenance et mises à jour incluses"
    ]
  },
  maintenance: {
    title: "Maintenance IT 24/7 & Support Technique Premium",
    subtitle: "Votre infrastructure IT entre les mains d'experts",
    description: "Une panne informatique peut coûter jusqu'à 50 000 FCFA par heure à une entreprise. Ne laissez pas la technologie freiner votre croissance.",
    context: "Les pannes informatiques sont imprévisibles et coûteuses. 70% des PME qui subissent une panne majeure ferment dans les 6 mois. La prévention et la réactivité sont cruciales.",
    solution: "Notre service de maintenance préventive et corrective assure la continuité de vos opérations avec une disponibilité garantie de 99.9%.",
    benefits: [
      "Surveillance proactive 24h/24, 7j/7 de votre infrastructure",
      "Intervention d'urgence sous 2h maximum",
      "Sauvegardes automatiques quotidiennes sécurisées",
      "Mises à jour de sécurité automatiques",
      "Optimisation des performances en continu",
      "Support multilingue (français, anglais)",
      "Rapports détaillés mensuels de performance"
    ],
    technologies: ["Monitoring", "Cloud Backup", "Antivirus Enterprise", "Firewall", "VPN", "Active Directory"],
    stats: [
      { label: "Temps de réponse moyen", value: "< 30min" },
      { label: "Disponibilité garantie", value: "99.9%" },
      { label: "Économies générées", value: "60%" },
      { label: "Clients satisfaits", value: "100%" }
    ],
    testimonial: "Grâce à Nguessan-IT, nous n'avons plus de stress IT. Leur équipe anticipe les problèmes avant qu'ils surviennent. Un service exceptionnel !",
    whyUs: [
      "Équipe certifiée Microsoft, Cisco, VMware",
      "Centre de surveillance moderne et connecté",
      "Contrats SLA personnalisés selon vos besoins",
      "Intervention préventive pour éviter 90% des pannes",
      "Relation de confiance et expertise dédiée",
      "Prix transparents sans surprise"
    ]
  },
  cloud: {
    title: "Solutions Cloud Sécurisées & Migration Expert",
    subtitle: "Libérez le potentiel de votre entreprise dans le cloud",
    description: "Le cloud computing représente l'avenir de l'IT. Réduisez vos coûts de 40% tout en augmentant votre flexibilité et sécurité.",
    context: "Les entreprises qui migrent vers le cloud voient leurs coûts IT diminuer de 40% et leur productivité augmenter de 50%. C'est la révolution digitale incontournable.",
    solution: "Nous orchestrons votre transition vers le cloud avec une expertise AWS certifiée, garantissant une migration sans interruption de service.",
    benefits: [
      "Réduction des coûts IT jusqu'à 40%",
      "Accès à vos données depuis n'importe où dans le monde",
      "Sauvegarde automatique et récupération instantanée",
      "Évolutivité automatique selon vos besoins",
      "Sécurité militaire avec chiffrement bout en bout",
      "Conformité RGPD et normes internationales",
      "Support migration sans interruption de service"
    ],
    technologies: ["AWS", "Microsoft Azure", "Google Cloud", "Docker", "Kubernetes", "Terraform"],
    stats: [
      { label: "Réduction des coûts", value: "40%" },
      { label: "Temps de migration", value: "< 7 jours" },
      { label: "Uptime cloud", value: "99.99%" },
      { label: "Économies annuelles", value: "2M+ FCFA" }
    ],
    testimonial: "La migration cloud avec Nguessan-IT a transformé notre entreprise. Plus de serveurs physiques, plus de pannes, juste l'efficacité pure !",
    whyUs: [
      "Partenaire officiel AWS et Microsoft Azure",
      "Architectes cloud certifiés internationalement",
      "Audit gratuit de votre infrastructure actuelle",
      "Plan de migration personnalisé et sécurisé",
      "Formation complète de vos équipes",
      "Support 24/7 post-migration"
    ]
  },
  training: {
    title: "Formation IT Professionnelle & Audit Stratégique",
    subtitle: "Propulsez vos équipes vers l'excellence technologique",
    description: "Investir dans la formation IT de vos équipes génère un ROI de 400%. Transformez vos collaborateurs en experts technologiques.",
    context: "Les compétences IT évoluent rapidement. 65% des emplois futurs nécessiteront des compétences numériques avancées. Former vos équipes aujourd'hui, c'est assurer votre compétitivité demain.",
    solution: "Nos programmes de formation sur-mesure développent les compétences de vos équipes avec des méthodes pédagogiques innovantes et pratiques.",
    benefits: [
      "Programmes personnalisés selon votre secteur d'activité",
      "Formation pratique avec projets réels",
      "Certification internationale reconnue",
      "Amélioration de la productivité de 60%",
      "Réduction des erreurs techniques de 80%",
      "Accompagnement individuel et collectif",
      "Suivi post-formation et évaluation continue"
    ],
    technologies: ["Microsoft Office 365", "Google Workspace", "CRM/ERP", "Cybersécurité", "IA/ML", "Cloud Computing"],
    stats: [
      { label: "ROI formation", value: "400%" },
      { label: "Taux de réussite", value: "95%" },
      { label: "Heures de formation", value: "500+" },
      { label: "Professionnels formés", value: "200+" }
    ],
    testimonial: "Nos équipes ont gagné en autonomie et en efficacité après les formations Nguessan-IT. Un investissement qui se ressent immédiatement !",
    whyUs: [
      "Formateurs experts avec 1+ année d'expérience moderne",
      "Méthodes pédagogiques adaptées aux contextes internationaux",
      "Formations en présentiel ou à distance",
      "Supports de cours exclusifs et actualisés",
      "Certification et badges de compétences",
      "Accompagnement personnalisé post-formation"
    ]
  },
  branding: {
    title: "Identité Visuelle & Branding Digital Premium",
    subtitle: "Créez une marque inoubliable qui marque les esprits",
    description: "Votre identité visuelle est votre première impression. 90% des décisions d'achat sont influencées par l'apparence visuelle. Ne laissez rien au hasard.",
    context: "Dans un marché saturé, une identité visuelle forte peut augmenter vos revenus de 23%. Les entreprises avec un branding cohérent voient leur valeur augmenter de 20%.",
    solution: "Nous créons des identités visuelles puissantes qui racontent votre histoire et connectent émotionnellement avec vos clients.",
    benefits: [
      "Logo unique et mémorable conçu pour votre marché",
      "Charte graphique complète pour tous supports",
      "Déclinaisons digitales responsive et modernes",
      "Guide de style détaillé pour maintenir la cohérence",
      "Assets digitaux optimisés pour tous les canaux",
      "Recherche approfondie de votre audience cible",
      "Stratégie de positionnement concurrentiel"
    ],
    technologies: ["Adobe Creative Suite", "Figma", "Sketch", "After Effects", "Webflow", "Brand Guidelines"],
    stats: [
      { label: "Augmentation revenus", value: "23%" },
      { label: "Reconnaissance marque", value: "+80%" },
      { label: "Temps de conception", value: "14 jours" },
      { label: "Révisions incluses", value: "5" }
    ],
    testimonial: "Notre nouvelle identité visuelle créée par Nguessan-IT nous a repositionnés comme leader sur notre marché. Le résultat dépasse nos attentes !",
    whyUs: [
      "Designers seniors avec portfolio international",
      "Recherche marché approfondie multi-continentale",
      "Processus créatif collaboratif et transparent",
      "Livrables haute qualité prêts pour tous supports",
      "Accompagnement stratégique et conseil expert",
      "Garantie satisfaction avec révisions illimitées"
    ]
  },
  interactive: {
    title: "Documents Interactifs & Expériences Immersives",
    subtitle: "Transformez vos contenus statiques en expériences captivantes",
    description: "Les documents interactifs génèrent 5x plus d'engagement que les PDF statiques. Révolutionnez votre communication avec des expériences immersives.",
    context: "À l'ère de l'attention limitée, captiver votre audience est crucial. Les contenus interactifs augmentent le temps d'engagement de 300% et améliorent la mémorisation de 70%.",
    solution: "Nous transformons vos documents traditionnels en expériences digitales interactives qui engagent, informent et convertissent.",
    benefits: [
      "PDF interactifs avec animations et liens dynamiques",
      "Catalogues digitaux avec recherche avancée",
      "Présentations animées captivantes",
      "Rapports dynamiques avec graphiques temps réel",
      "Formulaires intelligents auto-adaptatifs",
      "Analytics détaillés sur l'engagement utilisateur",
      "Optimisation mobile et tablette parfaite"
    ],
    technologies: ["HTML5", "CSS3", "JavaScript", "D3.js", "GSAP", "Progressive Web Apps"],
    stats: [
      { label: "Engagement moyen", value: "+300%" },
      { label: "Taux de conversion", value: "+150%" },
      { label: "Temps de lecture", value: "+250%" },
      { label: "Mémorisation", value: "+70%" }
    ],
    testimonial: "Nos brochures interactives créées par Nguessan-IT ont révolutionné nos présentations commerciales. Nos prospects sont bluffés !",
    whyUs: [
      "Spécialistes en UX/UI et design interactif",
      "Technologies de pointe pour performances optimales",
      "Conception centrée utilisateur et accessible",
      "Intégration CRM et outils marketing existants",
      "Formation équipe pour maintenance autonome",
      "Support technique et évolutions continues"
    ]
  }
};

export const ServiceModal: React.FC<ServiceModalProps> = ({ isOpen, onClose, serviceKey }) => {
  const { formatPrice, isLoading } = useCurrency();
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const content = serviceContent[serviceKey as keyof typeof serviceContent];

  if (!content) return null;

  const getPriceDisplay = () => {
    if (isLoading) return "Chargement...";
    const priceInfo = formatPrice(serviceKey);
    return priceInfo === "Devis sur mesure" ? priceInfo : `À partir de ${priceInfo}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-background to-card/50 border-border/50">
        <DialogHeader className="space-y-4 pb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center">
                <Zap className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <DialogTitle className="text-2xl gradient-text font-bold">{content.title}</DialogTitle>
                <p className="text-lg text-muted-foreground">{content.subtitle}</p>
              </div>
            </div>
            <Badge variant="secondary" className="text-lg px-4 py-2 font-semibold">
              {getPriceDisplay()}
            </Badge>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contenu principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description principale */}
            <div className="card-elegant p-6 space-y-4">
              <h3 className="text-xl font-semibold gradient-text flex items-center">
                <Target className="mr-2 h-5 w-5" />
                Pourquoi c'est essentiel aujourd'hui ?
              </h3>
              <p className="text-muted-foreground leading-relaxed">{content.description}</p>
              <div className="bg-secondary/30 p-4 rounded-lg border-l-4 border-primary">
                <p className="font-medium text-foreground">{content.context}</p>
              </div>
            </div>

            {/* Solution Nguessan-IT */}
            <div className="card-elegant p-6 space-y-4">
              <h3 className="text-xl font-semibold gradient-text flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                Notre solution experte
              </h3>
              <p className="text-muted-foreground leading-relaxed">{content.solution}</p>
            </div>

            {/* Avantages */}
            <div className="card-elegant p-6 space-y-4">
              <h3 className="text-xl font-semibold gradient-text flex items-center">
                <Check className="mr-2 h-5 w-5" />
                Bénéfices concrets
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {content.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-secondary/20 rounded-lg">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies */}
            <div className="card-elegant p-6 space-y-4">
              <h3 className="text-xl font-semibold gradient-text">Technologies utilisées</h3>
              <div className="flex flex-wrap gap-2">
                {content.technologies.map((tech, index) => (
                  <Badge key={index} variant="outline" className="px-3 py-1">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Témoignage */}
            <div className="card-elegant p-6 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
              <div className="flex items-start space-x-4">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
              <blockquote className="text-lg italic mt-4 text-foreground">
                "{content.testimonial}"
              </blockquote>
              <cite className="text-sm text-muted-foreground mt-2 block">
                - Client satisfait Nguessan-IT
              </cite>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Statistiques */}
            <div className="card-elegant p-6 space-y-4">
              <h3 className="text-lg font-semibold gradient-text flex items-center">
                <TrendingUp className="mr-2 h-5 w-5" />
                Résultats prouvés
              </h3>
              <div className="space-y-4">
                {content.stats.map((stat, index) => (
                  <div key={index} className="text-center p-3 bg-secondary/20 rounded-lg">
                    <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pourquoi nous choisir */}
            <div className="card-elegant p-6 space-y-4">
              <h3 className="text-lg font-semibold gradient-text flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Pourquoi Nguessan-IT ?
              </h3>
              <div className="space-y-3">
                {content.whyUs.map((reason, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <Check className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-sm">{reason}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="card-elegant p-6 space-y-4 bg-gradient-to-br from-primary/10 to-secondary/10">
              <h3 className="text-lg font-semibold text-center">Prêt à commencer ?</h3>
              <div className="space-y-3">
                <Button className="w-full hero-glow" asChild>
                  <Link to="/devis">
                    Demander un devis gratuit
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => setIsCallModalOpen(true)}
                >
                  Planifier un appel
                </Button>
              </div>
              <p className="text-xs text-center text-muted-foreground">
                Consultation gratuite • Devis sous 24h • Sans engagement
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
      
      <CallRequestModal
        isOpen={isCallModalOpen}
        onClose={() => setIsCallModalOpen(false)}
        serviceTitle={content?.title}
      />
    </Dialog>
  );
};