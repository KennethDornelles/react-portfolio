export const useTranslation = () => {
  return {
    t: (key) => {
      // Simple mock implementation
      const translations = {
        'theme.light': 'Mudar para modo escuro',
        'theme.dark': 'Mudar para modo claro',
      };
      return translations[key] || key;
    },
    i18n: {
      changeLanguage: () => new Promise(() => {}),
    },
  };
};

export const Trans = ({ children }) => children;

export default {
  useTranslation,
  Trans,
};