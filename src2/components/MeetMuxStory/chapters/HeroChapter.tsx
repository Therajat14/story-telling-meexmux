"use client";

import {
    Smartphone,
    X,
    Heart,
    TrendingDown,
    Users,
    MessageCircle,
} from "lucide-react";
import { useEffect, useRef } from "react";
import SplitType from "split-type";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface HeroChapterProps {
    darkMode?: boolean;
}

export default function HeroChapter({ darkMode = false }: HeroChapterProps) {
    const paragraphRef = useRef<HTMLParagraphElement>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const phoneRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const particlesRef = useRef<SVGSVGElement>(null);
    const wavesRef = useRef<SVGSVGElement>(null);
    const spiralRef = useRef<SVGSVGElement>(null);

    // --- SplitType Word Animation ---
    useEffect(() => {
        if (!paragraphRef.current) return;

        let split: SplitType | null = null;
        let trigger: ScrollTrigger | null = null;

        const initAnimation = () => {
            split = new SplitType(paragraphRef.current!, {
                types: "words",
                wordClass: "word-animate",
            });

            gsap.set(split.words, { opacity: 0.3, y: 15 });

            // Refresh ScrollTrigger after SplitType is done
            setTimeout(() => {
                ScrollTrigger.refresh();
            }, 100);

            trigger = ScrollTrigger.create({
                trigger: paragraphRef.current,
                start: "top 85%",
                end: "bottom 60%",
                scrub: false,
                markers: false,
                onEnter: () => {
                    gsap.to(split!.words, {
                        opacity: 1,
                        y: 0,
                        stagger: 0.05,
                        duration: 0.6,
                        ease: "power2.out",
                    });
                },
                onEnterBack: () => {
                    gsap.to(split!.words, {
                        opacity: 1,
                        y: 0,
                        stagger: 0.05,
                        duration: 0.6,
                        ease: "power2.out",
                    });
                },
            });
        };

        const init = requestAnimationFrame(() => {
            initAnimation();
        });

        return () => {
            cancelAnimationFrame(init);
            trigger?.kill();
            split?.revert();
        };
    }, []);

    // --- Hero-like background animations (particles, waves, spiral) ---
    useEffect(() => {
        const particles = particlesRef.current?.querySelectorAll("circle");
        if (particles) {
            particles.forEach((p, i) => {
                gsap.to(p, {
                    y: -20,
                    x: -10,
                    duration: 3 + Math.random() * 2,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    delay: i * 0.3,
                });
            });
        }

        if (spiralRef.current) {
            gsap.to(spiralRef.current, {
                rotation: 360,
                duration: 30,
                repeat: -1,
                ease: "none",
            });
        }

        const wave1 = wavesRef.current?.querySelector("path:nth-child(1)");
        const wave2 = wavesRef.current?.querySelector("path:nth-child(2)");

        if (wave1) {
            gsap.to(wave1, {
                attr: { d: "M0,60 Q300,40 600,60 T1200,60 L1200,120 L0,120 Z" },
                duration: 2.5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });
        }

        if (wave2) {
            gsap.to(wave2, {
                attr: { d: "M0,80 Q300,60 600,80 T1200,80 L1200,120 L0,120 Z" },
                duration: 2.5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: 0.3,
            });
        }
    }, []);

    // --- Section + Phone fade-in (like HeroChapter intro) ---
    useEffect(() => {
        if (!sectionRef.current || !titleRef.current || !phoneRef.current) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 85%",
                end: "bottom 60%",
                toggleActions: "play none none reverse",
                markers: false,
            },
        });

        tl.fromTo(titleRef.current,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
        )
            .fromTo(phoneRef.current,
                { opacity: 0, scale: 0.8 },
                { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" },
                "-=0.3"
            )
            .fromTo(".stat-card",
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, stagger: 0.1, duration: 0.5 },
                "-=0.2"
            );

        return () => {
            tl.scrollTrigger?.kill();
        };
    }, []);

    // Color configurations based on dark mode
    const bgGradient = darkMode
        ? "bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900"
        : "bg-gradient-to-b from-slate-50 via-blue-50 to-indigo-50";

    const textColor = darkMode ? "text-white" : "text-gray-900";
    const paragraphColor = darkMode ? "text-gray-300" : "text-gray-600";
    const badgeBg = darkMode ? "bg-rose-600" : "bg-rose-500";

    // Phone container colors
    const phoneBg = darkMode ? "bg-slate-800" : "bg-white";
    const phoneBorder = darkMode ? "border-slate-700" : "border-gray-200";
    const phoneIconColor = darkMode ? "text-gray-500" : "text-gray-400";

    // Stat card colors
    const statCardBg = darkMode ? "bg-slate-700" : "bg-gray-50";
    const statCardBorder = darkMode ? "border-slate-600" : "border-gray-200";
    const statCardText = darkMode ? "text-gray-300" : "text-gray-400";
    const statCardNumber = darkMode ? "text-gray-300" : "text-gray-400";
    const statIconColor = darkMode ? "text-gray-400" : "text-gray-400";

    // Connection stat colors
    const connectionCardBg = darkMode ? "bg-red-900/30" : "bg-red-50";
    const connectionCardBorder = darkMode ? "border-red-800" : "border-red-200";
    const connectionText = darkMode ? "text-red-300" : "text-red-700";
    const connectionNumber = darkMode ? "text-red-400" : "text-red-600";
    const connectionIconColor = darkMode ? "text-red-400" : "text-red-500";

    // Swipe button colors
    const swipeRejectBg = darkMode ? "bg-red-900/50" : "bg-red-100";
    const swipeRejectBorder = darkMode ? "border-red-800" : "border-red-200";
    const swipeRejectIcon = darkMode ? "text-red-400" : "text-red-600";

    const swipeAcceptBg = darkMode ? "bg-rose-900/50" : "bg-rose-100";
    const swipeAcceptBorder = darkMode ? "border-rose-800" : "border-rose-200";
    const swipeAcceptIcon = darkMode ? "text-rose-400" : "text-rose-600";

    // Notification badge
    const notificationBg = darkMode ? "bg-rose-600" : "bg-rose-500";

    // CTA button
    const ctaGradient = darkMode
        ? "bg-gradient-to-r from-rose-600 to-amber-600"
        : "bg-gradient-to-r from-rose-500 to-amber-500";
    const ctaBorder = darkMode ? "border-slate-700" : "border-white";

    // Particle colors
    const particleColors = darkMode
        ? ["#8b5cf6", "#ec4899", "#06b6d4"]
        : ["#7e22ce", "#be123c", "#0d9488"];

    const italicTextColor = darkMode ? "text-gray-400" : "text-gray-500";

    return (
        <section
            ref={sectionRef}
            data-section="problem"
            className={`min-h-screen flex items-center justify-center py-24 md:py-32 relative overflow-hidden transition-colors duration-700 ${bgGradient}`}
        >
            {/* Animated Background */}
            <svg
                ref={particlesRef}
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ opacity: darkMode ? 0.2 : 0.3 }}
            >
                {Array.from({ length: 8 }).map((_, i) => (
                    <circle
                        key={i}
                        cx={`${10 + i * 10}%`}
                        cy={`${20 + i * 5}%`}
                        r={Math.random() * 3 + 2}
                        fill={particleColors[i % particleColors.length]}
                    />
                ))}
            </svg>

            <svg
                ref={spiralRef}
                className="absolute top-1/4 right-5 w-24 h-24 pointer-events-none"
                viewBox="0 0 100 100"
                style={{ opacity: darkMode ? 0.15 : 0.2 }}
            >
                <path
                    d="M50,50 Q60,30 70,40 T80,60 Q75,75 60,75 T40,65 Q35,50 45,40"
                    fill="none"
                    stroke={particleColors[0]}
                    strokeWidth="2"
                />
            </svg>

            <svg
                ref={wavesRef}
                className="absolute bottom-0 left-0 w-full h-24 pointer-events-none"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
                style={{ opacity: darkMode ? 0.1 : 0.15 }}
            >
                <path
                    d="M0,60 Q300,20 600,60 T1200,60 L1200,120 L0,120 Z"
                    fill={particleColors[0]}
                />
                <path
                    d="M0,80 Q300,40 600,80 T1200,80 L1200,120 L0,120 Z"
                    fill={particleColors[1]}
                />
            </svg>

            {/* Content */}
            <div className="container mx-auto px-6 relative z-10 max-w-7xl">
                <div className="grid md:grid-cols-2 gap-20 lg:gap-24 items-center">
                    {/* LEFT */}
                    <div>
                        <div className={`inline-block px-6 py-2 ${badgeBg} text-white rounded-full text-sm font-medium shadow-lg mb-6`}>
                            THE PROBLEM
                        </div>
                        <h2
                            ref={titleRef}
                            className={`text-4xl md:text-6xl lg:text-7xl font-bold ${textColor} leading-tight mb-8`}
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            We stopped meeting new people naturally.
                        </h2>
                        <p
                            ref={paragraphRef}
                            className={`text-lg md:text-xl ${paragraphColor} leading-relaxed`}
                        >
                            We used to meet through <strong>moments</strong> — a shared laugh
                            at a coffee shop, a spontaneous plan at the gym, a common hobby at
                            a meetup.
                        </p>
                    </div>

                    {/* RIGHT */}
                    <div className="relative flex justify-center">
                        <div
                            ref={phoneRef}
                            className={`relative ${phoneBg} rounded-3xl p-10 shadow-2xl flex flex-col items-center justify-center space-y-6 w-full max-w-md border ${phoneBorder}`}
                        >
                            <div className="relative">
                                <Smartphone className={`w-32 h-32 ${phoneIconColor}`} strokeWidth={1} />

                                {/* Swipe Buttons */}
                                <div className="absolute -right-6 top-1/4 animate-pulse">
                                    <div className={`w-10 h-10 ${swipeRejectBg} rounded-full flex items-center justify-center border-2 ${swipeRejectBorder}`}>
                                        <X className={`w-5 h-5 ${swipeRejectIcon}`} />
                                    </div>
                                </div>

                                <div
                                    className="absolute -left-6 top-1/4 animate-pulse"
                                    style={{ animationDelay: "0.5s" }}
                                >
                                    <div className={`w-10 h-10 ${swipeAcceptBg} rounded-full flex items-center justify-center border-2 ${swipeAcceptBorder}`}>
                                        <Heart className={`w-5 h-5 ${swipeAcceptIcon}`} />
                                    </div>
                                </div>

                                <div className={`absolute -top-2 -right-2 w-6 h-6 ${notificationBg} rounded-full flex items-center justify-center text-white text-xs font-bold animate-bounce`}>
                                    99+
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="text-center space-y-4 w-full">
                                <div className="grid grid-cols-2 gap-3">
                                    <div className={`stat-card ${statCardBg} rounded-xl p-4 border ${statCardBorder}`}>
                                        <Users className={`w-4 h-4 ${statIconColor} mx-auto mb-1`} />
                                        <div className={`text-3xl font-bold ${statCardNumber}`}>500+</div>
                                        <p className={`text-xs ${statCardText}`}>Swipes today</p>
                                    </div>

                                    <div className={`stat-card ${statCardBg} rounded-xl p-4 border ${statCardBorder}`}>
                                        <MessageCircle className={`w-4 h-4 ${statIconColor} mx-auto mb-1`} />
                                        <div className={`text-3xl font-bold ${statCardNumber}`}>12</div>
                                        <p className={`text-xs ${statCardText}`}>Matches</p>
                                    </div>
                                </div>

                                <div className={`stat-card ${connectionCardBg} border ${connectionCardBorder} rounded-xl p-4`}>
                                    <div className="flex items-center justify-center space-x-2">
                                        <TrendingDown className={`w-5 h-5 ${connectionIconColor}`} />
                                        <div className={`text-2xl font-bold ${connectionNumber}`}>0</div>
                                    </div>
                                    <p className={`text-sm ${connectionText} font-medium`}>
                                        Real connections
                                    </p>
                                </div>

                                <p className={`${italicTextColor} text-base italic`}>
                                    "Scrolling... But feeling disconnected"
                                </p>
                            </div>

                            <div className="hidden md:block absolute -bottom-10 left-1/2 transform -translate-x-1/2">
                                <div className={`${ctaGradient} text-white px-6 py-3 rounded-full text-sm font-bold shadow-xl border-2 ${ctaBorder} animate-pulse`}>
                                    There's a better way →
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
