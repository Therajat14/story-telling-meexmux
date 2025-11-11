"use client";

import { motion } from "framer-motion";
import { forwardRef, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined" && gsap.core.globals().ScrollTrigger == null) {
    gsap.registerPlugin(ScrollTrigger);
}

interface FooterProps {
    darkMode: boolean;
}

const Footer = forwardRef<HTMLElement, FooterProps>(({ darkMode }, ref) => {
    const footerRef = useRef<HTMLElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);
    const particlesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const footer = footerRef.current;
        if (!footer) return;

        const ctx = gsap.context(() => {
            // Background glow pulse
            gsap.to(glowRef.current, {
                scale: 1.3,
                opacity: 0.5,
                duration: 4,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });

            // Floating particles movement
            gsap.to(".particle", {
                y: "random(-40, 40)",
                x: "random(-30, 30)",
                duration: "random(3, 6)",
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                stagger: { each: 0.2, from: "random" },
            });

            // Footer fade-in on scroll
            gsap.fromTo(
                footerRef.current,
                { opacity: 0, y: 100 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: footerRef.current,
                        start: "top 95%",
                        toggleActions: "play none none reverse",
                    },
                }
            );

            // Animate SVG waves
            gsap.to(".wave-path", {
                attr: { d: "M0,100 Q25,80 50,100 T100,100 T150,100 T200,100" },
                duration: 3,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });

            // Rotate orbiting circles
            gsap.to(".circle-orbit", {
                rotation: 360,
                duration: 30,
                repeat: -1,
                ease: "none",
                transformOrigin: "50% 50%",
            });

            setTimeout(() => ScrollTrigger.refresh(), 200);
        }, footer);

        return () => ctx.revert();
    }, [darkMode]);

    return (
        <motion.footer
            ref={(node) => {
                footerRef.current = node;
                if (typeof ref === "function") ref(node);
                else if (ref)
                    (ref as React.MutableRefObject<HTMLElement | null>).current = node;
            }}
            className={`relative overflow-hidden w-full py-24 text-center transition-colors duration-700 ${darkMode
                    ? "bg-gradient-to-t from-black via-purple-950 to-blue-950 text-white"
                    : "bg-gradient-to-t from-gray-100 via-purple-100 to-blue-100 text-gray-900"
                }`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
        >
            {/* Animated SVG background */}
            <svg
                className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <linearGradient id="footerWave" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop
                            offset="0%"
                            stopColor={darkMode ? "#6366f1" : "#60a5fa"}
                            stopOpacity="0.3"
                        />
                        <stop
                            offset="100%"
                            stopColor={darkMode ? "#ec4899" : "#f472b6"}
                            stopOpacity="0.3"
                        />
                    </linearGradient>
                </defs>

                {/* Wave line animation */}
                <path
                    className="wave-path"
                    d="M0,100 Q25,90 50,100 T100,100 T150,100 T200,100"
                    stroke="url(#footerWave)"
                    strokeWidth="2"
                    fill="none"
                    transform="scale(8)"
                />

                {/* Orbiting dots */}
                <g className="circle-orbit">
                    <circle cx="40%" cy="30%" r="2.5" fill="#8b5cf6" opacity="0.4" />
                    <circle cx="60%" cy="50%" r="2" fill="#ec4899" opacity="0.4" />
                    <circle cx="50%" cy="70%" r="3" fill="#3b82f6" opacity="0.4" />
                </g>
            </svg>

            {/* Floating glow */}
            <div
                ref={glowRef}
                className={`absolute -top-10 left-1/2 -translate-x-1/2 w-[60%] h-[300px] blur-[120px] opacity-40 rounded-full ${darkMode
                        ? "bg-gradient-to-r from-indigo-600 to-pink-600"
                        : "bg-gradient-to-r from-blue-300 to-pink-300"
                    }`}
            />

            {/* Floating particles */}
            <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
                {[...Array(15)].map((_, i) => (
                    <div
                        key={i}
                        className="particle absolute w-2 h-2 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            background: darkMode
                                ? "rgba(147, 51, 234, 0.4)"
                                : "rgba(147, 51, 234, 0.5)",
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-6">
                {/* “Share Your Story” Section */}
                <motion.div
                    className="mb-12"
                    initial={{ y: 40, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                >
                    <h2
                        className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"
                            }`}
                    >
                        Share Your Story
                    </h2>
                    <p
                        className={`text-base md:text-lg mb-6 ${darkMode ? "text-white/70" : "text-gray-700"
                            }`}
                    >
                        Have your own MeetMux transformation story? We’d love to hear it.
                    </p>
                    <motion.button
                        className={`px-8 py-3 rounded-full font-medium text-white text-base md:text-lg shadow-lg transition-all duration-300 ${darkMode
                                ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400"
                                : "bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400"
                            }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Tell Your Story
                    </motion.button>
                </motion.div>

                {/* Divider + Legal Links */}
                <motion.div
                    className={`pt-8 border-t ${darkMode ? "border-white/20" : "border-gray-300"
                        }`}
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                >
                    <p
                        className={`text-sm ${darkMode ? "text-white/60" : "text-gray-600"
                            }`}
                    >
                        © 2024 MeetMux. Stop scrolling. Start living.
                    </p>

                    <div className="flex justify-center space-x-6 mt-4">
                        {["Privacy", "Terms", "Contact"].map((link) => (
                            <a
                                key={link}
                                href="#"
                                className={`text-sm transition-colors ${darkMode
                                        ? "text-white/60 hover:text-white"
                                        : "text-gray-600 hover:text-gray-900"
                                    }`}
                            >
                                {link}
                            </a>
                        ))}
                    </div>
                </motion.div>
            </div>
        </motion.footer>
    );
});

Footer.displayName = "Footer";
export default Footer;

