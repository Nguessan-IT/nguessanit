import { Link } from "react-router-dom";
import { ArrowRight, Shield, Zap, Globe, Users } from "lucide-react";

const services = [
  { icon: Globe, title: "Transformation digitale", desc: "Accompagnement stratégique pour moderniser vos processus métier." },
  { icon: Zap, title: "Cloud & Infrastructure", desc: "Solutions cloud sécurisées et évolutives pour votre entreprise." },
  { icon: Shield, title: "Cybersécurité", desc: "Protection avancée de vos données et systèmes critiques." },
  { icon: Users, title: "Conseil IT & IA", desc: "Expertise en intelligence artificielle et optimisation IT." },
];

const stats = [
  { value: "50+", label: "Clients accompagnés" },
  { value: "98%", label: "Satisfaction client" },
  { value: "3", label: "Continents" },
  { value: "24/7", label: "Support disponible" },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/30 py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Votre partenaire digital<br />
            <span className="text-primary">pour innover et transformer</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Nguessan-IT accompagne les entreprises d'Afrique, d'Europe et d'Amérique dans leur transformation numérique avec expertise et innovation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:opacity-90 transition flex items-center gap-2"
            >
              Demandez un devis <ArrowRight size={18} />
            </Link>
            <Link
              to="/services"
              className="px-6 py-3 border border-border rounded-md font-medium text-foreground hover:bg-accent transition"
            >
              Nos services
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-foreground text-center mb-12">Nos expertises</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s) => (
              <div key={s.title} className="bg-card border border-border rounded-lg p-6 hover:shadow-lg hover:-translate-y-1 transition-all">
                <s.icon className="text-primary mb-4" size={32} />
                <h3 className="font-display font-semibold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="font-display text-3xl sm:text-4xl font-bold text-primary mb-1">{s.value}</div>
                <div className="text-sm text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl font-bold text-foreground mb-4">Prêt à transformer votre entreprise ?</h2>
          <p className="text-muted-foreground mb-8">
            Contactez-nous pour discuter de vos besoins et obtenir un devis personnalisé.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:opacity-90 transition"
          >
            Contactez-nous <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
