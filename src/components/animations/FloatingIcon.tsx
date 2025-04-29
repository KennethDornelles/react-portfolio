import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface FloatingIconProps {
    children: ReactNode;
    duration?: number;
    delay?: number;
    amplitude?: number; // Amplitude da flutuação em pixels
    className?: string;
}

const FloatingIcon: React.FC<FloatingIconProps> = ({
    children,
    duration = 3,
    delay = 0,
    amplitude = 15,
    className = '',
}) => {
    return (
        <motion.div
            className={`inline-block ${className}`}
            animate={{
                y: [0, -amplitude, 0, amplitude, 0],
            }}
            transition={{
                duration,
                repeat: Infinity,
                repeatType: 'loop',
                ease: 'easeInOut',
                delay,
            }}
        >
            {children}
        </motion.div>
    );
};

export default FloatingIcon;