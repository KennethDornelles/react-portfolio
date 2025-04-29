import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Importando traduções
import ptBR from './locales/pt-BR';
import enUS from './locales/en-US';

const resources = {
  'pt-BR': ptBR,
  'en-US': enUS
};

i18n
  // Detectar idioma do navegador
  .use(LanguageDetector)
  // Passar o i18n para o react-i18next
  .use(initReactI18next)
  // Inicializar i18next
  .init({
    resources,
    fallbackLng: 'pt-BR',
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false, // React já escapa as strings
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;