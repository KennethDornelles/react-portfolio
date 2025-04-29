import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export type AnimationType = 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight' | 'scale' | 'bounce';

interface AnimatedSectionProps {
    children: React.ReactNode;
    id?: string;
    className?: string;
    delay?: number;
    duration?: number;
    animationType?: AnimationType;
    once?: boolean;
    threshold?: number;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
    children,
    id,
    className = '',
    delay = 0,
    duration = 0.6,
    animationType = 'fadeUp',
    once = true,
    threshold = 0.1,
}) => {
    const [ref, inView] = useInView({
        triggerOnce: once,
        threshold: threshold,
    });

    const animations = {
        fadeUp: {
            hidden: { opacity: 0, y: 50 },
            visible: {
                opacity: 1,
                y: 0,
                transition: {
                    duration: duration,
                    delay: delay,
                    ease: 'easeOut',
                },
            },
        },
        fadeIn: {
            hidden: { opacity: 0 },
            visible: {
                opacity: 1,
                transition: {
                    duration: duration,
                    delay: delay,
                    ease: 'easeOut',
                },
            },
        },
        slideLeft: {
            hidden: { opacity: 0, x: 100 },
            visible: {
                opacity: 1,
                x: 0,
                transition: {
                    duration: duration,
                    delay: delay,
                    ease: 'easeOut',
                },
            },
        },
        slideRight: {
            hidden: { opacity: 0, x: -100 },
            visible: {
                opacity: 1,
                x: 0,
                transition: {
                    duration: duration,
                    delay: delay,
                    ease: 'easeOut',
                },
            },
        },
        scale: {
            hidden: { opacity: 0, scale: 0.85 },
            visible: {
                opacity: 1,
                scale: 1,
                transition: {
                    duration: duration,
                    delay: delay,
                    ease: 'easeOut',
                },
            },
        },
        bounce: {
            hidden: { opacity: 0, y: 50 },
            visible: {
                opacity: 1,
                y: 0,
                transition: {
                    type: 'spring',
                    stiffness: 400,
                    damping: 10,
                    delay: delay,
                },
            },
        },
    };

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={animations[animationType]}
            className={className}
            id={id}
        >
            {children}
        </motion.div>
    );
};

export default AnimatedSection;