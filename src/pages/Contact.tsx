import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Mail, 
  Phone, 
  Clock, 
  MessageSquare,
  MapPin,
  Send,
  CheckCircle2,
  Calculator
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import WhatsAppContact from "@/components/WhatsAppContact";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    toast({
      title: "Message envoyé !",
      description: "Nous vous recontacterons dans les plus brefs délais.",
    });
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      company: "",
      subject: "",
      message: ""
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "fiacrenguessan@outlook.com",
      description: "Réponse sous 24h",
      action: "mailto:fiacrenguessan@outlook.com"
    },
    {
      icon: Phone,
      title: "Téléphone",
      value: "0777655416",
      description: "Réponse immédiate",
      action: "tel:+2250777655416"
    },
    {
      icon: Phone,
      title: "Téléphone",
      value: "0500401041",
      description: "Ligne alternative",
      action: "tel:+2250500401041"
    },
    {
      icon: Phone,
      title: "Téléphone",
      value: "0788624986",
      description: "Support technique",
      action: "tel:+2250788624986"
    }
  ];

  const responseTime = [
    { method: "Email", time: "sous 24h", icon: Mail },
    { method: "Téléphone", time: "immédiat", icon: Phone },
    { method: "Devis", time: "2-3 jours ouvrés", icon: MessageSquare }
  ];

  const services = [
    "Développement Web",
    "Maintenance Informatique",
    "Solutions Cloud",
    "Formation & Conseil",
    "Audit Sécurité",
    "Support Technique"
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <SEO 
        title="Contact - Parlons de votre projet IT"
        description="Contactez Nguessan-IT pour vos besoins informatiques à Abidjan, Côte d'Ivoire. Réponse sous 24h garantie. Email, téléphone, formulaire de contact. Expert solutions IT professionnelles."
        keywords={[
          'contact nguessan-it',
          'consultant informatique abidjan contact',
          'entreprise IT côte d\'ivoire téléphone',
          'expert informatique contact direct',
          'devis informatique gratuit contact',
          'support technique contact',
          'développement web contact abidjan'
        ]}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "mainEntity": {
            "@type": "Organization",
            "name": "Nguessan-IT",
            "contactPoint": [
              {
                "@type": "ContactPoint",
                "telephone": "+225-0777655416",
                "contactType": "customer service",
                "availableLanguage": ["French", "English"],
                "hoursAvailable": {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  "opens": "08:00",
                  "closes": "18:00"
                }
              },
              {
                "@type": "ContactPoint",
                "email": "fiacrenguessan@outlook.com",
                "contactType": "customer service",
                "responseTime": "PT24H"
              }
            ],
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "CI",
              "addressLocality": "Abidjan"
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
            <span className="gradient-text">Parlons de votre projet</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Besoin d'une solution informatique ? Utilisez le formulaire ci-dessous ou contactez-nous directement. 
            Nous créerons ensemble la solution parfaite pour votre entreprise.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="card-elegant border-border">
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl flex items-center justify-center gap-3">
                    <MessageSquare className="h-8 w-8 text-primary" />
                    <span className="gradient-text">Contactez-nous</span>
                  </CardTitle>
                  <p className="text-muted-foreground text-lg">
                    Partagez-nous vos besoins, nous créerons ensemble la solution parfaite
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="fullName" className="text-base font-semibold">
                          Nom complet *
                        </Label>
                        <Input
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          required
                          className="mt-2 h-12"
                          placeholder="Votre nom complet"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-base font-semibold">
                          Email *
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="mt-2 h-12"
                          placeholder="votre@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="phone" className="text-base font-semibold">
                          Téléphone
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="mt-2 h-12"
                          placeholder="0700000000"
                        />
                      </div>
                      <div>
                        <Label htmlFor="company" className="text-base font-semibold">
                          Entreprise
                        </Label>
                        <Input
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="mt-2 h-12"
                          placeholder="Nom de votre entreprise"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="subject" className="text-base font-semibold">
                        Objet *
                      </Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="mt-2 h-12"
                        placeholder="Sujet de votre demande"
                      />
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-base font-semibold">
                        Message *
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="mt-2"
                        placeholder="Décrivez votre projet ou vos besoins en détail..."
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button type="submit" size="lg" className="flex-1 hero-glow text-lg py-6">
                        <Send className="mr-3 h-6 w-6" />
                        Envoyer le message
                      </Button>
                      <Button variant="outline" size="lg" className="flex-1 py-6" asChild>
                        <Link to="/devis">
                          <Calculator className="mr-2 h-5 w-5" />
                          Demander un devis
                        </Link>
                      </Button>
                    </div>

                    {/* WhatsApp Contact Button */}
                    <div className="pt-4 border-t border-border">
                      <WhatsAppContact />
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Info Sidebar */}
            <div className="space-y-6">
              {/* Direct Contact */}
              <Card className="card-elegant border-border">
                <CardHeader>
                  <CardTitle className="text-xl">Autres moyens de contact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <a
                      key={index}
                      href={info.action}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted transition-colors group"
                    >
                      <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <info.icon className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">{info.title}</p>
                        <p className="text-foreground">{info.value}</p>
                        <p className="text-muted-foreground text-sm">{info.description}</p>
                      </div>
                    </a>
                  ))}
                </CardContent>
              </Card>

              {/* Response Time */}
              <Card className="card-elegant border-border">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Temps de réponse
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {responseTime.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
                        <item.icon className="h-4 w-4 text-secondary-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">{item.method}</p>
                        <p className="text-muted-foreground text-sm">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Services */}
              <Card className="card-elegant border-border">
                <CardHeader>
                  <CardTitle className="text-xl">Nos Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {services.map((service, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground">{service}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-card/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="gradient-text">Questions Fréquentes</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Trouvez rapidement les réponses à vos questions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                question: "Quel est le délai pour un devis ?",
                answer: "Nous fournissons un devis détaillé sous 2-3 jours ouvrés après analyse de vos besoins."
              },
              {
                question: "Proposez-vous de la maintenance ?",
                answer: "Oui, nous offrons des contrats de maintenance 24/7 avec intervention rapide."
              },
              {
                question: "Travaillez-vous à distance ?",
                answer: "Nous proposons du support à distance et des interventions sur site selon vos besoins."
              },
              {
                question: "Quelles sont vos zones d'intervention ?",
                answer: "Nous intervenons principalement en Côte d'Ivoire et proposons du support à distance partout."
              }
            ].map((faq, index) => (
              <Card key={index} className="card-elegant border-border">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;