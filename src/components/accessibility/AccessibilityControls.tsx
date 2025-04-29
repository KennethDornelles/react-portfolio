import { useState } from 'react';
import { FaUniversalAccess, FaFont, FaAdjust, FaTimes } from 'react-icons/fa';
import { useAccessibility } from '../../contexts/AccessibilityContext';
import { useTranslation } from 'react-i18next';

export default function AccessibilityControls() {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const { fontSize, contrast, setFontSize, setContrast, resetAccessibility } = useAccessibility();

    return (
        <>
            {/* Botão flutuante de acessibilidade */}
            <button
                aria-label={t('accessibility.toggleMenu')}
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-4 left-4 z-50 rounded-full bg-blue-600 p-3 text-white shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-all"
            >
                <FaUniversalAccess className="h-6 w-6" />
            </button>

            {/* Painel de controle de acessibilidade */}
            {isOpen && (
                <div className="fixed bottom-16 left-4 z-50 w-64 rounded-lg bg-white dark:bg-gray-800 p-4 shadow-xl border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                            {t('accessibility.title')}
                        </h2>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
                            aria-label={t('accessibility.close')}
                        >
                            <FaTimes />
                        </button>
                    </div>

                    {/* Controle de tamanho de fonte */}
                    <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                            <FaFont className="text-blue-600 dark:text-blue-400" />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('accessibility.fontSize')}</span>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setFontSize('normal')}
                                className={`px-3 py-1 rounded-md text-sm ${fontSize === 'normal'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white'
                                    }`}
                            >
                                A
                            </button>
                            <button
                                onClick={() => setFontSize('large')}
                                className={`px-3 py-1 rounded-md text-sm ${fontSize === 'large'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white'
                                    }`}
                            >
                                A+
                            </button>
                            <button
                                onClick={() => setFontSize('x-large')}
                                className={`px-3 py-1 rounded-md text-sm ${fontSize === 'x-large'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white'
                                    }`}
                            >
                                A++
                            </button>
                        </div>
                    </div>

                    {/* Controle de contraste */}
                    <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                            <FaAdjust className="text-blue-600 dark:text-blue-400" />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('accessibility.contrast')}</span>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setContrast('normal')}
                                className={`px-3 py-1 rounded-md text-sm ${contrast === 'normal'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white'
                                    }`}
                            >
                                {t('accessibility.normal')}
                            </button>
                            <button
                                onClick={() => setContrast('high-contrast')}
                                className={`px-3 py-1 rounded-md text-sm ${contrast === 'high-contrast'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white'
                                    }`}
                            >
                                {t('accessibility.highContrast')}
                            </button>
                        </div>
                    </div>

                    {/* Botão de reset */}
                    <button
                        onClick={resetAccessibility}
                        className="w-full py-2 text-sm text-center rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    >
                        {t('accessibility.reset')}
                    </button>
                </div>
            )}
        </>
    );
}