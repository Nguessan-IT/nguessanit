import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { PhoneInput } from "@/components/PhoneInput";
import { 
  Calculator, 
  Clock, 
  CheckCircle2, 
  Star,
  Code,
  Server,
  Shield,
  Headphones,
  Send,
  Sparkles,
  ArrowRight,
  Zap
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";

const Quote = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    projectType: "",
    budget: "",
    timeline: "",
    description: "",
    services: [] as string[],
    urgency: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: t('quote.toast.success'),
      description: t('quote.toast.description'),
    });
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      company: "",
      projectType: "",
      budget: "",
      timeline: "",
      description: "",
      services: [],
      urgency: ""
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleServiceChange = (service: string, checked: boolean) => {
    setFormData({
      ...formData,
      services: checked 
        ? [...formData.services, service]
        : formData.services.filter(s => s !== service)
    });
  };

  const services = [
    { id: "web", label: t('services.web.title'), icon: Code, desc: t('services.web.description') },
    { id: "maintenance", label: t('services.maintenance.title'), icon: Server, desc: t('services.maintenance.description') },
    { id: "cloud", label: t('services.cloud.title'), icon: Shield, desc: t('services.cloud.description') },
    { id: "formation", label: t('services.training.title'), icon: Headphones, desc: t('services.training.description') }
  ];

  const features = [
    t('quote.feature1'),
    t('quote.feature2'),
    t('quote.feature3'),
    t('quote.feature4'),
    t('quote.feature5'),
    t('quote.feature6')
  ];

  const testimonials = [
    { 
      name: "Sarah M.", 
      company: "TechCorp", 
      text: "Service exceptionnel ! Notre site e-commerce a dépassé nos attentes.", 
      rating: 5 
    },
    { 
      name: "David L.", 
      company: "Startup Innovante", 
      text: "Support réactif et expertise technique remarquable. Très satisfait !", 
      rating: 5 
    }
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <SEO 
        title="Devis Gratuit - Solutions Informatiques Sur Mesure"
        description="Obtenez votre devis gratuit personnalisé pour vos projets informatiques. Développement web, maintenance IT, solutions cloud. Réponse sous 24-48h garantie. Abidjan, Côte d'Ivoire."
        keywords={[
          'devis informatique gratuit',
          'devis développement web côte d\'ivoire',
          'devis maintenance informatique',
          'devis solutions cloud',
          'prix services informatiques abidjan',
          'tarif développement web',
          'estimation projet IT',
          'consultant informatique devis'
        ]}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Devis Informatique Gratuit",
          "description": "Service de devis gratuit pour projets informatiques en Côte d'Ivoire",
          "provider": {
            "@type": "Organization",
            "name": "Nguessan-IT"
          },
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "EUR",
            "description": "Devis gratuit et personnalisé"
          },
          "areaServed": {
            "@type": "Country",
            "name": "Côte d'Ivoire"
          },
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Services Disponibles",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Développement Web"
                }
              },
              {
                "@type": "Offer", 
                "itemOffered": {
                  "@type": "Service",
                  "name": "Maintenance Informatique"
                }
              }
            ]
          }
        }}
      />
      
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-60"></div>
        <div className="floating-elements">
          <div className="floating-orb"></div>
          <div className="floating-orb"></div>
          <div className="floating-orb"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-6 w-6 text-primary animate-pulse" />
            <span className="text-primary font-semibold">{t('quote.free')}</span>
            <Sparkles className="h-6 w-6 text-primary animate-pulse" />
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="gradient-text">{t('quote.title')}</span>
            <br />
            <span className="text-foreground">{t('quote.subtitle')}</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            {t('quote.description')} 
            <strong className="text-foreground"> {t('quote.response')}</strong> {t('quote.withSolutions')}
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {features.slice(0, 3).map((feature, index) => (
              <div key={index} className="flex items-center gap-2 bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full border border-border">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <Card className="card-elegant border-border">
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl flex items-center justify-center gap-3">
                    <Calculator className="h-8 w-8 text-primary" />
                    <span className="gradient-text">{t('quote.form.title')}</span>
                  </CardTitle>
                  <p className="text-muted-foreground text-lg">
                    {t('quote.form.subtitle')}
                  </p>
                </CardHeader>
                
                <CardContent className="space-y-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="fullName" className="text-base font-semibold flex items-center gap-2">
                          {t('quote.form.fullName')} {t('contact.form.required')}
                        </Label>
                        <Input
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          required
                          className="mt-2 h-12"
                          placeholder={t('quote.form.placeholder.name')}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-base font-semibold">
                          {t('quote.form.email')} {t('contact.form.required')}
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="mt-2 h-12"
                          placeholder={t('quote.form.placeholder.email')}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="phone" className="text-base font-semibold">
                          {t('quote.form.phone')} {t('contact.form.required')}
                        </Label>
                        <div className="mt-2">
                          <PhoneInput
                            value={formData.phone}
                            onChange={(value) => setFormData({ ...formData, phone: value })}
                            placeholder="+225 07 77 65 54 16"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="company" className="text-base font-semibold">
                          {t('quote.form.company')} {t('contact.form.required')}
                        </Label>
                        <Input
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          required
                          className="mt-2 h-12"
                          placeholder={t('quote.form.placeholder.company')}
                        />
                      </div>
                    </div>

                    {/* Project Details */}
                    <div className="space-y-6 p-6 bg-card/50 rounded-lg border border-border">
                      <h3 className="text-xl font-semibold flex items-center gap-2">
                        <Zap className="h-5 w-5 text-primary" />
                        {t('quote.form.projectDetails')}
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label className="text-base font-semibold">{t('quote.form.projectType')} {t('contact.form.required')}</Label>
                          <Select value={formData.projectType} onValueChange={(value) => setFormData({...formData, projectType: value})}>
                            <SelectTrigger className="mt-2 h-12">
                              <SelectValue placeholder={t('quote.form.placeholder.projectType')} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="website">Site Web Vitrine</SelectItem>
                              <SelectItem value="landingpage">Landing Page</SelectItem>
                              <SelectItem value="ecommerce">Boutique E-commerce</SelectItem>
                              <SelectItem value="webapp">Application Web</SelectItem>
                              <SelectItem value="logo">Logo & Identité Visuelle</SelectItem>
                              <SelectItem value="branding">Branding Digital</SelectItem>
                              <SelectItem value="document">Document Interactif</SelectItem>
                              <SelectItem value="report">Rapport Dynamique</SelectItem>
                              <SelectItem value="portfolio">Portfolio Digital</SelectItem>
                              <SelectItem value="experience">Expérience Immersive</SelectItem>
                              <SelectItem value="ios">Application iOS</SelectItem>
                              <SelectItem value="android">Application Android</SelectItem>
                              <SelectItem value="responsive">Design Adaptatif</SelectItem>
                              <SelectItem value="maintenance">Maintenance IT</SelectItem>
                              <SelectItem value="cloud">Solution Cloud</SelectItem>
                              <SelectItem value="formation">Formation</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label className="text-base font-semibold">{t('quote.form.budget')}</Label>
                          <Select value={formData.budget} onValueChange={(value) => setFormData({...formData, budget: value})}>
                            <SelectTrigger className="mt-2 h-12">
                              <SelectValue placeholder={t('quote.form.placeholder.budget')} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="500-1500">500€ - 1 500€</SelectItem>
                              <SelectItem value="1500-5000">1 500€ - 5 000€</SelectItem>
                              <SelectItem value="5000-15000">5 000€ - 15 000€</SelectItem>
                              <SelectItem value="15000+">Plus de 15 000€</SelectItem>
                              <SelectItem value="discuss">À discuter</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label className="text-base font-semibold">{t('quote.form.timeline')}</Label>
                          <Select value={formData.timeline} onValueChange={(value) => setFormData({...formData, timeline: value})}>
                            <SelectTrigger className="mt-2 h-12">
                              <SelectValue placeholder={t('quote.form.placeholder.timeline')} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="urgent">Urgent (1-2 semaines)</SelectItem>
                              <SelectItem value="month">1 mois</SelectItem>
                              <SelectItem value="quarter">2-3 mois</SelectItem>
                              <SelectItem value="flexible">Flexible</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label className="text-base font-semibold">{t('quote.form.urgency')}</Label>
                          <Select value={formData.urgency} onValueChange={(value) => setFormData({...formData, urgency: value})}>
                            <SelectTrigger className="mt-2 h-12">
                              <SelectValue placeholder={t('quote.form.placeholder.urgency')} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Standard</SelectItem>
                              <SelectItem value="medium">Prioritaire</SelectItem>
                              <SelectItem value="high">Très urgent</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    {/* Services Selection */}
                    <div className="space-y-4">
                      <Label className="text-lg font-semibold">{t('quote.form.services')}</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {services.map((service) => (
                          <div key={service.id} className="flex items-start space-x-3 p-4 border border-border rounded-lg hover:bg-muted transition-colors">
                            <Checkbox
                              id={service.id}
                              checked={formData.services.includes(service.id)}
                              onCheckedChange={(checked) => handleServiceChange(service.id, checked as boolean)}
                              className="mt-1"
                            />
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <service.icon className="h-5 w-5 text-primary" />
                                <Label htmlFor={service.id} className="font-semibold cursor-pointer">
                                  {service.label}
                                </Label>
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">{service.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Project Description */}
                    <div>
                      <Label htmlFor="description" className="text-base font-semibold">
                        {t('quote.form.description')} {t('contact.form.required')}
                      </Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="mt-2"
                        placeholder={t('quote.form.placeholder.description')}
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full hero-glow text-lg py-6">
                      <Send className="mr-3 h-6 w-6" />
                      {t('quote.form.submit')}
                      <ArrowRight className="ml-3 h-6 w-6" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Why Choose Us */}
              <Card className="card-elegant border-border">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Star className="h-6 w-6 text-primary" />
                    Pourquoi nous choisir ?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Process Timeline */}
              <Card className="card-elegant border-border">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Clock className="h-6 w-6 text-primary" />
                    Notre Processus
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { step: "1", title: "Réception", time: "Immédiat", desc: "Confirmation de réception" },
                    { step: "2", title: "Analyse", time: "24h", desc: "Étude de vos besoins" },
                    { step: "3", title: "Devis", time: "48h", desc: "Proposition détaillée" },
                    { step: "4", title: "Échange", time: "Sur RDV", desc: "Discussion du projet" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm flex-shrink-0">
                        {item.step}
                      </div>
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-primary text-sm font-semibold">{item.time}</p>
                        <p className="text-muted-foreground text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Testimonials */}
              <Card className="card-elegant border-border">
                <CardHeader>
                  <CardTitle className="text-xl">Ils nous font confiance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {testimonials.map((testimonial, index) => (
                    <div key={index} className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex gap-1 mb-2">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">"{testimonial.text}"</p>
                      <p className="font-semibold text-sm">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.company}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-16 bg-card/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            <span className="gradient-text">Besoin d'échanger avant ?</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Vous préférez discuter directement ? Contactez-nous par téléphone ou email
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" size="lg" asChild>
              <a href="tel:+2250777655416">📞 0777655416</a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="mailto:fiacrenguessan@outlook.com">✉️ fiacrenguessan@outlook.com</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Quote;