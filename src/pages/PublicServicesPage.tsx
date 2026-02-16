import { Link } from "react-router-dom";
import { Globe, Cloud, Shield, Brain, Code, BarChart3, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Transformation digitale",
    desc: "Accompagnement stratégique de bout en bout pour moderniser vos processus métier, automatiser vos flux et accélérer votre croissance.",
  },
  {
    icon: Cloud,
    title: "Cloud & Infrastructure",
    desc: "Migration cloud, architecture hybride, gestion d'infrastructures sécurisées et évolutives adaptées à vos besoins.",
  },
  {
    icon: Shield,
    title: "Cybersécurité",
    desc: "Audit de sécurité, protection des données, mise en conformité RGPD et surveillance continue de vos systèmes critiques.",
  },
  {
    icon: Brain,
    title: "Conseil IT & IA",
    desc: "Intégration d'intelligence artificielle, analyse prédictive et optimisation de vos processus grâce aux dernières avancées technologiques.",
  },
  {
    icon: Code,
    title: "Développement web & mobile",
    desc: "Création de sites web, applications mobiles et plateformes sur mesure avec les technologies les plus performantes.",
  },
  {
    icon: BarChart3,
    title: "Business Intelligence",
    desc: "Tableaux de bord, reporting avancé et analyse de données pour une prise de décision éclairée et rapide.",
  },
];

export default function PublicServicesPage() {
  return (
    <div>
      {/* Hero */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-primary/10 via-background to-accent/30">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-6">Nos Services</h1>
          <p className="text-lg text-muted-foreground">
            Des solutions complètes pour accompagner votre transformation numérique à chaque étape.
          </p>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((s) => (
              <div key={s.title} className="bg-card border border-border rounded-lg p-8 hover:shadow-lg hover:-translate-y-1 transition-all group">
                <s.icon className="text-primary mb-5 group-hover:scale-110 transition-transform" size={36} />
                <h3 className="font-display text-lg font-semibold text-foreground mb-3">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{s.desc}</p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline whitespace-normal text-center"
                >
                  En savoir plus <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary/5">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-4">Un projet en tête ?</h2>
          <p className="text-muted-foreground mb-8">Discutons de vos besoins et trouvons ensemble la meilleure solution.</p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:opacity-90 transition"
          >
            Demandez un devis <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
