import { useState } from 'react';
import { ChevronDown, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLanguage, type Language } from '@/contexts/LanguageContext';

const languages = [
  { code: 'fr' as Language, name: 'Français', flag: '🇫🇷' },
  { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
  { code: 'es' as Language, name: 'Español', flag: '🇪🇸' },
  { code: 'pt' as Language, name: 'Português', flag: '🇵🇹' },
  { code: 'it' as Language, name: 'Italiano', flag: '🇮🇹' },
];

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = languages.find(lang => lang.code === language);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline-flex items-center gap-2">
            <span className="text-base leading-none">{currentLanguage?.flag}</span>
            <span className="hidden md:inline">{currentLanguage?.name}</span>
          </span>
          <ChevronDown className="h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => {
              setLanguage(lang.code);
              setIsOpen(false);
            }}
            className={`flex items-center gap-3 cursor-pointer ${
              language === lang.code ? 'bg-primary/10 text-primary' : ''
            }`}
          >
            <span className="text-base leading-none">{lang.flag}</span>
            <span>{lang.name}</span>
            {language === lang.code && (
              <div className="ml-auto h-2 w-2 bg-primary rounded-full"></div>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;