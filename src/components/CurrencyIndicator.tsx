import { Badge } from "@/components/ui/badge";
import { MapPin, Loader2 } from "lucide-react";
import { useCurrency } from "@/contexts/CurrencyContext";

export const CurrencyIndicator = () => {
  const { currency, region, isLoading } = useCurrency();

  if (isLoading) {
    return (
      <Badge variant="outline" className="gap-2">
        <Loader2 className="h-3 w-3 animate-spin" />
        Détection...
      </Badge>
    );
  }

  return (
    <Badge variant="outline" className="gap-2">
      <MapPin className="h-3 w-3" />
      {region} • {currency}
    </Badge>
  );
};