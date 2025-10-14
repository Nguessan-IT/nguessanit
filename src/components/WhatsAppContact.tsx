import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MessageCircle, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const WhatsAppContact = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    projectType: "",
    budget: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construire le message WhatsApp formaté
    const whatsappMessage = `
🌟 *CONTACT DEPUIS LE SITE NGUESSAN-IT* 🌟

👤 *Informations personnelles:*
• Nom: ${formData.fullName}
• Email: ${formData.email}
• Téléphone: ${formData.phone}
• Entreprise: ${formData.company || "Non spécifié"}

💼 *Détails du projet:*
• Type de projet: ${formData.projectType || "Non spécifié"}
• Budget approximatif: ${formData.budget || "À discuter"}

📝 *Message:*
${formData.message}

---
✅ Formulaire complété depuis nguessan-it.com
⏰ Merci de me recontacter pour discuter de ce projet !
    `.trim();

    // Encoder le message pour l'URL WhatsApp
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappNumber = "2250777655416";
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Ouvrir WhatsApp
    window.open(whatsappURL, '_blank');
    
    // Fermer le modal et réinitialiser le formulaire
    setIsOpen(false);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      company: "",
      projectType: "",
      budget: "",
      message: ""
    });

    toast({
      title: t('whatsapp.toast.title'),
      description: t('whatsapp.toast.description'),
    });
  };

  const isFormValid = formData.fullName && formData.email && formData.phone && formData.message;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          className="w-full bg-green-600 hover:bg-green-700 text-white gap-2 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <MessageCircle className="h-6 w-6" />
          {t('whatsapp.button')}
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-3">
            <MessageCircle className="h-8 w-8 text-green-600" />
            <span className="gradient-text">{t('whatsapp.title')}</span>
          </DialogTitle>
          <p className="text-muted-foreground">
            {t('whatsapp.subtitle')}
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          {/* Informations personnelles */}
          <div className="space-y-4 p-4 bg-card/50 rounded-lg border border-border">
            <h3 className="font-semibold text-lg">{t('whatsapp.personalInfo')}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="whatsapp-fullName" className="text-base font-semibold">
                  {t('whatsapp.fullName')} *
                </Label>
                <Input
                  id="whatsapp-fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="mt-2 h-12"
                  placeholder={t('whatsapp.fullName.placeholder')}
                />
              </div>
              <div>
                <Label htmlFor="whatsapp-email" className="text-base font-semibold">
                  {t('whatsapp.email')} *
                </Label>
                <Input
                  id="whatsapp-email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-2 h-12"
                  placeholder={t('whatsapp.email.placeholder')}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="whatsapp-phone" className="text-base font-semibold">
                  {t('whatsapp.phone')} *
                </Label>
                <Input
                  id="whatsapp-phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="mt-2 h-12"
                  placeholder={t('whatsapp.phone.placeholder')}
                />
              </div>
              <div>
                <Label htmlFor="whatsapp-company" className="text-base font-semibold">
                  {t('whatsapp.company')}
                </Label>
                <Input
                  id="whatsapp-company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="mt-2 h-12"
                  placeholder={t('whatsapp.company.placeholder')}
                />
              </div>
            </div>
          </div>

          {/* Détails du projet */}
          <div className="space-y-4 p-4 bg-card/50 rounded-lg border border-border">
            <h3 className="font-semibold text-lg">{t('whatsapp.projectDetails')}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-base font-semibold">{t('whatsapp.projectType')}</Label>
                <Select value={formData.projectType} onValueChange={(value) => setFormData({...formData, projectType: value})}>
                  <SelectTrigger className="mt-2 h-12">
                    <SelectValue placeholder={t('whatsapp.projectType.placeholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="website">{t('whatsapp.projectType.website')}</SelectItem>
                    <SelectItem value="ecommerce">{t('whatsapp.projectType.ecommerce')}</SelectItem>
                    <SelectItem value="webapp">{t('whatsapp.projectType.webapp')}</SelectItem>
                    <SelectItem value="maintenance">{t('whatsapp.projectType.maintenance')}</SelectItem>
                    <SelectItem value="cloud">{t('whatsapp.projectType.cloud')}</SelectItem>
                    <SelectItem value="formation">{t('whatsapp.projectType.training')}</SelectItem>
                    <SelectItem value="autre">{t('whatsapp.projectType.other')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="text-base font-semibold">{t('whatsapp.budget')}</Label>
                <Select value={formData.budget} onValueChange={(value) => setFormData({...formData, budget: value})}>
                  <SelectTrigger className="mt-2 h-12">
                    <SelectValue placeholder={t('whatsapp.budget.placeholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="500-1500">500€ - 1 500€</SelectItem>
                    <SelectItem value="1500-5000">1 500€ - 5 000€</SelectItem>
                    <SelectItem value="5000-15000">5 000€ - 15 000€</SelectItem>
                    <SelectItem value="15000+">15 000€+</SelectItem>
                    <SelectItem value="discuss">{t('whatsapp.budget.discuss')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Message */}
          <div>
            <Label htmlFor="whatsapp-message" className="text-base font-semibold">
              {t('whatsapp.message')} *
            </Label>
            <Textarea
              id="whatsapp-message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              className="mt-2"
              placeholder={t('whatsapp.message.placeholder')}
            />
          </div>

          <div className="flex gap-4 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsOpen(false)}
              className="flex-1"
            >
              {t('whatsapp.cancel')}
            </Button>
            <Button 
              type="submit" 
              disabled={!isFormValid}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white gap-2"
            >
              <Send className="h-4 w-4" />
              {t('whatsapp.submit')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default WhatsAppContact;