import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar, MessageCircle, Phone, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CallRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceTitle?: string;
}

const CallRequestModal = ({ isOpen, onClose, serviceTitle }: CallRequestModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    preferredTime: "",
    preferredDate: "",
    timezone: "",
    callType: "",
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
    
    // Construire le message WhatsApp formaté pour demande d'appel
    const whatsappMessage = `
📞 *DEMANDE D'APPEL DEPUIS LE SITE NGUESSAN-IT* 📞

${serviceTitle ? `🔵 *Service concerné:* ${serviceTitle}\n` : ''}
👤 *Informations de contact:*
• Nom: ${formData.fullName}
• Email: ${formData.email}
• Téléphone: ${formData.phone}
• Entreprise: ${formData.company || "Non spécifié"}

⏰ *Préférences pour l'appel:*
• Date souhaitée: ${formData.preferredDate || "À convenir"}
• Heure souhaitée: ${formData.preferredTime || "À convenir"}
• Fuseau horaire: ${formData.timezone || "À confirmer"}
• Type d'appel: ${formData.callType || "À discuter"}

📝 *Message/Contexte:*
${formData.message}

---
✅ Demande générée depuis nguessan-it.com
📅 Merci de me confirmer le créneau pour notre appel !
    `.trim();

    // Encoder le message pour l'URL WhatsApp
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappNumber = "2250777655416";
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Ouvrir WhatsApp
    window.open(whatsappURL, '_blank');
    
    // Fermer le modal et réinitialiser le formulaire
    onClose();
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      company: "",
      preferredTime: "",
      preferredDate: "",
      timezone: "",
      callType: "",
      message: ""
    });

    toast({
      title: "Demande d'appel envoyée",
      description: "Votre demande a été préparée sur WhatsApp. Envoyez le message pour finaliser !",
    });
  };

  const isFormValid = formData.fullName && formData.email && formData.phone && formData.message;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-3">
            <Phone className="h-8 w-8 text-primary" />
            <span className="gradient-text">Planifier un appel</span>
          </DialogTitle>
          <p className="text-muted-foreground">
            Programmez un appel gratuit avec notre équipe d'experts
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          {/* Informations personnelles */}
          <div className="space-y-4 p-4 bg-card/50 rounded-lg border border-border">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Informations de contact
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="call-fullName" className="text-base font-semibold">
                  Nom complet *
                </Label>
                <Input
                  id="call-fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="mt-2 h-12"
                  placeholder="Votre nom et prénom"
                />
              </div>
              <div>
                <Label htmlFor="call-email" className="text-base font-semibold">
                  Email *
                </Label>
                <Input
                  id="call-email"
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="call-phone" className="text-base font-semibold">
                  Téléphone *
                </Label>
                <Input
                  id="call-phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="mt-2 h-12"
                  placeholder="+225 0700000000"
                />
              </div>
              <div>
                <Label htmlFor="call-company" className="text-base font-semibold">
                  Entreprise
                </Label>
                <Input
                  id="call-company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="mt-2 h-12"
                  placeholder="Nom de votre entreprise"
                />
              </div>
            </div>
          </div>

          {/* Préférences d'appel */}
          <div className="space-y-4 p-4 bg-card/50 rounded-lg border border-border">
            <h3 className="font-semibold text-lg">Préférences pour l'appel</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="call-date" className="text-base font-semibold">
                  Date préférée
                </Label>
                <Input
                  id="call-date"
                  name="preferredDate"
                  type="date"
                  value={formData.preferredDate}
                  onChange={handleChange}
                  className="mt-2 h-12"
                />
              </div>
              
              <div>
                <Label className="text-base font-semibold">Heure préférée</Label>
                <Select value={formData.preferredTime} onValueChange={(value) => setFormData({...formData, preferredTime: value})}>
                  <SelectTrigger className="mt-2 h-12">
                    <SelectValue placeholder="Choisir l'heure" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="08:00-10:00">08h00 - 10h00</SelectItem>
                    <SelectItem value="10:00-12:00">10h00 - 12h00</SelectItem>
                    <SelectItem value="14:00-16:00">14h00 - 16h00</SelectItem>
                    <SelectItem value="16:00-18:00">16h00 - 18h00</SelectItem>
                    <SelectItem value="flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="text-base font-semibold">Fuseau horaire</Label>
                <Select value={formData.timezone} onValueChange={(value) => setFormData({...formData, timezone: value})}>
                  <SelectTrigger className="mt-2 h-12">
                    <SelectValue placeholder="Votre fuseau" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GMT">GMT (Côte d'Ivoire)</SelectItem>
                    <SelectItem value="CET">CET (Europe Centrale)</SelectItem>
                    <SelectItem value="EST">EST (Amérique de l'Est)</SelectItem>
                    <SelectItem value="PST">PST (Amérique de l'Ouest)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label className="text-base font-semibold">Type d'appel</Label>
              <Select value={formData.callType} onValueChange={(value) => setFormData({...formData, callType: value})}>
                <SelectTrigger className="mt-2 h-12">
                  <SelectValue placeholder="Sélectionnez le type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="consultation">Consultation gratuite</SelectItem>
                  <SelectItem value="audit">Audit technique</SelectItem>
                  <SelectItem value="demonstration">Démonstration</SelectItem>
                  <SelectItem value="strategy">Discussion stratégique</SelectItem>
                  <SelectItem value="support">Support technique</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Message */}
          <div>
            <Label htmlFor="call-message" className="text-base font-semibold">
              Contexte de l'appel *
            </Label>
            <Textarea
              id="call-message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              className="mt-2"
              placeholder="Décrivez brièvement l'objet de l'appel et vos besoins..."
            />
          </div>

          <div className="flex gap-4 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              className="flex-1"
            >
              Annuler
            </Button>
            <Button 
              type="submit" 
              disabled={!isFormValid}
              className="flex-1 bg-primary hover:bg-primary/90 gap-2"
            >
              <MessageCircle className="h-4 w-4" />
              Envoyer la demande
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CallRequestModal;