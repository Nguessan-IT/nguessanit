import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'service';
  structuredData?: any;
  noIndex?: boolean;
  canonical?: string;
  ogType?: 'website' | 'article' | 'product' | 'business.business';
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
}

const SEO = ({ 
  title, 
  description, 
  keywords = [], 
  image = '/src/assets/og-image.jpg',
  url,
  type = 'website',
  structuredData,
  noIndex = false,
  canonical,
  ogType = 'business.business',
  twitterCard = 'summary_large_image'
}: SEOProps) => {
  const { language } = useLanguage();
  
  // Base SEO configuration
  const baseTitle = language === 'fr' 
    ? "Nguessan-IT - Solutions Informatiques Professionnelles en Côte d'Ivoire"
    : "Nguessan-IT - Professional IT Solutions in Ivory Coast";
    
  const baseDescription = language === 'fr'
    ? "Expert en solutions informatiques en Côte d'Ivoire : développement web, maintenance IT, solutions cloud, formation. Plus de 8 ans d'expérience. Devis gratuit sous 24h."
    : "IT solutions expert in Ivory Coast: web development, IT maintenance, cloud solutions, training. Over 8 years experience. Free quote within 24h.";

  const baseKeywords = language === 'fr' ? [
    'informatique Côte d\'Ivoire',
    'développement web Abidjan',
    'maintenance informatique CI',
    'solutions cloud Afrique',
    'formation informatique',
    'support technique 24/7',
    'Nguessan-IT',
    'expert IT Abidjan',
    'transformation digitale',
    'cybersécurité',
    'infrastructure réseau',
    'développeur React Vue.js',
    'consultant IT',
    'services informatiques professionnels'
  ] : [
    'IT services Ivory Coast',
    'web development Abidjan',
    'IT maintenance CI',
    'cloud solutions Africa',
    'computer training',
    '24/7 technical support',
    'Nguessan-IT',
    'IT expert Abidjan',
    'digital transformation',
    'cybersecurity',
    'network infrastructure',
    'React Vue.js developer',
    'IT consultant',
    'professional IT services'
  ];

  const finalTitle = title ? `${title} | ${baseTitle}` : baseTitle;
  const finalDescription = description || baseDescription;
  const finalKeywords = [...new Set([...baseKeywords, ...keywords])];
  const currentUrl = url || window.location.href;
  const canonicalUrl = canonical || currentUrl;

  // Default structured data for the organization
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Nguessan-IT",
    "description": finalDescription,
    "url": "https://nguessan-it.lovable.app",
    "logo": {
      "@type": "ImageObject",
      "url": `${window.location.origin}${image}`,
      "width": 512,
      "height": 512,
      "alternateName": "Logo Nguessan-IT expert informatique Côte d'Ivoire",
      "description": "Logo officiel de Nguessan-IT, société experte en solutions informatiques en Côte d'Ivoire : développement web, maintenance IT, solutions cloud et formation professionnelle"
    },
    "contactPoint": [{
      "@type": "ContactPoint",
      "telephone": "+225-XX-XX-XX-XX",
      "contactType": "customer service",
      "availableLanguage": ["French", "English"],
      "areaServed": ["CI", "Africa", "Worldwide"]
    }],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "CI",
      "addressLocality": "Abidjan",
      "addressRegion": "Côte d'Ivoire"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 5.3364,
      "longitude": -4.0267
    },
    "areaServed": [
      {
        "@type": "Country",
        "name": "Côte d'Ivoire"
      },
      {
        "@type": "Continent", 
        "name": "Africa"
      }
    ],
    "serviceType": [
      "Web Development",
      "IT Maintenance", 
      "Cloud Solutions",
      "IT Training",
      "Technical Support",
      "Digital Branding",
      "Interactive Documents"
    ],
    "priceRange": "€€",
    "foundingDate": "2016",
    "employees": {
      "@type": "QuantitativeValue",
      "value": "1-10"
    }
  };

  // Local business structured data
  const localBusinessData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Nguessan-IT", 
    "description": finalDescription,
    "image": `${window.location.origin}${image}`,
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "CI",
      "addressLocality": "Abidjan", 
      "addressRegion": "Côte d'Ivoire"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 5.3364,
      "longitude": -4.0267
    },
    "url": currentUrl,
    "telephone": "+225-XX-XX-XX-XX",
    "priceRange": "€€",
    "openingHours": "Mo-Fr 08:00-18:00",
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 5.3364,
        "longitude": -4.0267
      },
      "geoRadius": "100000"
    }
  };

  // Professional service structured data
  const professionalServiceData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Nguessan-IT",
    "description": finalDescription,
    "provider": {
      "@type": "Organization",
      "name": "Nguessan-IT"
    },
    "areaServed": ["CI", "Africa"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "IT Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Web Development",
            "description": "Modern websites and web applications"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "IT Maintenance",
            "description": "24/7 technical support and system maintenance"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "Cloud Solutions",
            "description": "Cloud migration and infrastructure services"
          }
        }
      ]
    }
  };

  const combinedStructuredData = structuredData || {
    "@context": "https://schema.org",
    "@graph": [organizationData, localBusinessData, professionalServiceData]
  };

  useEffect(() => {
    // Update document title
    document.title = finalTitle;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        if (isProperty) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', finalDescription);
    updateMetaTag('keywords', finalKeywords.join(', '));
    updateMetaTag('author', 'Nguessan-IT');
    
    // Robots meta
    if (noIndex) {
      updateMetaTag('robots', 'noindex, nofollow');
    } else {
      updateMetaTag('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    }

    // Geographic targeting
    updateMetaTag('geo.region', 'CI');
    updateMetaTag('geo.placename', 'Abidjan, Côte d\'Ivoire');
    updateMetaTag('geo.position', '5.3364;-4.0267');
    updateMetaTag('ICBM', '5.3364, -4.0267');

    // Language and locale
    updateMetaTag('language', language);
    updateMetaTag('content-language', language === 'fr' ? 'fr-CI' : 'en-US');
    
    // Open Graph tags
    updateMetaTag('og:title', finalTitle, true);
    updateMetaTag('og:description', finalDescription, true);
    updateMetaTag('og:type', ogType, true);
    updateMetaTag('og:url', currentUrl, true);
    updateMetaTag('og:image', `${window.location.origin}${image}`, true);
    updateMetaTag('og:image:secure_url', `${window.location.origin}${image}`, true);
    updateMetaTag('og:image:width', '1200', true);
    updateMetaTag('og:image:height', '630', true);
    updateMetaTag('og:image:alt', `${finalTitle} - Solutions informatiques professionnelles`, true);
    updateMetaTag('og:image:type', 'image/jpeg', true);
    updateMetaTag('og:site_name', 'Nguessan-IT', true);
    updateMetaTag('og:locale', language === 'fr' ? 'fr_CI' : 'en_US', true);
    updateMetaTag('og:locale:alternate', language === 'fr' ? 'en_US' : 'fr_CI', true);
    
    // Business specific Open Graph
    updateMetaTag('business:contact_data:street_address', 'Abidjan, Côte d\'Ivoire', true);
    updateMetaTag('business:contact_data:locality', 'Abidjan', true);
    updateMetaTag('business:contact_data:region', 'Côte d\'Ivoire', true);
    updateMetaTag('business:contact_data:country_name', 'Côte d\'Ivoire', true);
    updateMetaTag('business:contact_data:website', currentUrl, true);
    
    // Additional Open Graph for better sharing
    updateMetaTag('og:updated_time', new Date().toISOString(), true);
    updateMetaTag('og:see_also', 'https://nguessan-it.lovable.app/services', true);
    
    // Twitter Card tags
    updateMetaTag('twitter:card', twitterCard);
    updateMetaTag('twitter:site', '@nguessan_it');
    updateMetaTag('twitter:creator', '@nguessan_it');
    updateMetaTag('twitter:title', finalTitle);
    updateMetaTag('twitter:description', finalDescription);
    updateMetaTag('twitter:image', `${window.location.origin}${image}`);
    updateMetaTag('twitter:image:alt', `${finalTitle} - Solutions informatiques professionnelles`);
    updateMetaTag('twitter:domain', 'nguessan-it.lovable.app');
    updateMetaTag('twitter:url', currentUrl);
    
    // LinkedIn specific tags
    updateMetaTag('linkedin:owner', 'Nguessan-IT');
    
    // WhatsApp/Telegram optimization
    updateMetaTag('og:video', '', true); // Prevents auto-play issues
    
    // Pinterest specific
    updateMetaTag('pinterest:description', finalDescription);
    updateMetaTag('pinterest:media', `${window.location.origin}${image}`);

    // Additional meta tags for social sharing
    updateMetaTag('application-name', 'Nguessan-IT');
    updateMetaTag('apple-mobile-web-app-title', 'Nguessan-IT');
    updateMetaTag('theme-color', '#3b82f6');
    updateMetaTag('msapplication-TileColor', '#3b82f6');
    updateMetaTag('mobile-web-app-capable', 'yes');
    
    // Rich snippets for social media
    updateMetaTag('article:author', 'Nguessan-IT');
    updateMetaTag('article:publisher', 'https://nguessan-it.lovable.app');
    updateMetaTag('article:section', 'Technology');
    updateMetaTag('article:tag', finalKeywords.slice(0, 5).join(', '));

    // Canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = canonicalUrl;

    // Hreflang links for internationalization
    const updateHreflang = (lang: string, url: string) => {
      let hreflangLink = document.querySelector(`link[hreflang="${lang}"]`) as HTMLLinkElement;
      if (!hreflangLink) {
        hreflangLink = document.createElement('link');
        hreflangLink.rel = 'alternate';
        hreflangLink.hreflang = lang;
        document.head.appendChild(hreflangLink);
      }
      hreflangLink.href = url;
    };

    // Add hreflang links for supported languages
    updateHreflang('fr', currentUrl.replace(/\?.*$/, '') + '?lang=fr');
    updateHreflang('en', currentUrl.replace(/\?.*$/, '') + '?lang=en');
    updateHreflang('x-default', currentUrl.replace(/\?.*$/, ''));

    // Structured data
    let script = document.querySelector('#structured-data') as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script');
      script.id = 'structured-data';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(combinedStructuredData);

    // Performance and loading hints
    const addPreloadLink = (href: string, as: string, type?: string) => {
      if (!document.querySelector(`link[href="${href}"]`)) {
        const preloadLink = document.createElement('link');
        preloadLink.rel = 'preload';
        preloadLink.href = href;
        preloadLink.as = as;
        if (type) preloadLink.type = type;
        document.head.appendChild(preloadLink);
      }
    };

    // Preload critical resources
    addPreloadLink(image, 'image');
    addPreloadLink('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap', 'style');

  }, [finalTitle, finalDescription, finalKeywords, currentUrl, canonicalUrl, image, type, combinedStructuredData, noIndex, language]);

  return null;
};

export default SEO;