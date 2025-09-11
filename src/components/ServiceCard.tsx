import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ArrowRight, LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useCurrency } from "@/contexts/CurrencyContext";

interface ServiceCardProps {
  service: {
    icon: LucideIcon;
    title: string;
    serviceKey: string;
    description: string;
    features: string[];
    technologies: string[];
    color: string;
  };
  index: number;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, index }) => {
  const { formatPrice, isLoading } = useCurrency();

  const getPriceDisplay = () => {
    const priceInfo = formatPrice(service.serviceKey);
    
    if (priceInfo === "Devis sur mesure") {
      return priceInfo;
    }
    
    return `À partir de ${priceInfo}`;
  };

  return (
    <Card className="card-elegant border-border hover-glow hover-3d transition-all duration-500 group">
      <CardHeader>
        <div className="flex items-center gap-4 mb-4">
          <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-2xl`}>
            <service.icon className="h-8 w-8 text-white drop-shadow-lg" />
          </div>
          <div>
            <CardTitle className="text-2xl">{service.title}</CardTitle>
            <p className="text-primary font-semibold text-lg">
              {isLoading ? "Chargement..." : getPriceDisplay()}
            </p>
          </div>
        </div>
        <p className="text-muted-foreground">{service.description}</p>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold mb-3">Fonctionnalités incluses :</h4>
            <ul className="space-y-2">
              {service.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3">Technologies :</h4>
            <div className="flex flex-wrap gap-2">
              {service.technologies.map((tech, idx) => (
                <Badge key={idx} variant="secondary">{tech}</Badge>
              ))}
            </div>
          </div>
          
          <Button className="w-full" asChild>
            <Link to="/devis">
              Demander un devis
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};