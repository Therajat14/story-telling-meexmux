import { motion } from "framer-motion";
import React, { useRef, forwardRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TribeFoundProps {
    darkMode: boolean;
}
// Animated Connection Network SVG
const ConnectionNetworkSVG = ({ darkMode }: { darkMode: boolean }) => {
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (!svgRef.current) return;

        const circles = svgRef.current.querySelectorAll('.node-circle');
        const lines = svgRef.current.querySelectorAll('.connection-line');

        gsap.fromTo(lines,
            { strokeDashoffset: 1000, opacity: 0 },
            {
                strokeDashoffset: 0,
                opacity: 0.6,
                duration: 2,
                stagger: 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: svgRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            }
        );

        gsap.fromTo(circles,
            { scale: 0, opacity: 0 },
            {
                scale: 1,
                opacity: 1,
                duration: 0.6,
                stagger: 0.08,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: svgRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            }
        );

        // Pulse animation
        gsap.to(circles, {
            scale: 1.2,
            opacity: 0.8,
            duration: 1.5,
            stagger: 0.2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

    }, []);

    const color = darkMode ? "#fff" : "#000";
    const accentColor = darkMode ? "#f472b6" : "#ec4899";

    return (
        <svg ref={svgRef} viewBox="0 0 400 300" className="w-full h-full opacity-20 absolute inset-0">
            <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={accentColor} stopOpacity="0.8" />
                    <stop offset="100%" stopColor={color} stopOpacity="0.4" />
                </linearGradient>
            </defs>

            {/* Connection Lines */}
            <line className="connection-line" x1="200" y1="150" x2="100" y2="80" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="1000" />
            <line className="connection-line" x1="200" y1="150" x2="300" y2="80" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="1000" />
            <line className="connection-line" x1="200" y1="150" x2="80" y2="200" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="1000" />
            <line className="connection-line" x1="200" y1="150" x2="320" y2="200" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="1000" />
            <line className="connection-line" x1="100" y1="80" x2="300" y2="80" stroke="url(#lineGradient)" strokeWidth="1.5" strokeDasharray="1000" />
            <line className="connection-line" x1="80" y1="200" x2="320" y2="200" stroke="url(#lineGradient)" strokeWidth="1.5" strokeDasharray="1000" />

            {/* Nodes */}
            <circle className="node-circle" cx="200" cy="150" r="12" fill={accentColor} opacity="0.9" />
            <circle className="node-circle" cx="100" cy="80" r="8" fill={color} opacity="0.7" />
            <circle className="node-circle" cx="300" cy="80" r="8" fill={color} opacity="0.7" />
            <circle className="node-circle" cx="80" cy="200" r="8" fill={color} opacity="0.7" />
            <circle className="node-circle" cx="320" cy="200" r="8" fill={color} opacity="0.7" />
            <circle className="node-circle" cx="150" cy="220" r="6" fill={accentColor} opacity="0.6" />
            <circle className="node-circle" cx="250" cy="220" r="6" fill={accentColor} opacity="0.6" />
        </svg>
    );
};



const CommunitySVG = ({ darkMode }: { darkMode: boolean }) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const orbitRef = useRef<SVGGElement>(null);
    const animationsRef = useRef<gsap.core.Tween[]>([]);

    useEffect(() => {
        if (!svgRef.current || !orbitRef.current) return;

        const people = orbitRef.current.querySelectorAll(".person");

        animationsRef.current.forEach(anim => anim.kill());
        animationsRef.current = [];

        // Entrance: pop-in with elasticity
        const entranceAnim = gsap.fromTo(
            people,
            { scale: 0, opacity: 0 },
            {
                scale: 1,
                opacity: 1,
                duration: 1,
                stagger: 0.08,
                ease: "back.out(1.2)",
                scrollTrigger: {
                    trigger: svgRef.current,
                    start: "top 90%",
                    toggleActions: "play none none reverse",
                },
            }
        );

        // Gentle floating (less aggressive)
        const floatAnim = gsap.to(people, {
            y: (i, el) => parseFloat(el.getAttribute('cy') || '0') - 4, // animate relative to original y
            duration: 2.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
        });

        // Smooth scroll-driven rotation
        const rotationAnim = gsap.to(orbitRef.current, {
            rotation: 360,
            transformOrigin: "100px 100px", // ✅ Corrected: rotate around true center
            ease: "none",
            scrollTrigger: {
                trigger: svgRef.current,
                start: "top 85%",
                end: "+=800", // more control than "bottom top"
                scrub: 0.8,   // slight smoothing
            },
        });

        animationsRef.current.push(entranceAnim, floatAnim, rotationAnim);

        return () => {
            animationsRef.current.forEach(anim => {
                anim.scrollTrigger?.kill();
                anim.kill();
            });
            animationsRef.current = [];
        };
    }, []);

    const color = darkMode ? "#fff" : "#1f2937";

    return (
        <svg
            ref={svgRef}
            viewBox="0 0 200 200"
            className="w-40 h-40 mx-auto mb-6 block"
        >
            {/* Optional: very subtle orbit for context (remove if truly unwanted) */}
            <circle
                cx="100"
                cy="100"
                fill="none"
                stroke={color}
                strokeWidth="0.8"
                opacity="0.08"
            />

            {/* People group — shifted down to center visually */}
            <g ref={orbitRef} transform="translate(0, 7.5)">
                {Array.from({ length: 8 }).map((_, i) => {
                    const angle = (i / 8) * Math.PI * 2;
                    const x = 100 + Math.cos(angle) * 80;
                    const y = 100 + Math.sin(angle) * 80;
                    return (
                        <g key={i} className="person">
                            {/* Store original y in data for floating anim (optional) */}
                            <circle cx={x} cy={y} r="7" fill={color} opacity="0.95" />
                            <circle cx={x} cy={y + 14} r="11" fill={color} opacity="0.65" />
                        </g>
                    );
                })}
            </g>
        </svg>
    );
};

export default function App() {
    const [darkMode, setDarkMode] = React.useState(false);

    return (
        <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} p-8`}>
            <button
                onClick={() => setDarkMode(!darkMode)}
                className="mb-6 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
            >
                Toggle {darkMode ? 'Light' : 'Dark'} Mode
            </button>
            <div style={{ height: '150vh' }}>
                <CommunitySVG darkMode={darkMode} />
            </div>
        </div>
    );
}



















const AnimatedQuote = ({ quote, author, className }: { quote: string; author: string; className?: string }) => {
    return (
        <blockquote className={`text-center ${className}`}>
            <p className="text-2xl md:text-3xl font-light italic mb-4">"{quote}"</p>
            <footer className="text-lg opacity-70">— {author}</footer>
        </blockquote>
    );
};

export const TribeFoundChapter = forwardRef<HTMLElement, TribeFoundProps>(
    ({ darkMode }, ref) => {
        const sectionRef = useRef<HTMLDivElement>(null);
        const headerRef = useRef<HTMLDivElement>(null);
        const activitiesRef = useRef<HTMLDivElement>(null);
        const scoreRef = useRef<HTMLDivElement>(null);
        const quoteRef = useRef<HTMLDivElement>(null);
        const closingRef = useRef<HTMLDivElement>(null);

        useEffect(() => {
            const ctx = gsap.context(() => {
                // Header animation
                gsap.fromTo(headerRef.current,
                    { opacity: 0, y: 80 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1.2,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: headerRef.current,
                            start: "top 80%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );

                // Activities stagger animation
                const activityCards = activitiesRef.current?.querySelectorAll('.activity-card');
                gsap.fromTo(activityCards,
                    { opacity: 0, scale: 0.5, rotationY: -90 },
                    {
                        opacity: 1,
                        scale: 1,
                        rotationY: 0,
                        duration: 0.8,
                        stagger: 0.12,
                        ease: "back.out(1.4)",
                        scrollTrigger: {
                            trigger: activitiesRef.current,
                            start: "top 75%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );

                // Emoji bounce on hover
                activityCards?.forEach(card => {
                    const emoji = card.querySelector('.activity-emoji');
                    card.addEventListener('mouseenter', () => {
                        gsap.to(emoji, {
                            scale: 1.3,
                            rotation: 360,
                            duration: 0.5,
                            ease: "back.out(2)"
                        });
                    });
                    card.addEventListener('mouseleave', () => {
                        gsap.to(emoji, {
                            scale: 1,
                            rotation: 0,
                            duration: 0.3,
                            ease: "power2.out"
                        });
                    });
                });

                // Score card animation
                gsap.fromTo(scoreRef.current,
                    { opacity: 0, y: 60, scale: 0.8 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 1,
                        ease: "elastic.out(1, 0.6)",
                        scrollTrigger: {
                            trigger: scoreRef.current,
                            start: "top 80%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );

                // Progress bar animation
                const progressBar = scoreRef.current?.querySelector('.progress-bar');
                gsap.fromTo(progressBar,
                    { width: "0%", opacity: 0 },
                    {
                        width: "95%",
                        opacity: 1,
                        duration: 2.5,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: scoreRef.current,
                            start: "top 70%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );

                // Score number count-up
                const scoreNumber = scoreRef.current?.querySelector('.score-number');
                if (scoreNumber) {
                    gsap.fromTo(scoreNumber,
                        { innerText: 0 },
                        {
                            innerText: 95,
                            duration: 2.5,
                            snap: { innerText: 1 },
                            scrollTrigger: {
                                trigger: scoreRef.current,
                                start: "top 70%",
                                toggleActions: "play none none reverse"
                            },
                            onUpdate: function() {
                                scoreNumber.textContent = Math.round(this.targets()[0].innerText) + "%";
                            }
                        }
                    );
                }

                // Quote animation
                gsap.fromTo(quoteRef.current,
                    { opacity: 0, y: 40 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1.2,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: quoteRef.current,
                            start: "top 85%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );

                // Closing text animation
                gsap.fromTo(closingRef.current,
                    { opacity: 0, scale: 0.9 },
                    {
                        opacity: 1,
                        scale: 1,
                        duration: 1,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: closingRef.current,
                            start: "top 90%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );

                // Parallax effect on glow
                gsap.to('.cinematic-glow', {
                    y: -100,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1
                    }
                });

            }, sectionRef);

            return () => ctx.revert();
        }, []);

        const activities = [
            { emoji: "🚣", name: "Kayaking", participants: 6 },
            { emoji: "🧠", name: "Trivia Night", participants: 12 },
            { emoji: "🎬", name: "Movie Club", participants: 8 },
            { emoji: "☕", name: "Coffee Meetup", participants: 4 },
            { emoji: "🎨", name: "Art Workshop", participants: 10 },
            { emoji: "🎸", name: "Jam Sessions", participants: 5 },
        ];

        return (
            <section
                ref={ref}
                className={`chapter pb-10 pt-10 relative min-h-screen flex items-center justify-center overflow-hidden transition-colors duration-700 ${darkMode
                    ? "bg-gradient-to-br from-purple-900 via-pink-800 to-yellow-700 text-white"
                    : "bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 text-gray-900"
                    }`}
            >
                <div className="absolute inset-0 bg-black/20 pointer-events-none" />

                {/* Animated Connection Network Background */}
                <div className="absolute inset-0 pointer-events-none">
                    <ConnectionNetworkSVG darkMode={darkMode} />
                </div>

                <div ref={sectionRef} className="relative z-10 px-6 max-w-6xl w-full">
                    {/* Chapter Header */}
                    <div ref={headerRef} className="text-center mb-16">
                        <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
                            The Tribe Found
                        </h1>
                        <p
                            className={`text-lg md:text-xl italic opacity-80 ${darkMode ? "text-gray-300" : "text-gray-700"
                                }`}
                        >
                            Where connections became community.
                        </p>

                        <div className="mt-8 ">
                            <CommunitySVG darkMode={darkMode} />
                        </div>
                    </div>

                    {/* Activities */}
                    <div ref={activitiesRef} className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12">
                        {activities.map((activity, index) => (
                            <div
                                key={activity.name}
                                className={`activity-card rounded-xl p-5 border text-center backdrop-blur-md shadow-lg transition-all cursor-pointer ${darkMode
                                    ? "bg-white/10 border-white/20 hover:bg-white/20"
                                    : "bg-white/80 border-gray-200 hover:bg-white"
                                    }`}
                            >
                                <div className="activity-emoji text-4xl mb-2">{activity.emoji}</div>
                                <h3 className="font-semibold text-sm mb-1">{activity.name}</h3>
                                <p
                                    className={`text-xs ${darkMode ? "text-white/70" : "text-gray-600"
                                        }`}
                                >
                                    {activity.participants} friends
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Social Score */}
                    <div
                        ref={scoreRef}
                        className={`max-w-md mx-auto mb-16 rounded-2xl p-6 shadow-2xl backdrop-blur-xl ${darkMode
                            ? "bg-white/10 border border-white/20"
                            : "bg-white/80 border border-gray-200"
                            }`}
                    >
                        <h3 className="font-semibold text-center text-lg mb-4">
                            Social Score Journey
                        </h3>
                        <div className="relative">
                            <div
                                className={`flex justify-between text-sm mb-2 ${darkMode ? "text-white/60" : "text-gray-600"
                                    }`}
                            >
                                <span>0</span>
                                <span>50</span>
                                <span>100</span>
                            </div>

                            <div
                                className={`w-full h-3 rounded-full overflow-hidden ${darkMode ? "bg-white/20" : "bg-gray-200"
                                    }`}
                            >
                                <div
                                    className="progress-bar h-full bg-gradient-to-r from-green-400 via-yellow-400 to-pink-400 rounded-full"
                                    style={{ width: "0%" }}
                                />
                            </div>

                            <div className="text-center mt-4">
                                <span className="score-number text-3xl font-bold text-green-400">0%</span>
                                <p
                                    className={`text-sm mt-1 ${darkMode ? "text-white/80" : "text-gray-700"
                                        }`}
                                >
                                    Community Builder
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Quote */}
                    <div ref={quoteRef}>
                        <AnimatedQuote
                            quote="MeetMux didn't give me friends. It gave me community."
                            author="Alex"
                            className={`max-w-3xl mx-auto ${darkMode ? "text-white" : "text-gray-800"
                                }`}
                        />
                    </div>

                    {/* Closing Text */}
                    <div ref={closingRef} className="text-center mt-10">
                        <p
                            className={`text-lg font-light ${darkMode ? "text-white/80" : "text-gray-700"
                                }`}
                        >
                            From 2,000 online connections to a real tribe of adventurers.
                        </p>
                    </div>
                </div>

                {/* Cinematic Glow */}
                <div
                    className={`cinematic-glow absolute -bottom-20 left-1/2 -translate-x-1/2 w-[80%] h-[200px] blur-[120px] opacity-30 rounded-full ${darkMode
                        ? "bg-gradient-to-r from-purple-600 to-yellow-400"
                        : "bg-gradient-to-r from-purple-300 to-yellow-200"
                        }`}
                />
            </section>
        );
    }
);

TribeFoundChapter.displayName = "TribeFoundChapter";
