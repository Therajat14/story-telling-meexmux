import { ReactNode } from 'react';
import { ScrollAnimation } from './ScrollAnimation';

interface ChapterSectionProps {
    chapter: number;
    title: string;
    subtitle?: string;
    children: ReactNode;
    theme: 'dark' | 'transition' | 'light';
    backgroundImage?: string;
    className?: string;
}

export const ChapterSection = ({
    chapter,
    title,
    subtitle,
    children,
    theme,
    backgroundImage,
    className = ''
}: ChapterSectionProps) => {
    const getThemeClasses = () => {
        switch (theme) {
            case 'dark':
                return 'chapter-dark text-white';
            case 'transition':
                return 'chapter-transition';
            case 'light':
                return 'chapter-light';
            default:
                return 'chapter-light';
        }
    };

    return (
        <section
            className={`min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden ${getThemeClasses()} ${className}`}
            style={{
                backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundBlendMode: backgroundImage ? 'overlay' : undefined,
            }}
        >
            {/* Background overlay for better text readability */}
            {backgroundImage && (
                <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-black/60' : 'bg-white/80'}`} />
            )}

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="text-center mb-12">
                    <ScrollAnimation delay={0.2}>
                        <div className="inline-flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
                                {chapter}
                            </div>
                            <div className="h-px w-16 bg-gradient-to-r from-purple-500 to-pink-500" />
                        </div>
                    </ScrollAnimation>

                    <ScrollAnimation delay={0.4}>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                            {title}
                        </h2>
                    </ScrollAnimation>

                    {subtitle && (
                        <ScrollAnimation delay={0.6}>
                            <p className="text-xl md:text-2xl opacity-80 max-w-3xl mx-auto">
                                {subtitle}
                            </p>
                        </ScrollAnimation>
                    )}
                </div>

                <ScrollAnimation delay={0.8}>
                    <div className="max-w-4xl mx-auto">
                        {children}
                    </div>
                </ScrollAnimation>
            </div>
        </section>
    );
};
