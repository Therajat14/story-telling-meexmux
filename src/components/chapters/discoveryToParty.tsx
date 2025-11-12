"use client";

import { forwardRef, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Sparkles, MapPin, Users, ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

if (typeof window !== "undefined")
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

interface DiscoveryToPartyChapterProps {
  darkMode: boolean;
}

const DiscoveryToPartyChapter = forwardRef<
  HTMLElement,
  DiscoveryToPartyChapterProps
>(({ darkMode }, ref) => {
  const lineRef = useRef<SVGPathElement>(null);
  const sparkleRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (lineRef.current) {
        const path = lineRef.current;

        gsap.fromTo(
          path,
          { strokeDasharray: 2000, strokeDashoffset: 2000 },
          {
            strokeDashoffset: 0,
            duration: 3,
            ease: "power2.inOut",
            repeat: -1,
            yoyo: true,
          }
        );

        if (sparkleRef.current) {
          gsap.to(sparkleRef.current, {
            duration: 3,
            repeat: -1,
            ease: "power1.inOut",
            yoyo: true,
            motionPath: {
              path,
              align: path,
              alignOrigin: [0.5, 0.5],
            },
          });
        }
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref as any}
      className={`relative flex flex-col items-center justify-center h-screen w-full overflow-hidden transition-all duration-700 ${
        darkMode
          ? "bg-gradient-to-br from-[#0f051f] via-[#150820] to-[#1e0b18] text-white"
          : "bg-gradient-to-br from-white via-pink-50 to-orange-50 text-gray-900"
      }`}
    >
      {/* --- Background Gradient --- */}
      <div className="absolute inset-0 opacity-40 blur-3xl bg-gradient-to-r from-purple-400/20 via-pink-400/20 to-orange-400/20"></div>

      {/* --- Headings Row --- */}
      <div className="grid grid-cols-3 items-center w-full max-w-6xl px-8 mb-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-left bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400">
          The Discovery
        </h2>
        <div></div>
        <h2 className="text-4xl md:text-5xl font-extrabold text-right bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400">
          The Celebration
        </h2>
      </div>

      {/* --- Horizontal Layout --- */}
      <div className="relative grid grid-cols-3 gap-6 items-center justify-center w-full max-w-6xl px-8">
        {/* Left Card */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className={`rounded-3xl p-8 shadow-2xl backdrop-blur-lg relative z-10 border ${
            darkMode
              ? "bg-white/10 border-white/10"
              : "bg-white/80 border-gray-100"
          }`}
        >
          <div className="flex items-center gap-2 mb-3 text-lg font-semibold text-purple-400">
            <MapPin className="w-5 h-5" /> Discover
          </div>
          <p
            className={`text-sm ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Find like-minded people, explore events near you, and spark the
            start of something memorable.
          </p>
        </motion.div>

        {/* Animated Arrow */}
        <div className="relative flex justify-center items-center">
          <svg
            viewBox="0 0 600 150"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-32"
          >
            <defs>
              <linearGradient
                id="arrowGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="50%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#f97316" />
              </linearGradient>
            </defs>
            <path
              ref={lineRef}
              d="M50 75 C 200 0, 400 150, 550 75"
              stroke="url(#arrowGradient)"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <circle
              ref={sparkleRef}
              cx="50"
              cy="75"
              r="7"
              fill="#FFD700"
              className="drop-shadow-[0_0_10px_#FFD700]"
            />
            <ArrowRight
              className="w-8 h-8 text-pink-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse"
              strokeWidth={1.5}
            />
          </svg>
        </div>

        {/* Right Card */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className={`rounded-3xl p-8 shadow-2xl backdrop-blur-lg relative z-10 border ${
            darkMode
              ? "bg-white/10 border-white/10"
              : "bg-white/80 border-gray-100"
          }`}
        >
          <div className="flex items-center gap-2 mb-3 text-lg font-semibold text-orange-400">
            <Users className="w-5 h-5" /> Party
          </div>
          <p
            className={`text-sm ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Turn discovery into memories — gather, celebrate, and make every
            connection count.
          </p>
        </motion.div>
      </div>
    </section>
  );
});

DiscoveryToPartyChapter.displayName = "DiscoveryToPartyChapter";
export default DiscoveryToPartyChapter;
