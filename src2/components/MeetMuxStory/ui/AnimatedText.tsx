import { motion } from 'framer-motion'
import { useState, useEffect } from 'react';

interface AnimatedQuoteProps {
    quote: string;
    author?: string;
    className?: string;
}

export const AnimatedQuote: React.FC<AnimatedQuoteProps> = ({
    quote,
    author,
    className = '',
}) => {
    const [displayedText, setDisplayedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex < quote.length) {
            const timeout = setTimeout(() => {
                setDisplayedText(quote.slice(0, currentIndex + 1));
                setCurrentIndex(currentIndex + 1);
            }, 50);
            return () => clearTimeout(timeout);
        }
    }, [currentIndex, quote]);

    return (
        <motion.div
            className={`text-center ${className}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
        >
            <motion.blockquote
                className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 relative"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8 }}
            >
                <span className="text-4xl md:text-5xl opacity-50 absolute -top-4 -left-4">"</span>
                {displayedText}
                <motion.span
                    className="inline-block w-1 h-8 bg-current ml-1"
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                />
                <span className="text-4xl md:text-5xl opacity-50 absolute -bottom-4 -right-4">"</span>
            </motion.blockquote>

            {author && (
                <motion.cite
                    className="text-lg opacity-80 not-italic"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                >
                    — {author}
                </motion.cite>
            )}
        </motion.div>
    );
};

interface TypewriterTextProps {
    text: string;
    delay?: number;
    speed?: number;
    className?: string;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
    text,
    delay = 0,
    speed = 50,
    className = '',
}) => {
    const [displayedText, setDisplayedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const startTimeout = setTimeout(() => {
            setStarted(true);
        }, delay);

        return () => clearTimeout(startTimeout);
    }, [delay]);

    useEffect(() => {
        if (started && currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText(text.slice(0, currentIndex + 1));
                setCurrentIndex(currentIndex + 1);
            }, speed);
            return () => clearTimeout(timeout);
        }
    }, [currentIndex, text, speed, started]);

    return (
        <span className={className}>
            {displayedText}
            {started && currentIndex < text.length && (
                <motion.span
                    className="inline-block w-0.5 h-5 bg-current ml-1"
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                />
            )}
        </span>
    );
};
