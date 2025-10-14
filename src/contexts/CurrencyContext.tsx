import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';

interface CurrencyContextType {
  currency: string;
  symbol: string;
  region: string;
  isLoading: boolean;
  formatPrice: (service: string) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// Mapping des régions et devises
const CURRENCY_CONFIG = {
  EUR: { symbol: '€', regions: ['EU', 'Europe'] },
  USD: { symbol: '$', regions: ['US', 'CA', 'Americas', 'North America', 'South America'] },
  XOF: { symbol: 'FCFA', regions: ['Africa', 'West Africa'] }
};

// Pricing par région (EUR = référence)
const REGIONAL_PRICES = {
  // Développement Web uniquement - prix fixes par région
  webDev: {
    EUR: 200,
    USD: 300, // 200€ * 1.08 = 216 → arrondi au centuple supérieur
    XOF: 50000
  }
};

// API de géolocalisation
const detectUserRegion = async (): Promise<{ currency: string; region: string }> => {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    
    const { continent_code, country_code, region } = data;
    
    // Détection de la devise basée sur la région
    if (continent_code === 'EU' || ['AT', 'BE', 'CY', 'EE', 'FI', 'FR', 'DE', 'GR', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PT', 'SK', 'SI', 'ES'].includes(country_code)) {
      return { currency: 'EUR', region: 'Europe' };
    }
    
    if (continent_code === 'NA' || continent_code === 'SA') {
      return { currency: 'USD', region: 'Americas' };
    }
    
    if (continent_code === 'AF') {
      return { currency: 'XOF', region: 'Africa' };
    }
    
    // Par défaut EUR
    return { currency: 'EUR', region: 'Europe' };
  } catch (error) {
    console.error('Erreur détection région:', error);
    return { currency: 'EUR', region: 'Europe' };
  }
};

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { t } = useLanguage();
  const [currency, setCurrency] = useState('EUR');
  const [region, setRegion] = useState('Europe');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initCurrency = async () => {
      setIsLoading(true);
      const { currency: detectedCurrency, region: detectedRegion } = await detectUserRegion();
      setCurrency(detectedCurrency);
      setRegion(detectedRegion);
      setIsLoading(false);
    };

    initCurrency();
  }, []);

  const formatPrice = (service: string): string => {
    const symbol = CURRENCY_CONFIG[currency as keyof typeof CURRENCY_CONFIG].symbol;
    
    // Seul le développement web a un prix fixe, les autres sont sur mesure
    if (service === 'webDev') {
      const price = REGIONAL_PRICES.webDev[currency as keyof typeof REGIONAL_PRICES.webDev];
      
      if (currency === 'XOF') {
        return `${price.toLocaleString()} ${symbol}`;
      }
      
      return `${price}${symbol}`;
    }
    
    return t('services.customQuote');
  };

  const value: CurrencyContextType = {
    currency,
    symbol: CURRENCY_CONFIG[currency as keyof typeof CURRENCY_CONFIG]?.symbol || '€',
    region,
    isLoading,
    formatPrice
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};