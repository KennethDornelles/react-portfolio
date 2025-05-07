import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useState } from 'react';

const LanguageSelector = () => {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    const changeLanguage = (lng: string) => {
        // Limpar o cache de recursos e recarregar as traduções
        i18n.reloadResources().then(() => {
            i18n.changeLanguage(lng);
            // Forçar uma atualização do localStorage para garantir que as novas traduções sejam usadas
            localStorage.setItem('i18nextLng', lng);
            setIsOpen(false);

            // Adicionar um pequeno delay e forçar um refresh da página
            // Isso é uma solução temporária para garantir que as traduções sejam atualizadas
            setTimeout(() => {
                window.location.reload();
            }, 100);
        });
    };

    const currentLanguage = i18n.language;
    const languageNames: Record<string, string> = {
        'pt-BR': '🇧🇷 PT',
        'en-US': '🇺🇸 EN'
    };

    return (
        <div className="fixed left-4 top-4 z-50">
            <motion.div
                className="relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                <motion.button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-2 rounded-full bg-gray-200 px-3 py-2 text-sm font-medium shadow-md dark:bg-gray-800"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Selecionar idioma"
                >
                    <span>{languageNames[currentLanguage] || '🌐 Language'}</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </motion.button>

                {isOpen && (
                    <motion.div
                        className="absolute mt-2 w-24 rounded-lg bg-white py-1 shadow-lg dark:bg-gray-800"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        <button
                            onClick={() => changeLanguage('pt-BR')}
                            className={`block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${currentLanguage === 'pt-BR' ? 'font-bold text-blue-500' : ''
                                }`}
                        >
                            🇧🇷 Português
                        </button>
                        <button
                            onClick={() => changeLanguage('en-US')}
                            className={`block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${currentLanguage === 'en-US' ? 'font-bold text-blue-500' : ''
                                }`}
                        >
                            🇺🇸 English
                        </button>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
};

export default LanguageSelector;