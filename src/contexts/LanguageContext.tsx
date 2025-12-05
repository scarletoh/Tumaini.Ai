import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'sw';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Default translations
const translations: Record<string, Record<Language, string>> = {
  'home': { en: 'Home', sw: 'Nyumbani' },
  'dashboard': { en: 'Dashboard', sw: 'Dashibodi' },
  'features': { en: 'Features', sw: 'Vipengele' },
  'chat': { en: 'Chat', sw: 'Mazungumzo' },
  'resources': { en: 'Resources', sw: 'Rasilimali' },
  'voiceAnalysis': { en: 'Voice Analysis', sw: 'Uchambuzi wa Sauti' },
  'moodTracking': { en: 'Mood Tracking', sw: 'Ufuatiliaji wa Hisia' },
  'wellnessInsights': { en: 'Wellness Insights', sw: 'Ufahamu wa Ustawi' },
  'language': { en: 'Language', sw: 'Lugha' },
  'english': { en: 'English', sw: 'Kiingereza' },
  'swahili': { en: 'Swahili', sw: 'Kiswahili' },
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  // Load language preference from localStorage on initial load
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage') as Language | null;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language preference to localStorage when it changes
  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('preferredLanguage', lang);
  };

  // Translation function
  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
