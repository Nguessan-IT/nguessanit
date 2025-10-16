import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Scale, FileText, AlertCircle, CheckCircle, XCircle, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Terms = () => {
  const { t } = useLanguage();
  
  const sections = [
    {
      icon: FileText,
      title: t('terms.services.title'),
      content: [
        t('terms.services.item1'),
        t('terms.services.item2'),
        t('terms.services.item3'),
        t('terms.services.item4'),
        t('terms.services.item5')
      ]
    },
    {
      icon: CheckCircle,
      title: t('terms.commitments.title'),
      content: [
        t('terms.commitments.item1'),
        t('terms.commitments.item2'),
        t('terms.commitments.item3'),
        t('terms.commitments.item4'),
        t('terms.commitments.item5')
      ]
    },
    {
      icon: AlertCircle,
      title: t('terms.clientResponsibilities.title'),
      content: [
        t('terms.clientResponsibilities.item1'),
        t('terms.clientResponsibilities.item2'),
        t('terms.clientResponsibilities.item3'),
        t('terms.clientResponsibilities.item4'),
        t('terms.clientResponsibilities.item5')
      ]
    },
    {
      icon: XCircle,
      title: t('terms.limitations.title'),
      content: [
        t('terms.limitations.item1'),
        t('terms.limitations.item2'),
        t('terms.limitations.item3'),
        t('terms.limitations.item4'),
        t('terms.limitations.item5')
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
            <span className="gradient-text">{t('terms.title')}</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            {t('terms.subtitle')}
          </p>
          <p className="text-sm text-muted-foreground">
            {t('terms.lastUpdate')} {new Date().toLocaleDateString()}
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto">
          <Card className="card-elegant border-border mb-8">
            <CardHeader>
              <CardTitle className="text-2xl gradient-text">{t('terms.legal.title')}</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-lg max-w-none">
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <strong>{t('terms.legal.companyName')}:</strong> Nguessan-IT<br/>
                  <strong>{t('terms.legal.legalForm')}:</strong> {t('terms.legal.legalFormValue')}<br/>
                  <strong>{t('terms.legal.address')}:</strong> [Adresse à compléter]<br/>
                  <strong>{t('terms.legal.siret')}:</strong> [Numéro à compléter]<br/>
                  <strong>{t('terms.legal.email')}:</strong> contact@nguessan-it.fr<br/>
                  <strong>{t('terms.legal.phone')}:</strong> +33 (0)1 XX XX XX XX
                </p>
                <p>
                  {t('terms.legal.description')}
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
              <CardTitle className="text-2xl gradient-text">{t('terms.order.title')}</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-lg max-w-none">
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <strong>{t('terms.order.quoteLabel')}:</strong> {t('terms.order.quote')}
                </p>
                <p>
                  <strong>{t('terms.order.orderFormLabel')}:</strong> {t('terms.order.orderForm')}
                </p>
                <p>
                  <strong>{t('terms.order.modificationsLabel')}:</strong> {t('terms.order.modifications')}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="card-elegant border-border">
            <CardHeader>
              <CardTitle className="text-2xl gradient-text">{t('terms.pricing.title')}</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-lg max-w-none">
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <strong>{t('terms.pricing.ratesLabel')}:</strong> {t('terms.pricing.rates')}
                </p>
                <p>
                  <strong>{t('terms.pricing.paymentMethodsLabel')}:</strong>
                </p>
                <ul className="space-y-1 ml-4">
                  <li>• {t('terms.pricing.under500')}</li>
                  <li>• {t('terms.pricing.between500and2000')}</li>
                  <li>• {t('terms.pricing.over2000')}</li>
                </ul>
                <p>
                  <strong>{t('terms.pricing.termsLabel')}:</strong> {t('terms.pricing.terms')}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="card-elegant border-border">
            <CardHeader>
              <CardTitle className="text-2xl gradient-text">{t('terms.delivery.title')}</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-lg max-w-none">
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <strong>{t('terms.delivery.delaysLabel')}:</strong> {t('terms.delivery.delays')}
                </p>
                <p>
                  <strong>{t('terms.delivery.deliveryLabel')}:</strong> {t('terms.delivery.delivery')}
                </p>
                <p>
                  <strong>{t('terms.delivery.receptionLabel')}:</strong> {t('terms.delivery.reception')}
                </p>
                <p>
                  <strong>{t('terms.delivery.trainingLabel')}:</strong> {t('terms.delivery.training')}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="card-elegant border-border">
            <CardHeader>
              <CardTitle className="text-2xl gradient-text">{t('terms.warranty.title')}</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-lg max-w-none">
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <strong>{t('terms.warranty.warrantyLabel')}:</strong> {t('terms.warranty.warranty')}
                </p>
                <p>
                  <strong>{t('terms.warranty.supportLabel')}:</strong>
                </p>
                <ul className="space-y-1 ml-4">
                  <li>• {t('terms.warranty.included')}</li>
                  <li>• {t('terms.warranty.hours')}</li>
                  <li>• {t('terms.warranty.means')}</li>
                </ul>
                <p>
                  <strong>{t('terms.warranty.maintenanceLabel')}:</strong> {t('terms.warranty.maintenance')}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="card-elegant border-border">
            <CardHeader>
              <CardTitle className="text-2xl gradient-text">{t('terms.ip.title')}</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-lg max-w-none">
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <strong>{t('terms.ip.developmentLabel')}:</strong> {t('terms.ip.development')}
                </p>
                <p>
                  <strong>{t('terms.ip.toolsLabel')}:</strong> {t('terms.ip.tools')}
                </p>
                <p>
                  <strong>{t('terms.ip.dataLabel')}:</strong> {t('terms.ip.data')}
                </p>
                <p>
                  <strong>{t('terms.ip.thirdPartyLabel')}:</strong> {t('terms.ip.thirdParty')}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="card-elegant border-border">
            <CardHeader>
              <CardTitle className="text-2xl gradient-text">{t('terms.termination.title')}</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-lg max-w-none">
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <strong>{t('terms.termination.terminationLabel')}:</strong> {t('terms.termination.termination')}
                </p>
                <p>
                  <strong>{t('terms.termination.lawLabel')}:</strong> {t('terms.termination.law')}
                </p>
                <p>
                  <strong>{t('terms.termination.mediationLabel')}:</strong> {t('terms.termination.mediation')}
                </p>
                <p>
                  <strong>{t('terms.termination.nullityLabel')}:</strong> {t('terms.termination.nullity')}
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
                {t('terms.contact.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <p className="text-muted-foreground">
                  {t('terms.contact.description')}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">{t('terms.contact.email')}</p>
                      <p className="text-muted-foreground">contact@nguessan-it.fr</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">{t('terms.contact.quote')}</p>
                      <p className="text-muted-foreground">{t('terms.contact.response')}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild>
                    <Link to="/contact">{t('terms.contact.contactUs')}</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/devis">{t('terms.contact.getQuote')}</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/politique-confidentialite">{t('terms.contact.privacy')}</Link>
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