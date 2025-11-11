"use client";

import { forwardRef, useEffect, useRef } from "react";
import { Compass, Users } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AppMockup from "@/components/ui/AppMockup";
import InteractiveMap from "@/components/ui/InteractiveMap";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const FloatingParticles = () => {
    return (
        <svg
            className="absolute inset-0 w-full h-full pointer-events-none opacity-30"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g className="particles">
                {[...Array(20)].map((_, i) => (
                    <circle
                        key={i}
                        className={`particle-${i} ${i % 2 === 0 ? 'fill-rose-500' : 'fill-amber-500'}`}
                        cx={Math.random() * 100 + "%"}
                        cy={Math.random() * 100 + "%"}
                        r={Math.random() * 3 + 1}
                        opacity={Math.random() * 0.5 + 0.2}
                    />
                ))}
            </g>
        </svg>
    );
};

const AnimatedPath = () => {
    const pathRef = useRef(null);

    useEffect(() => {
        if (pathRef.current) {
            gsap.fromTo(
                pathRef.current,
                { strokeDashoffset: 1000, strokeDasharray: 1000 },
                {
                    strokeDashoffset: 0,
                    duration: 3,
                    ease: "power2.inOut",
                    scrollTrigger: {
                        trigger: pathRef.current,
                        start: "top 80%",
                        end: "bottom 20%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        }
    }, []);

    return (
        <svg
            className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                ref={pathRef}
                d="M 50 50 Q 150 100 250 50 T 450 50 Q 550 100 650 50"
                className="stroke-rose-500"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
            />
        </svg>
    );
};

const ConnectionNodes = () => {
    return (
        <svg
            className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g className="connection-nodes">
                <line
                    className="connection-line-1 stroke-rose-500"
                    x1="20%"
                    y1="30%"
                    x2="80%"
                    y2="70%"
                    strokeWidth="1"
                    opacity="0.5"
                />
                <line
                    className="connection-line-2 stroke-amber-500"
                    x1="80%"
                    y1="30%"
                    x2="20%"
                    y2="70%"
                    strokeWidth="1"
                    opacity="0.5"
                />
                <circle
                    className="node-1 fill-rose-500"
                    cx="20%"
                    cy="30%"
                    r="4"
                />
                <circle
                    className="node-2 fill-amber-500"
                    cx="80%"
                    cy="30%"
                    r="4"
                />
                <circle
                    className="node-3 fill-rose-500"
                    cx="80%"
                    cy="70%"
                    r="4"
                />
                <circle
                    className="node-4 fill-amber-500"
                    cx="20%"
                    cy="70%"
                    r="4"
                />
            </g>
        </svg>
    );
};

interface JourneyContinueProps {
}

const JourneyContinue = forwardRef<HTMLElement, JourneyContinueProps>(
    ({}, ref) => {
        const sectionRef = useRef(null);
        const headerRef = useRef(null);
        const leftColumnRef = useRef(null);
        const rightColumnRef = useRef(null);
        const quoteRef = useRef(null);
        const compassRef = useRef(null);
        const bgOverlayRef = useRef(null);

        useEffect(() => {
            const ctx = gsap.context(() => {
                gsap.to(bgOverlayRef.current, {
                    opacity: 0.3,
                    duration: 1.5,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top center",
                        end: "bottom center",
                        scrub: 1,
                    },
                });

                gsap.fromTo(
                    headerRef.current?.children,
                    { opacity: 0, y: 60, scale: 0.9 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 1.5,
                        stagger: 0.2,
                        ease: "expo.out",
                        scrollTrigger: {
                            trigger: headerRef.current,
                            start: "top 80%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );

                gsap.fromTo(
                    leftColumnRef.current,
                    { opacity: 0, x: -100, rotationY: -15 },
                    {
                        opacity: 1,
                        x: 0,
                        rotationY: 0,
                        duration: 1.5,
                        ease: "expo.out",
                        scrollTrigger: {
                            trigger: leftColumnRef.current,
                            start: "top 75%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );

                gsap.fromTo(
                    rightColumnRef.current,
                    { opacity: 0, x: 100, rotationY: 15 },
                    {
                        opacity: 1,
                        x: 0,
                        rotationY: 0,
                        duration: 1.5,
                        ease: "expo.out",
                        scrollTrigger: {
                            trigger: rightColumnRef.current,
                            start: "top 75%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );

                gsap.to(compassRef.current, {
                    rotation: 360,
                    duration: 3,
                    ease: "none",
                    repeat: -1,
                });

                gsap.fromTo(
                    quoteRef.current,
                    { opacity: 0, y: 30, scale: 0.95 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 1.5,
                        ease: "expo.out",
                        scrollTrigger: {
                            trigger: quoteRef.current,
                            start: "top 85%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );

                gsap.utils.toArray(".particles circle").forEach((circle) => {
                    gsap.to(circle, {
                        y: `${Math.random() * 40 - 20}`,
                        x: `${Math.random() * 40 - 20}`,
                        duration: Math.random() * 3 + 2,
                        repeat: -1,
                        yoyo: true,
                        ease: "sine.inOut",
                        delay: Math.random() * 2,
                    });
                });

                gsap.utils.toArray(".connection-nodes circle").forEach((node, i) => {
                    gsap.to(node, {
                        r: 6,
                        duration: 1.5,
                        repeat: -1,
                        yoyo: true,
                        ease: "sine.inOut",
                        delay: i * 0.3,
                    });
                });

                gsap.to(".connection-line-1, .connection-line-2", {
                    strokeDashoffset: 0,
                    strokeDasharray: "5, 5",
                    duration: 2,
                    repeat: -1,
                    ease: "none",
                });
            }, sectionRef);

            return () => ctx.revert();
        }, []);

        return (
            <section
                ref={(el) => {
                    sectionRef.current = el;
                    if (typeof ref === "function") ref(el);
                    else if (ref) ref.current = el;
                }}
                className="chapter relative min-h-screen flex items-center justify-center overflow-hidden transition-all duration-700 bg-gradient-to-br from-rose-100 via-purple-100 to-amber-100 text-gray-900"
            >
                {/* Background Elements */}
                <FloatingParticles />
                <AnimatedPath />
                <ConnectionNodes />

                {/* Overlay */}
                <div
                    ref={bgOverlayRef}
                    className="absolute inset-0 bg-black/20 pointer-events-none"
                ></div>

                {/* Content */}
                <div className="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 py-16 sm:py-20 max-w-6xl w-full">
                    {/* Header (removed “Chapter 3”) */}
                    <div ref={headerRef} className="text-center mb-12 sm:mb-16">
                        <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-4 sm:mb-6 leading-tight font-display">
                            The Journey Continues
                        </h1>
                        <p className="text-base sm:text-lg md:text-2xl font-light opacity-80 italic max-w-3xl mx-auto px-4 font-sans">
                            Real people. Real plans. Real connections. MeetMux wasn&apos;t just an app — it became a part of everyday life.
                        </p>
                    </div>

                    {/* Responsive Columns */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 lg:gap-16 items-center">
                        {/* Left */}
                        <div ref={leftColumnRef} className="space-y-6 sm:space-y-8">
                            <div className="flex items-center gap-3">
                                <div ref={compassRef}>
                                    <Compass className="w-7 h-7 sm:w-8 sm:h-8 text-rose-500" />
                                </div>
                                <h4 className="font-semibold text-base sm:text-lg md:text-xl font-display">
                                    Discovering More
                                </h4>
                            </div>
                            <p className="text-base sm:text-lg leading-relaxed max-w-prose font-sans">
                                What started as a small meet-up turned into something bigger —
                                weekly hikes, movie nights, and real friendships.
                            </p>

                            <div className="mt-6 sm:mt-8">
                                <h4 className="font-semibold mb-3 sm:mb-4 text-base sm:text-lg font-display">
                                    Friends & Activities Near You:
                                </h4>
                                <InteractiveMap />
                            </div>
                        </div>

                        {/* Right */}
                        <div
                            ref={rightColumnRef}
                            className="flex justify-center w-full max-w-md mx-auto"
                        >
                            <AppMockup screen="activities" />
                        </div>
                    </div>

                    {/* Quote */}
                    <p
                        ref={quoteRef}
                        className="text-center mt-10 sm:mt-12 mb-10 sm:mb-14 text-base sm:text-lg md:text-xl italic opacity-80 leading-relaxed px-4 font-sans"
                    >
                        &quot;What began as an app became the start of something real.&quot;
                    </p>
                </div>
            </section>
        );
    }
);

JourneyContinue.displayName = "JourneyContinue";
export default JourneyContinue;