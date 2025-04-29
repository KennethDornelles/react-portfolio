import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { HiCalendar, HiMapPin } from 'react-icons/hi2';

interface TimelineItemProps {
    title: string;
    subtitle: string;
    date: string;
    location: string;
    description: string | React.ReactNode;
    isLast?: boolean;
    delay?: number;
    technologies?: string[];
}

const TimelineItem: React.FC<TimelineItemProps> = ({
    title,
    subtitle,
    date,
    location,
    description,
    isLast = false,
    delay = 0,
    technologies
}) => {
    const { darkMode } = useTheme();

    return (
        <motion.div
            className="relative pl-8 sm:pl-12 py-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
        >
            {/* Dot and line */}
            <motion.div
                className={`absolute left-0 top-8 h-4 w-4 rounded-full ${darkMode ? 'bg-primary-500' : 'bg-primary-600'}`}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: delay + 0.2 }}
            />
            
            {!isLast && (
                <div className={`absolute left-[7px] top-12 h-full w-[2px] ${darkMode ? 'bg-gray-700' : 'bg-gray-300'}`} />
            )}
            
            {/* Content */}
            <div className="flex flex-col space-y-3">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                    <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
                    <p className={`text-sm font-medium ${darkMode ? 'text-primary-400' : 'text-primary-600'}`}>{subtitle}</p>
                </div>
                
                <div className={`flex flex-col gap-2 sm:flex-row sm:gap-6 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    <div className="flex items-center gap-1">
                        <HiCalendar className="h-4 w-4" />
                        <span>{date}</span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                        <HiMapPin className="h-4 w-4" />
                        <span>{location}</span>
                    </div>
                </div>
                
                <div className={`prose prose-sm ${darkMode ? 'prose-invert' : ''}`}>
                    {typeof description === 'string' 
                        ? <p>{description}</p> 
                        : description
                    }
                </div>
                
                {technologies && technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                        {technologies.map((tech) => (
                            <span 
                                key={tech} 
                                className={`px-2 py-1 text-xs rounded-full ${
                                    darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-200 text-gray-800'
                                }`}
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </motion.div>
    );
};

interface TimelineProps {
    items: Array<Omit<TimelineItemProps, 'isLast' | 'delay'>>;
}

const Timeline: React.FC<TimelineProps> = ({ items }) => {
    return (
        <div className="relative">
            {items.map((item, index) => (
                <TimelineItem
                    key={`${item.title}-${index}`}
                    {...item}
                    isLast={index === items.length - 1}
                    delay={index * 0.1}
                />
            ))}
        </div>
    );
};

export default Timeline;