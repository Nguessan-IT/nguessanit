import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Eye, Lock, Database, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Privacy = () => {
  const { t } = useLanguage();
  
  const sections = [
    {
      icon: Database,
      title: t('privacy.dataCollection.title'),
      content: [
        t('privacy.dataCollection.item1'),
        t('privacy.dataCollection.item2'),
        t('privacy.dataCollection.item3'),
        t('privacy.dataCollection.item4')
      ]
    },
    {
      icon: Eye,
      title: t('privacy.dataUsage.title'),
      content: [
        t('privacy.dataUsage.item1'),
        t('privacy.dataUsage.item2'),
        t('privacy.dataUsage.item3'),
        t('privacy.dataUsage.item4')
      ]
    },
    {
      icon: Lock,
      title: t('privacy.dataProtection.title'),
      content: [
        t('privacy.dataProtection.item1'),
        t('privacy.dataProtection.item2'),
        t('privacy.dataProtection.item3'),
        t('privacy.dataProtection.item4')
      ]
    },
    {
      icon: Shield,
      title: t('privacy.rights.title'),
      content: [
        t('privacy.rights.item1'),
        t('privacy.rights.item2'),
        t('privacy.rights.item3'),
        t('privacy.rights.item4')
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
            <span className="gradient-text">{t('privacy.title')}</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            {t('privacy.subtitle')}
          </p>
          <p className="text-sm text-muted-foreground">
            {t('privacy.lastUpdate')} {new Date().toLocaleDateString()}
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto">
          <Card className="card-elegant border-border mb-8">
            <CardHeader>
              <CardTitle className="text-2xl gradient-text">{t('privacy.intro.title')}</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-lg max-w-none">
              <p className="text-muted-foreground">
                {t('privacy.intro.text1')}
              </p>
              <p className="text-muted-foreground">
                {t('privacy.intro.text2')}
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
              <CardTitle className="text-2xl gradient-text">{t('privacy.legalBasis.title')}</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-lg max-w-none">
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <strong>Exécution contractuelle :</strong> {t('privacy.legalBasis.contractual')}
                </p>
                <p>
                  <strong>Intérêt légitime :</strong> {t('privacy.legalBasis.legitimate')}
                </p>
                <p>
                  <strong>Consentement :</strong> {t('privacy.legalBasis.consent')}
                </p>
                <p>
                  <strong>Obligation légale :</strong> {t('privacy.legalBasis.legal')}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="card-elegant border-border">
            <CardHeader>
              <CardTitle className="text-2xl gradient-text">{t('privacy.retention.title')}</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-lg max-w-none">
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <strong>Clients actifs :</strong> {t('privacy.retention.clients')}
                </p>
                <p>
                  <strong>Prospects :</strong> {t('privacy.retention.prospects')}
                </p>
                <p>
                  <strong>Données techniques :</strong> {t('privacy.retention.technical')}
                </p>
                <p>
                  <strong>Cookies :</strong> {t('privacy.retention.cookies')}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="card-elegant border-border">
            <CardHeader>
              <CardTitle className="text-2xl gradient-text">{t('privacy.sharing.title')}</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-lg max-w-none">
              <div className="space-y-4 text-muted-foreground">
                <p>
                  {t('privacy.sharing.intro')}
                </p>
                <ul className="space-y-2 ml-4">
                  <li>• <strong>Sous-traitants techniques :</strong> {t('privacy.sharing.subcontractors')}</li>
                  <li>• <strong>Partenaires commerciaux :</strong> {t('privacy.sharing.partners')}</li>
                  <li>• <strong>Autorités compétentes :</strong> {t('privacy.sharing.authorities')}</li>
                </ul>
                <p>
                  {t('privacy.sharing.location')}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="card-elegant border-border">
            <CardHeader>
              <CardTitle className="text-2xl gradient-text">{t('privacy.security.title')}</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-lg max-w-none">
              <div className="space-y-4 text-muted-foreground">
                <p>
                  {t('privacy.security.intro')}
                </p>
                <ul className="space-y-2 ml-4">
                  <li>• <strong>Chiffrement :</strong> {t('privacy.security.encryption')}</li>
                  <li>• <strong>Accès :</strong> {t('privacy.security.access')}</li>
                  <li>• <strong>Surveillance :</strong> {t('privacy.security.monitoring')}</li>
                  <li>• <strong>Formation :</strong> {t('privacy.security.training')}</li>
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
                {t('privacy.contact.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <p className="text-muted-foreground">
                  {t('privacy.contact.description')}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">{t('privacy.contact.email')}</p>
                      <p className="text-muted-foreground">contact@nguessan-it.fr</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">{t('privacy.contact.phone')}</p>
                      <p className="text-muted-foreground">+33 (0)1 XX XX XX XX</p>
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground">
                  {t('privacy.contact.response')}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild>
                    <Link to="/contact">{t('privacy.contact.contactUs')}</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/conditions">{t('privacy.contact.terms')}</Link>
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