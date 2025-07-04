import { useState, useEffect } from 'react';
import { type Language, getTranslation } from '../lib/i18n';

export function useLanguage() {
  const [language, setLanguage] = useState<Language>(() => {
    // Get from localStorage or detect from browser
    const saved = localStorage.getItem('dog-twin-language');
    if (saved && ['ko', 'en', 'ja', 'zh'].includes(saved)) {
      return saved as Language;
    }
    
    // Detect from browser language
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('ko')) return 'ko';
    if (browserLang.startsWith('ja')) return 'ja';
    if (browserLang.startsWith('zh')) return 'zh';
    return 'en'; // Default to English
  });

  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    localStorage.setItem('dog-twin-language', newLanguage);
  };

  const t = getTranslation(language);

  useEffect(() => {
    // Update document language
    document.documentElement.lang = language;
  }, [language]);

  return { language, changeLanguage, t };
}