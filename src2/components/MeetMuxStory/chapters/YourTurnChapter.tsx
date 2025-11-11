"use client";

import { useState, useRef, useEffect, forwardRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface YourTurnChapterProps {
    darkMode: boolean;
}

const YourTurnChapter = forwardRef<HTMLElement, YourTurnChapterProps>(
    ({ darkMode }, ref) => {
        const sectionRef = useRef<HTMLElement>(null);
        const phoneRef = useRef<HTMLDivElement>(null);
        const activitiesRef = useRef<HTMLDivElement>(null);
        const ctaRef = useRef<HTMLDivElement>(null);
        const glowRef = useRef<HTMLDivElement>(null);
        const particlesRef = useRef<HTMLDivElement>(null);
        const titleRef = useRef<HTMLDivElement>(null);
        const [selectedMood, setSelectedMood] = useState<string | null>(null);

        const moods = [
            { emoji: "🌟", label: "Adventurous", activity: "Mountain Hiking" },
            { emoji: "🎨", label: "Creative", activity: "Art Workshop" },
            { emoji: "☕", label: "Social", activity: "Coffee Chat" },
            { emoji: "🧠", label: "Curious", activity: "Trivia Night" },
        ];

        const activities = [
            { icon: "🥾", name: "Hiking", time: "This Weekend" },
            { icon: "🎬", name: "Movies", time: "Tonight" },
            { icon: "☕", name: "Coffee Chat", time: "Tomorrow" },
        ];

        useEffect(() => {
            const section = sectionRef.current;
            if (!section) return;

            const ctx = gsap.context(() => {
                if (titleRef.current) {
                    gsap.fromTo(
                        titleRef.current,
                        { opacity: 0, y: -30 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.8,
                            scrollTrigger: {
                                trigger: titleRef.current,
                                start: "top 80%",
                                toggleActions: "play none none reverse",
                            },
                        }
                    );
                }

                if (glowRef.current) {
                    gsap.to(glowRef.current, {
                        scale: 1.2,
                        opacity: 0.4,
                        duration: 3,
                        repeat: -1,
                        yoyo: true,
                        ease: "sine.inOut",
                    });
                }

                gsap.to(".particle", {
                    y: "random(-50, 50)",
                    x: "random(-30, 30)",
                    duration: "random(2, 4)",
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    stagger: { each: 0.2, from: "random" },
                });

                gsap.from(phoneRef.current, {
                    scrollTrigger: {
                        trigger: phoneRef.current,
                        start: "top 80%",
                        end: "top 30%",
                        scrub: 1,
                    },
                    rotationY: -45,
                    rotationX: 15,
                    scale: 0.8,
                    opacity: 0,
                });

                gsap.to(phoneRef.current, {
                    y: -20,
                    duration: 2.5,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                });

                if (activitiesRef.current) {
                    gsap.fromTo(
                        ".activity-card",
                        { x: 100, opacity: 0, rotationY: 20 },
                        {
                            x: 0,
                            opacity: 1,
                            rotationY: 0,
                            stagger: 0.2,
                            duration: 0.8,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: activitiesRef.current,
                                start: "top 80%",
                                toggleActions: "play none none reverse",
                            },
                        }
                    );
                }

                if (ctaRef.current) {
                    gsap.fromTo(
                        ".cta-button",
                        { scale: 0, rotation: 180, opacity: 0 },
                        {
                            scale: 1,
                            rotation: 0,
                            opacity: 1,
                            stagger: 0.15,
                            duration: 0.8,
                            ease: "back.out(1.7)",
                            scrollTrigger: {
                                trigger: ctaRef.current,
                                start: "top 85%",
                                toggleActions: "play none none reverse",
                            },
                        }
                    );
                }

                gsap.to(".wave-path", {
                    attr: { d: "M0,100 Q25,80 50,100 T100,100 T150,100 T200,100" },
                    duration: 3,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                });

                gsap.to(".circle-orbit", {
                    rotation: 360,
                    duration: 20,
                    repeat: -1,
                    ease: "none",
                    transformOrigin: "50% 50%",
                });
            }, section);

            return () => ctx.revert();
        }, [darkMode]);

        return (
            <section
                ref={(node) => {
                    sectionRef.current = node;
                    if (typeof ref === "function") ref(node);
                    else if (ref) ref.current = node;
                }}
                className={`chapter relative min-h-screen flex items-center justify-center overflow-hidden transition-all duration-700 px-4 sm:px-6 md:px-10 py-16 md:py-20 ${darkMode
                        ? "bg-gradient-to-br from-blue-950 via-purple-900 to-pink-900 text-white"
                        : "bg-gradient-to-br from-blue-200 via-purple-200 to-pink-100 text-gray-900"
                    }`}
            >
                {/* Animated SVG Background */}
                <svg
                    className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#ec4899" stopOpacity="0.3" />
                        </linearGradient>
                    </defs>

                    <path
                        className="wave-path"
                        d="M0,100 Q25,90 50,100 T100,100 T150,100 T200,100"
                        stroke="url(#waveGradient)"
                        strokeWidth="2"
                        fill="none"
                        transform="scale(8)"
                    />

                    <g className="circle-orbit">
                        <circle cx="50%" cy="30%" r="3" fill="#3b82f6" opacity="0.4" />
                        <circle cx="70%" cy="50%" r="2" fill="#ec4899" opacity="0.4" />
                        <circle cx="30%" cy="70%" r="2.5" fill="#8b5cf6" opacity="0.4" />
                    </g>
                </svg>

                {/* Floating particles */}
                <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
                    {[...Array(12)].map((_, i) => (
                        <div
                            key={i}
                            className="particle absolute w-2 h-2 rounded-full"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                background: darkMode
                                    ? "rgba(147, 51, 234, 0.3)"
                                    : "rgba(147, 51, 234, 0.4)",
                            }}
                        />
                    ))}
                </div>

                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-black/20 pointer-events-none" />

                <div className="relative z-10 w-full max-w-6xl text-center space-y-12 sm:space-y-16">
                    {/* Title (Chapter removed) */}
                    <div
                        ref={titleRef}
                        className="space-y-4 md:space-y-6"
                        style={{ opacity: 0, transform: "translateY(-30px)" }}
                    >
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold">
                            Your Turn
                        </h1>
                        <p
                            className={`text-lg sm:text-xl md:text-2xl opacity-80 italic max-w-3xl mx-auto ${darkMode ? "text-gray-300" : "text-gray-700"
                                }`}
                        >
                            Ready to write your own story?
                        </p>
                    </div>

                    {/* Two-column layout */}
                    <div className="grid lg:grid-cols-2 gap-10 md:gap-12 items-center mb-12 md:mb-16">
                        {/* Left: Phone mockup */}
                        <div ref={phoneRef} className="relative mx-auto">
                            <div
                                className={`relative w-56 sm:w-64 h-80 sm:h-96 mx-auto rounded-3xl shadow-2xl ${darkMode ? "bg-black" : "bg-gray-100"
                                    } p-4`}
                            >
                                <div className="absolute inset-0 rounded-3xl blur-xl opacity-50 bg-gradient-to-br from-purple-500 to-pink-500" />

                                <div
                                    className={`relative w-full h-full rounded-2xl overflow-hidden ${darkMode
                                            ? "bg-gradient-to-br from-purple-700 to-pink-600"
                                            : "bg-gradient-to-br from-purple-300 to-pink-300"
                                        }`}
                                >
                                    <div className="p-5 sm:p-6 text-white">
                                        <h3 className="text-lg sm:text-xl font-bold mb-5 sm:mb-6">
                                            MeetMux
                                        </h3>

                                        <div className="mb-6">
                                            <p className="text-sm mb-3">How are you feeling?</p>
                                            <div className="grid grid-cols-2 gap-2">
                                                {moods.map((mood) => (
                                                    <button
                                                        key={mood.label}
                                                        className={`p-3 rounded-lg border transition-all ${selectedMood === mood.label
                                                                ? "bg-white/30 border-white"
                                                                : "bg-white/10 border-white/30"
                                                            } hover:scale-105 active:scale-95`}
                                                        onClick={() => setSelectedMood(mood.label)}
                                                    >
                                                        <div className="text-lg mb-1">{mood.emoji}</div>
                                                        <div className="text-xs">{mood.label}</div>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {selectedMood && (
                                            <div
                                                className="bg-white/20 rounded-lg p-4"
                                                style={{ opacity: 0, transform: "translateY(20px)" }}
                                            >
                                                <div className="text-sm mb-2">Perfect for you:</div>
                                                <div className="font-semibold">
                                                    {moods.find((m) => m.label === selectedMood)?.activity}
                                                </div>
                                                <button className="w-full mt-3 bg-yellow-400 text-black py-2 rounded-lg font-medium hover:scale-105 active:scale-95 transition-transform">
                                                    Join Now
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <svg className="absolute -right-16 lg:-right-20 top-1/2 -translate-y-1/2 w-16 sm:w-24 h-16 sm:h-24 opacity-30 hidden lg:block">
                                <path
                                    d="M 0 50 Q 30 30, 60 50 T 120 50"
                                    stroke={darkMode ? "#8b5cf6" : "#a855f7"}
                                    strokeWidth="2"
                                    fill="none"
                                />
                            </svg>
                        </div>

                        {/* Right: Activity suggestions */}
                        <div ref={activitiesRef} className="space-y-5 sm:space-y-6 text-left">
                            <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-center lg:text-left">
                                Activities Near You
                            </h3>

                            {activities.map((activity) => (
                                <div
                                    key={activity.name}
                                    className="activity-card backdrop-blur-md rounded-xl p-4 flex items-center space-x-4 border transition-all hover:scale-105"
                                    style={{
                                        opacity: 0,
                                        transform: "translateX(100px) rotateY(20deg)",
                                        background: darkMode
                                            ? "rgba(255,255,255,0.1)"
                                            : "rgba(255,255,255,0.8)",
                                        borderColor: darkMode
                                            ? "rgba(255,255,255,0.2)"
                                            : "rgba(0,0,0,0.1)",
                                    }}
                                >
                                    <div className="text-3xl">{activity.icon}</div>
                                    <div className="flex-1">
                                        <h4 className="font-medium text-lg">{activity.name}</h4>
                                        <p className="text-sm opacity-70">{activity.time}</p>
                                    </div>
                                    <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg text-sm hover:scale-105 active:scale-95 transition-transform">
                                        Join
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Ending CTA */}
                    <div ref={ctaRef} className="mt-8">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
                            Stop Scrolling. Start Living.
                        </h2>
                        <p className="text-base sm:text-lg mb-8 max-w-2xl mx-auto opacity-90">
                            Join thousands who've turned their digital connections into
                            real-world adventures.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                className="cta-button bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-full text-base sm:text-lg hover:from-yellow-300 hover:to-orange-300 transition-all duration-300"
                                style={{ opacity: 0, transform: "scale(0) rotate(180deg)" }}
                            >
                                Download MeetMux
                            </button>

                            <button
                                className="cta-button border-2 border-white text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-full text-base sm:text-lg hover:bg-white hover:text-black transition-all duration-300"
                                style={{ opacity: 0, transform: "scale(0) rotate(180deg)" }}
                            >
                                Watch Alex's Story
                            </button>
                        </div>
                    </div>

                    {/* Closing line */}
                    <div className="mt-10 sm:mt-12 opacity-0">
                        <p className="italic opacity-80">
                            Your adventure is just one tap away.
                        </p>
                    </div>
                </div>

                {/* Cinematic glow */}
                <div
                    ref={glowRef}
                    className={`absolute -bottom-20 left-1/2 -translate-x-1/2 w-[90%] sm:w-[80%] h-[160px] sm:h-[200px] blur-[120px] opacity-30 rounded-full ${darkMode
                            ? "bg-gradient-to-r from-blue-600 to-pink-600"
                            : "bg-gradient-to-r from-blue-300 to-pink-300"
                        }`}
                />
            </section>
        );
    }
);

YourTurnChapter.displayName = "YourTurnChapter";
export default YourTurnChapter;

