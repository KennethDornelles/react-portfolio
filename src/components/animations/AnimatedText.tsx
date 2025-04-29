import { motion } from 'framer-motion';
import React from 'react';

interface AnimatedTextProps {
    text: string;
    className?: string;
    charDelay?: number;
    staggerChildren?: number;
    initialDelay?: number;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
    text,
    className = '',
    charDelay = 0.04,
    staggerChildren = 0.04,
    initialDelay = 0,
}) => {
    // Separar o texto em palavras
    const words = text.split(' ');

    // Variantes para o contêiner das palavras
    const containerVariants = {
        hidden: {},
        visible: () => ({
            transition: {
                staggerChildren,
                delayChildren: initialDelay,
            },
        }),
    };

    // Variantes para cada palavra
    const wordVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren,
            },
        },
    };

    // Variantes para cada caractere na palavra
    const charVariants = {
        hidden: {
            opacity: 0,
            y: 20,
            transition: {
                type: 'spring',
                damping: 12,
                stiffness: 100,
            },
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                damping: 12,
                stiffness: 100,
                duration: 0.2,
            },
        },
    };

    return (
        <motion.div
            className={`inline-block ${className}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {words.map((word, wordIndex) => (
                <motion.span
                    key={`word-${wordIndex}`}
                    className="inline-block mr-1"
                    variants={wordVariants}
                >
                    {Array.from(word).map((char, charIndex) => (
                        <motion.span
                            key={`char-${charIndex}`}
                            className="inline-block"
                            variants={charVariants}
                            custom={charIndex}
                            transition={{ delay: charDelay * charIndex }}
                        >
                            {char}
                        </motion.span>
                    ))}
                    {wordIndex !== words.length - 1 && " "}
                </motion.span>
            ))}
        </motion.div>
    );
};

export default AnimatedText;