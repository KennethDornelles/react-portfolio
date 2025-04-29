import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { HiClipboardDocument, HiClipboardDocumentCheck, HiArrowsPointingOut } from 'react-icons/hi2';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

interface CodeBlockProps {
    code: string;
    language: string;
    fileName?: string;
    showLineNumbers?: boolean;
    wrapLines?: boolean;
    className?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({
    code,
    language,
    fileName,
    showLineNumbers = true,
    wrapLines = true,
    className = '',
}) => {
    const [copied, setCopied] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const { darkMode } = useTheme();

    const handleCopyClick = async () => {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    return (
        <motion.div
            className={`relative rounded-lg overflow-hidden shadow-lg my-4 dark:bg-gray-900 bg-gray-100 ${expanded ? 'fixed inset-4 z-50 flex flex-col' : 'max-h-[600px]'} ${className}`}
            layout
            transition={{ duration: 0.3 }}
        >
            {fileName && (
                <div className="bg-gray-800 text-gray-200 px-4 py-2 flex justify-between items-center">
                    <span className="text-sm font-mono">{fileName}</span>
                    <div className="flex gap-2">
                        <button
                            onClick={toggleExpand}
                            className="text-gray-400 hover:text-white transition-colors p-1"
                            aria-label={expanded ? "Minimizar" : "Expandir"}
                        >
                            <HiArrowsPointingOut className="h-4 w-4" />
                        </button>
                        <button
                            onClick={handleCopyClick}
                            className="text-gray-400 hover:text-white transition-colors p-1"
                            aria-label="Copiar código"
                        >
                            {copied ? (
                                <HiClipboardDocumentCheck className="h-4 w-4 text-green-500" />
                            ) : (
                                <HiClipboardDocument className="h-4 w-4" />
                            )}
                        </button>
                    </div>
                </div>
            )}
            <div className={`${expanded ? 'overflow-auto flex-grow' : 'overflow-auto'}`}>
                <SyntaxHighlighter
                    language={language}
                    style={darkMode ? vscDarkPlus : vs}
                    showLineNumbers={showLineNumbers}
                    wrapLines={wrapLines}
                    lineProps={{ style: { whiteSpace: 'pre-wrap' } }}
                    className="text-sm h-full"
                >
                    {code}
                </SyntaxHighlighter>
            </div>
            {expanded && (
                <div className="absolute top-2 right-2 z-10">
                    <button
                        onClick={toggleExpand}
                        className="bg-gray-800 hover:bg-gray-700 text-white rounded-full p-2 shadow-lg"
                        aria-label="Fechar"
                    >
                        &times;
                    </button>
                </div>
            )}
            {copied && (
                <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                    <div className="bg-green-600 text-white px-4 py-2 rounded-full text-sm shadow-lg">
                        Código copiado!
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default CodeBlock;