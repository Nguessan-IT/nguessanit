import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { PhoneInput } from "@/components/PhoneInput";
import { 
  Mail, 
  Phone, 
  Clock, 
  MessageSquare,
  MapPin,
  Send,
  CheckCircle2,
  Calculator,
  Shield,
  Globe,
  Users,
  Sparkles,
  Calendar,
  Linkedin,
  Instagram,
  Facebook,
  ArrowRight,
  Loader2
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Link, useLocation } from "react-router-dom";
import SEO from "@/components/SEO";
import WhatsAppContact from "@/components/WhatsAppContact";
import { useLanguage } from "@/contexts/LanguageContext";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Contact = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [gdprConsent, setGdprConsent] = useState(false);
  
  const contactSchema = z.object({
    fullName: z.string().trim().min(2, "Le nom doit contenir au moins 2 caractères").max(100),
    email: z.string().trim().email("Email invalide").max(255),
    phone: z.string().min(8, "Numéro de téléphone invalide").max(20),
    company: z.string().trim().max(100),
    projectType: z.string().min(1, "Veuillez sélectionner un type de projet"),
    budget: z.string().min(1, "Veuillez sélectionner un budget"),
    message: z.string().trim().min(10, "Le message doit contenir au moins 10 caractères").max(2000)
  });

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    projectType: location.state?.service || "",
    budget: "",
    message: ""
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!gdprConsent) {
      toast({
        title: "Consentement requis",
        description: "Veuillez accepter la politique de confidentialité pour continuer.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    setFormErrors({});

    try {
      contactSchema.parse(formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "✅ Message envoyé avec succès !",
        description: "Nous vous répondrons sous 48h maximum.",
      });
      
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        company: "",
        projectType: "",
        budget: "",
        message: ""
      });
      setGdprConsent(false);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            errors[err.path[0].toString()] = err.message;
          }
        });
        setFormErrors(errors);
        toast({
          title: "Erreur de validation",
          description: "Veuillez vérifier les champs du formulaire.",
          variant: "destructive"
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error for this field
    if (formErrors[e.target.name]) {
      setFormErrors({ ...formErrors, [e.target.name]: "" });
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: t('contact.form.email'),
      value: "fiacrenguessan@outlook.com",
      description: t('contact.email.desc'),
      action: "mailto:fiacrenguessan@outlook.com"
    },
    {
      icon: Phone,
      title: t('contact.form.phone'),
      value: "0777655416",
      description: t('contact.phone.desc'),
      action: "tel:+2250777655416"
    },
    {
      icon: Phone,
      title: t('contact.form.phone'),
      value: "0500401041",
      description: t('contact.phone.alt1'),
      action: "tel:+2250500401041"
    },
    {
      icon: Phone,
      title: t('contact.form.phone'),
      value: "0788624986",
      description: t('contact.phone.alt2'),
      action: "tel:+2250788624986"
    }
  ];

  const responseTime = [
    { method: t('contact.form.email'), time: t('contact.response.email'), icon: Mail },
    { method: t('contact.form.phone'), time: t('contact.response.phone'), icon: Phone },
    { method: t('nav.quote'), time: t('contact.response.quote'), icon: MessageSquare }
  ];

  const projectTypes = [
    "Développement Web & Mobile",
    "Solutions Cloud & IA",
    "Conseil & Support IT",
    "Branding & Design",
    "Formation & Accompagnement",
    "Autre"
  ];

  const budgetRanges = [
    "< 500 000 FCFA",
    "500 000 - 2 000 000 FCFA",
    "2 000 000 - 5 000 000 FCFA",
    "5 000 000 - 10 000 000 FCFA",
    "> 10 000 000 FCFA",
    "À définir"
  ];

  const whyContactUs = [
    {
      icon: Users,
      title: "Accompagnement personnalisé",
      description: "Un interlocuteur dédié pour votre projet du début à la fin"
    },
    {
      icon: Sparkles,
      title: "Solutions sur mesure",
      description: "Chaque projet est unique, nos solutions aussi"
    },
    {
      icon: Globe,
      title: "Présence internationale",
      description: "Équipes disponibles sur 3 continents pour vous servir"
    },
    {
      icon: Shield,
      title: "Confidentialité garantie",
      description: "Vos données et projets sont protégés (NDA disponible)"
    }
  ];

  const socialLinks = [
    { icon: Linkedin, url: "https://linkedin.com/company/nguessan-it", label: "LinkedIn" },
    { icon: Instagram, url: "https://instagram.com/nguessanit", label: "Instagram" },
    { icon: Facebook, url: "https://facebook.com/share/19vPLXiLwK/?mibextid=wwXIfr", label: "Facebook" },
    { icon: Globe, url: "https://www.nguessan-it.com", label: "Site web" }
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <SEO 
        title="Contactez-nous | Obtenez votre devis gratuit – Nguessan-IT"
        description="Contactez Nguessan-IT pour un devis gratuit et un accompagnement sur mesure en transformation digitale. Réponse sous 48h."
        keywords={[
          'contact nguessan-it',
          'devis gratuit',
          'accompagnement sur mesure',
          'transformation digitale',
          'réponse rapide',
          'consultation IT',
          'demande projet digital',
          'contactez expert IT'
        ]}
        canonical="https://www.nguessan-it.com/contact"
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
                "availableLanguage": ["French", "English", "Spanish", "Portuguese", "Italian"],
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
                "responseTime": "PT48H"
              }
            ],
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "CI",
              "addressLocality": "Abidjan"
            },
            "areaServed": ["Africa", "Europe", "America"]
          }
        }}
      />
      
      {/* Hero Section */}
      <section id="form" className="relative py-20 lg:py-32 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-60"></div>
        <div className="floating-elements">
          <div className="floating-orb"></div>
          <div className="floating-orb"></div>
          <div className="floating-orb"></div>
        </div>
        <div className="relative max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl font-bold mb-6 animate-fade-in">
            <span className="gradient-text">Prêt à digitaliser vos idées ?</span>
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground mb-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Discutons de votre projet et trouvons ensemble la solution technologique idéale.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Button size="lg" className="hero-glow animate-pulse" asChild>
              <a href="#contact-form">
                Demander un devis gratuit
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              asChild
            >
              <Link to="/services">
                Découvrir nos services
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section id="contact-form" className="py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <Card className="relative card-elegant border-border hover:shadow-2xl transition-all duration-500 overflow-hidden">
                {/* Background captivant avec gradient animé */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 opacity-50"></div>
                <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-primary rounded-full blur-3xl opacity-10 animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-br from-accent to-secondary rounded-full blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
                
                {/* Floating elements decoratifs */}
                <div className="absolute top-10 left-10 w-2 h-2 bg-primary rounded-full animate-pulse opacity-40"></div>
                <div className="absolute top-20 right-20 w-3 h-3 bg-accent rounded-full animate-pulse opacity-40" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute bottom-20 left-20 w-2 h-2 bg-secondary rounded-full animate-pulse opacity-40" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-10 right-10 w-3 h-3 bg-primary rounded-full animate-pulse opacity-40" style={{ animationDelay: '1.5s' }}></div>
                
                <div className="relative z-10">
                  <CardHeader className="text-center pb-8">
                    <CardTitle className="text-3xl flex items-center justify-center gap-3 mb-2">
                      <div className="relative">
                        <MessageSquare className="h-8 w-8 text-primary animate-pulse" />
                        <div className="absolute inset-0 bg-primary rounded-full blur-md opacity-30 animate-pulse"></div>
                      </div>
                      <span className="gradient-text">Formulaire de contact</span>
                    </CardTitle>
                    <p className="text-muted-foreground text-lg">
                      Remplissez ce formulaire et nous vous répondrons sous 48h maximum
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="group">
                        <Label htmlFor="fullName" className="text-base font-semibold flex items-center gap-2">
                          Nom complet <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          required
                          className={`mt-2 h-12 transition-all duration-300 hover:border-primary focus:border-primary ${formErrors.fullName ? 'border-destructive' : ''}`}
                          placeholder="Ex: Jean Dupont"
                        />
                        {formErrors.fullName && (
                          <p className="text-sm text-destructive mt-1">{formErrors.fullName}</p>
                        )}
                      </div>
                      <div className="group">
                        <Label htmlFor="email" className="text-base font-semibold flex items-center gap-2">
                          Email professionnel <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className={`mt-2 h-12 transition-all duration-300 hover:border-primary focus:border-primary ${formErrors.email ? 'border-destructive' : ''}`}
                          placeholder="votre.email@entreprise.com"
                        />
                        {formErrors.email && (
                          <p className="text-sm text-destructive mt-1">{formErrors.email}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="group">
                        <Label htmlFor="phone" className="text-base font-semibold flex items-center gap-2">
                          Téléphone <span className="text-destructive">*</span>
                        </Label>
                        <div className="mt-2">
                          <PhoneInput
                            value={formData.phone}
                            onChange={(value) => {
                              setFormData({ ...formData, phone: value });
                              if (formErrors.phone) {
                                setFormErrors({ ...formErrors, phone: "" });
                              }
                            }}
                            className={formErrors.phone ? 'border-destructive' : ''}
                            placeholder="+225 07 77 65 54 16"
                          />
                        </div>
                        {formErrors.phone && (
                          <p className="text-sm text-destructive mt-1">{formErrors.phone}</p>
                        )}
                      </div>
                      <div className="group">
                        <Label htmlFor="company" className="text-base font-semibold flex items-center gap-2">
                          Entreprise
                        </Label>
                        <Input
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className={`mt-2 h-12 transition-all duration-300 hover:border-primary focus:border-primary ${formErrors.company ? 'border-destructive' : ''}`}
                          placeholder="Ex: MonEntreprise SARL"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="group">
                        <Label htmlFor="projectType" className="text-base font-semibold flex items-center gap-2">
                          Type de projet <span className="text-destructive">*</span>
                        </Label>
                        <Select
                          value={formData.projectType}
                          onValueChange={(value) => {
                            setFormData({ ...formData, projectType: value });
                            if (formErrors.projectType) {
                              setFormErrors({ ...formErrors, projectType: "" });
                            }
                          }}
                        >
                          <SelectTrigger className={`mt-2 h-12 transition-all duration-300 hover:border-primary focus:border-primary ${formErrors.projectType ? 'border-destructive' : ''}`}>
                            <SelectValue placeholder="Sélectionnez un type" />
                          </SelectTrigger>
                          <SelectContent>
                            {projectTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {formErrors.projectType && (
                          <p className="text-sm text-destructive mt-1">{formErrors.projectType}</p>
                        )}
                      </div>
                      <div className="group">
                        <Label htmlFor="budget" className="text-base font-semibold flex items-center gap-2">
                          Budget estimé <span className="text-destructive">*</span>
                        </Label>
                        <Select
                          value={formData.budget}
                          onValueChange={(value) => {
                            setFormData({ ...formData, budget: value });
                            if (formErrors.budget) {
                              setFormErrors({ ...formErrors, budget: "" });
                            }
                          }}
                        >
                          <SelectTrigger className={`mt-2 h-12 transition-all duration-300 hover:border-primary focus:border-primary ${formErrors.budget ? 'border-destructive' : ''}`}>
                            <SelectValue placeholder="Sélectionnez une fourchette" />
                          </SelectTrigger>
                          <SelectContent>
                            {budgetRanges.map((range) => (
                              <SelectItem key={range} value={range}>
                                {range}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {formErrors.budget && (
                          <p className="text-sm text-destructive mt-1">{formErrors.budget}</p>
                        )}
                      </div>
                    </div>

                    <div className="group">
                      <Label htmlFor="message" className="text-base font-semibold flex items-center gap-2">
                        Description du besoin <span className="text-destructive">*</span>
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className={`mt-2 transition-all duration-300 hover:border-primary focus:border-primary ${formErrors.message ? 'border-destructive' : ''}`}
                        placeholder="Décrivez votre projet, vos objectifs et vos contraintes éventuelles..."
                      />
                      {formErrors.message && (
                        <p className="text-sm text-destructive mt-1">{formErrors.message}</p>
                      )}
                    </div>

                    {/* GDPR Consent */}
                    <div className="flex items-start gap-3 p-5 bg-gradient-to-r from-muted/50 to-muted/30 rounded-lg border border-border hover:border-primary/50 transition-all duration-300">
                      <Checkbox
                        id="gdpr"
                        checked={gdprConsent}
                        onCheckedChange={(checked) => setGdprConsent(checked as boolean)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <Label htmlFor="gdpr" className="text-sm font-normal cursor-pointer">
                          J'accepte que mes données soient utilisées dans le cadre de ma demande et de la relation commerciale qui peut en découler. 
                          <Link to="/privacy" className="text-primary hover:underline ml-1 transition-colors">
                            Voir la politique de confidentialité
                          </Link>
                        </Label>
                      </div>
                    </div>

                    <div className="flex flex-col gap-4 pt-2">
                      <Button 
                        type="submit" 
                        size="lg" 
                        className="w-full hero-glow text-lg py-7 relative overflow-hidden group"
                        disabled={isSubmitting}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-[shimmer_3s_linear_infinite] opacity-50"></div>
                        <span className="relative z-10 flex items-center justify-center">
                          {isSubmitting ? (
                            <>
                              <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                              Envoi en cours...
                            </>
                          ) : (
                            <>
                              <Send className="mr-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                              Envoyer ma demande 🚀
                            </>
                          )}
                        </span>
                      </Button>

                      {/* WhatsApp Contact Button */}
                      <div className="pt-4 border-t border-border/50">
                        <WhatsAppContact />
                      </div>
                      </div>
                    </form>
                  </CardContent>
                </div>
              </Card>
            </div>

            {/* Contact Info Sidebar */}
            <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              {/* Why Contact Us */}
              <Card className="card-elegant border-border hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-xl">Pourquoi nous contacter ?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {whyContactUs.map((item, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted transition-colors">
                      <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center shrink-0">
                        <item.icon className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="font-semibold mb-1">{item.title}</p>
                        <p className="text-muted-foreground text-sm">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Direct Contact */}
              <Card className="card-elegant border-border hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-xl">Contact direct</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {contactInfo.slice(0, 1).map((info, index) => (
                    <a
                      key={index}
                      href={info.action}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted transition-colors group"
                    >
                      <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shrink-0">
                        <info.icon className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">{info.title}</p>
                        <p className="text-foreground">{info.value}</p>
                        <p className="text-muted-foreground text-sm">{info.description}</p>
                      </div>
                    </a>
                  ))}
                  {contactInfo.slice(1, 2).map((info, index) => (
                    <a
                      key={index}
                      href={info.action}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted transition-colors group"
                    >
                      <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shrink-0">
                        <info.icon className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">{info.title}</p>
                        <p className="text-foreground">{info.value}</p>
                        <p className="text-muted-foreground text-sm">{info.description}</p>
                      </div>
                    </a>
                  ))}
                  
                  {/* Call Scheduling CTA */}
                  <div className="pt-4 border-t border-border">
                    <Button className="w-full" variant="outline" asChild>
                      <a href="tel:+2250777655416">
                        <Calendar className="mr-2 h-5 w-5" />
                        Planifier un appel avec un expert
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Response Time */}
              <Card className="card-elegant border-border hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    {t('contact.responseTime')}
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

              {/* Social Links */}
              <Card className="card-elegant border-border hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-xl">Suivez-nous</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-3 rounded-lg border border-border hover:bg-muted hover:border-primary transition-all duration-300 group"
                      >
                        <social.icon className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-medium">{social.label}</span>
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Contact;