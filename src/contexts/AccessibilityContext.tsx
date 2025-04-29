import React, { createContext, useContext, useState, useEffect } from 'react';

type FontSize = 'normal' | 'large' | 'x-large';
type Contrast = 'normal' | 'high-contrast';

interface AccessibilityContextType {
    fontSize: FontSize;
    contrast: Contrast;
    setFontSize: (size: FontSize) => void;
    setContrast: (contrast: Contrast) => void;
    resetAccessibility: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | null>(null);

export const useAccessibility = () => {
    const context = useContext(AccessibilityContext);
    if (!context) {
        throw new Error('useAccessibility must be used within an AccessibilityProvider');
    }
    return context;
};

interface AccessibilityProviderProps {
    children: React.ReactNode;
}

export const AccessibilityProvider: React.FC<AccessibilityProviderProps> = ({ children }) => {
    const [fontSize, setFontSizeState] = useState<FontSize>(() => {
        const savedFontSize = localStorage.getItem('accessibility_fontSize');
        return (savedFontSize as FontSize) || 'normal';
    });

    const [contrast, setContrastState] = useState<Contrast>(() => {
        const savedContrast = localStorage.getItem('accessibility_contrast');
        return (savedContrast as Contrast) || 'normal';
    });

    useEffect(() => {
        localStorage.setItem('accessibility_fontSize', fontSize);

        // Remover classes antigas
        document.documentElement.classList.remove('text-normal', 'text-large', 'text-x-large');

        // Adicionar classe apropriada
        document.documentElement.classList.add(`text-${fontSize}`);

        // Ajustar o tamanho da fonte no HTML root
        if (fontSize === 'normal') {
            document.documentElement.style.fontSize = '16px';
        } else if (fontSize === 'large') {
            document.documentElement.style.fontSize = '18px';
        } else if (fontSize === 'x-large') {
            document.documentElement.style.fontSize = '20px';
        }
    }, [fontSize]);

    useEffect(() => {
        localStorage.setItem('accessibility_contrast', contrast);

        // Remover classes antigas
        document.documentElement.classList.remove('contrast-normal', 'contrast-high');

        // Adicionar classe apropriada
        document.documentElement.classList.add(`contrast-${contrast}`);
    }, [contrast]);

    const setFontSize = (size: FontSize) => {
        setFontSizeState(size);
    };

    const setContrast = (value: Contrast) => {
        setContrastState(value);
    };

    const resetAccessibility = () => {
        setFontSize('normal');
        setContrast('normal');
    };

    return (
        <AccessibilityContext.Provider
            value={{
                fontSize,
                contrast,
                setFontSize,
                setContrast,
                resetAccessibility,
            }}
        >
            {children}
        </AccessibilityContext.Provider>
    );
};