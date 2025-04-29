import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Importando traduções
import ptBR from './locales/pt-BR';
import enUS from './locales/en-US';

// Adiciona timestamp para forçar atualização de cache
const cacheVersion = Date.now().toString();

// Define os recursos com versão para evitar cache
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
    },
    // Configurar cache de forma adequada
    load: 'currentOnly',
    // Usando um namespace versionado para evitar cache
    ns: [`translation_${cacheVersion}`],
    defaultNS: `translation_${cacheVersion}`,
    fallbackNS: 'translation'
  });

// Método alternativo para forçar recarga de traduções
// Isso garante que qualquer cache seja invalidado
i18n.reloadResources();

// Limpeza de cache do localStorage
try {
  Object.keys(localStorage).forEach(key => {
    if (key.startsWith('i18next_res_')) {
      localStorage.removeItem(key);
    }
  });
} catch (e) {
  console.warn('Não foi possível limpar o cache do localStorage:', e);
}

export default i18n;