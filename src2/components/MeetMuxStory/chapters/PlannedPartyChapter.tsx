"use client";

import { motion } from "framer-motion";
import { Calendar, Users } from "lucide-react";
import { forwardRef, useEffect, useRef } from "react";

interface PlannedPartyChapterProps {
    darkMode: boolean;
}

const PlannedPartyChapter = forwardRef<HTMLElement, PlannedPartyChapterProps>(
    ({ darkMode }, ref) => {
        const contentRef = useRef(null);
        const cardRef = useRef(null);
        const svgRef = useRef(null);

        useEffect(() => {
            const script1 = document.createElement("script");
            script1.src =
                "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js";
            script1.async = true;

            const script2 = document.createElement("script");
            script2.src =
                "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js";
            script2.async = true;

            document.body.appendChild(script1);
            document.body.appendChild(script2);

            script2.onload = () => {
                const gsap = (window as any).gsap;
                const ScrollTrigger = (window as any).ScrollTrigger;

                if (gsap && ScrollTrigger) {
                    gsap.registerPlugin(ScrollTrigger);

                    gsap.fromTo(
                        contentRef.current,
                        {
                            opacity: 0,
                            y: 100,
                            scale: 0.9,
                        },
                        {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            duration: 1.2,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: contentRef.current,
                                start: "top 80%",
                                end: "top 20%",
                                toggleActions: "play none none reverse",
                            },
                        }
                    );

                    gsap.to(cardRef.current, {
                        scrollTrigger: {
                            trigger: cardRef.current,
                            start: "top 60%",
                            end: "bottom 40%",
                            scrub: 1,
                            onUpdate: (self) => {
                                const progress = self.progress;
                                const rotateX = (progress - 0.5) * 10;
                                const rotateY = (progress - 0.5) * 5;
                                gsap.to(cardRef.current, {
                                    rotateX,
                                    rotateY,
                                    duration: 0.1,
                                });
                            },
                        },
                    });

                    const particles = document.querySelectorAll(".particle");
                    particles.forEach((particle, i) => {
                        gsap.to(particle, {
                            y: "random(-100, 100)",
                            x: "random(-50, 50)",
                            rotation: "random(-180, 180)",
                            scale: "random(0.5, 1.5)",
                            opacity: "random(0.3, 1)",
                            duration: "random(3, 6)",
                            repeat: -1,
                            yoyo: true,
                            ease: "sine.inOut",
                            delay: i * 0.2,
                        });
                    });

                    const confetti = document.querySelectorAll(".confetti");
                    confetti.forEach((conf, i) => {
                        gsap.to(conf, {
                            y: "+=600",
                            rotation: "random(-360, 360)",
                            opacity: 0,
                            duration: "random(2, 4)",
                            repeat: -1,
                            delay: i * 0.3,
                            ease: "power1.in",
                        });
                    });

                    gsap.to(".glow-effect", {
                        scale: 1.2,
                        opacity: 0.6,
                        duration: 2,
                        repeat: -1,
                        yoyo: true,
                        ease: "sine.inOut",
                    });
                }
            };

            return () => {
                document.body.removeChild(script1);
                document.body.removeChild(script2);
            };
        }, []);

        return (
            <section
                ref={ref}
                className={`chapter relative min-h-screen flex items-center justify-center overflow-hidden transition-all duration-700 px-4 sm:px-6 md:px-8 py-16 md:py-20 ${darkMode
                        ? "bg-gradient-to-br from-orange-950 via-red-900 to-pink-900 text-white"
                        : "bg-gradient-to-br from-orange-100 via-red-200 to-pink-100 text-gray-900"
                    }`}
            >
                {/* Animated SVG Background */}
                <svg
                    ref={svgRef}
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {[...Array(15)].map((_, i) => (
                        <circle
                            key={`particle-${i}`}
                            className="particle"
                            cx={`${(i * 7) % 100}%`}
                            cy={`${(i * 13) % 100}%`}
                            r={Math.random() * 3 + 1}
                            fill={
                                darkMode
                                    ? "rgba(255, 165, 0, 0.4)"
                                    : "rgba(255, 87, 51, 0.4)"
                            }
                        />
                    ))}

                    {[...Array(20)].map((_, i) => (
                        <rect
                            key={`confetti-${i}`}
                            className="confetti"
                            x={`${(i * 5) % 100}%`}
                            y={`${-20 - (i * 10) % 30}%`}
                            width="8"
                            height="12"
                            fill={[
                                "#FF6B6B",
                                "#4ECDC4",
                                "#45B7D1",
                                "#FFA07A",
                                "#98D8C8",
                            ][i % 5]}
                            opacity="0.8"
                        />
                    ))}

                    <g className="glow-effect" opacity="0.3">
                        <circle
                            cx="20%"
                            cy="30%"
                            r="100"
                            fill="none"
                            stroke={darkMode ? "#FF6347" : "#FF4500"}
                            strokeWidth="2"
                        />
                        <circle
                            cx="80%"
                            cy="70%"
                            r="150"
                            fill="none"
                            stroke={darkMode ? "#FFA500" : "#FF8C00"}
                            strokeWidth="2"
                        />
                    </g>

                    <path
                        d="M 0 50 Q 25 30 50 50 T 100 50"
                        fill="none"
                        stroke={
                            darkMode
                                ? "rgba(255, 192, 203, 0.3)"
                                : "rgba(255, 105, 180, 0.3)"
                        }
                        strokeWidth="3"
                        className="party-path"
                    >
                        <animate
                            attributeName="d"
                            dur="5s"
                            repeatCount="indefinite"
                            values="
                M 0 50 Q 25 30 50 50 T 100 50;
                M 0 50 Q 25 70 50 50 T 100 50;
                M 0 50 Q 25 30 50 50 T 100 50
              "
                        />
                    </path>
                </svg>

                <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>

                {/* Content */}
                <div
                    ref={contentRef}
                    className="relative z-10 w-full max-w-6xl text-center space-y-10 sm:space-y-12"
                    style={{ perspective: "1000px" }}
                >
                    {/* Title */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold">
                            The Planned Party
                        </h1>
                        <p
                            className={`text-lg sm:text-xl md:text-2xl italic opacity-80 max-w-3xl mx-auto ${darkMode ? "text-gray-300" : "text-gray-700"
                                }`}
                        >
                            From solo scrolling to hosting 12 people. What a turnaround.
                        </p>
                    </motion.div>

                    {/* Event Card */}
                    <motion.div
                        ref={cardRef}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                        className={`rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl mx-auto max-w-3xl transition-all ${darkMode ? "bg-white/10" : "bg-white/80"
                            }`}
                        style={{ transformStyle: "preserve-3d" }}
                    >
                        {/* Header */}
                        <div className="flex flex-wrap items-center justify-between mb-6 gap-3">
                            <div className="flex items-center gap-3">
                                <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-orange-400" />
                                <h3 className="text-xl sm:text-2xl font-bold">
                                    Create Your Event
                                </h3>
                            </div>
                            <Users className="w-6 h-6 sm:w-8 sm:h-8 text-orange-400" />
                        </div>

                        {/* Event Details */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                            {[
                                { icon: "🍕", label: "Food & Drinks" },
                                { icon: "🎵", label: "Music & Vibes" },
                                { icon: "🏠", label: "Venue Ready" },
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.2, duration: 0.6 }}
                                    viewport={{ once: true }}
                                    className={`rounded-2xl p-5 sm:p-6 transform hover:scale-105 transition-all cursor-pointer shadow-lg ${darkMode
                                            ? "bg-gradient-to-br from-orange-700 to-red-700 text-white"
                                            : "bg-gradient-to-br from-orange-400 to-red-400 text-white"
                                        }`}
                                >
                                    <div className="text-3xl sm:text-4xl mb-2">{item.icon}</div>
                                    <p className="font-medium">{item.label}</p>
                                </motion.div>
                            ))}
                        </div>

                        {/* Publish Button */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 sm:py-4 rounded-xl shadow-xl text-base sm:text-lg transition-transform"
                        >
                            🎉 Publish Event
                        </motion.button>

                        {/* Live Status */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 1.2, duration: 0.8 }}
                            viewport={{ once: true }}
                            className="mt-5 sm:mt-6 flex items-center justify-center gap-2"
                        >
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <p className="text-sm font-medium text-green-400">
                                Your Event is Live!
                            </p>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Cinematic Glow */}
                <div
                    className={`absolute -bottom-20 left-1/2 -translate-x-1/2 w-[90%] sm:w-[80%] h-[160px] sm:h-[200px] blur-[120px] opacity-30 rounded-full ${darkMode
                            ? "bg-gradient-to-r from-orange-600 to-pink-600"
                            : "bg-gradient-to-r from-orange-300 to-pink-300"
                        }`}
                ></div>
            </section>
        );
    }
);

PlannedPartyChapter.displayName = "PlannedPartyChapter";
export default PlannedPartyChapter;

