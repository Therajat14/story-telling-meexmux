"use client";

import { forwardRef, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Sparkles, MapPin, Calendar, Users, ArrowRight } from "lucide-react";
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
  const sectionRef = useRef<HTMLElement>(null);
  const discoveryRef = useRef<HTMLDivElement>(null);
  const partyCardRef = useRef<HTMLDivElement>(null);
  const arrowPathRef = useRef<SVGPathElement>(null);
  const arrowDotRef = useRef<SVGCircleElement>(null);
  const discoverySparkRef = useRef(null);
  const cardRef = useRef(null);

  const discoveryInView = useInView(discoverySparkRef, {
    once: false,
    amount: 0.3,
  });
  const cardInView = useInView(cardRef, { once: false, amount: 0.3 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Smooth scroll arrow motion
      if (arrowPathRef.current && arrowDotRef.current) {
        const path = arrowPathRef.current;
        const dot = arrowDotRef.current;

        gsap.set(dot, {
          motionPath: { path, align: path, alignOrigin: [0.5, 0.5], start: 0 },
        });

        gsap.to(dot, {
          motionPath: { path, align: path, alignOrigin: [0.5, 0.5], end: 1 },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top center",
            end: "bottom center",
            scrub: 1.5,
          },
          ease: "power2.inOut",
        });
      }

      // Floating particles
      gsap.utils.toArray(".particle").forEach((particle: any, i) => {
        gsap.to(particle, {
          y: "random(-100,100)",
          x: "random(-50,50)",
          rotation: "random(-180,180)",
          scale: "random(0.5,1.5)",
          opacity: "random(0.3,1)",
          duration: "random(3,6)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.2,
        });
      });

      // Confetti animation
      gsap.utils.toArray(".confetti").forEach((conf: any, i) => {
        gsap.to(conf, {
          y: "+=600",
          rotation: "random(-360,360)",
          opacity: 0,
          duration: "random(2,4)",
          repeat: -1,
          delay: i * 0.3,
          ease: "power1.in",
        });
      });

      // Subtle tilt animation
      ScrollTrigger.create({
        trigger: partyCardRef.current,
        start: "top 90%",
        end: "bottom 70%",
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress - 0.5;
          gsap.to(partyCardRef.current, {
            rotateX: progress * 8,
            rotateY: progress * 5,
            duration: 0.1,
          });
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={(node) => {
        sectionRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      }}
      className={`relative flex flex-col items-center justify-center overflow-hidden py-32 min-h-screen transition-all duration-1000 ${
        darkMode
          ? "bg-gradient-to-br from-[#0f051f] via-[#150820] to-[#1e0b18] text-white"
          : "bg-gradient-to-br from-white via-pink-50 to-orange-50 text-gray-900"
      }`}
    >
      {/* === BACKGROUND PARTICLES === */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-30"
        style={{ opacity: 0.3 }}
      >
        <defs>
          <linearGradient
            id="sharedGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="50%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>
        </defs>

        {[...Array(12)].map((_, i) => (
          <circle
            key={i}
            className="particle"
            cx={`${(i * 9) % 100}%`}
            cy={`${(i * 13) % 100}%`}
            r="2"
            fill="url(#sharedGradient)"
            opacity="0.5"
          />
        ))}

        {[...Array(15)].map((_, i) => (
          <rect
            key={i}
            className="confetti"
            x={`${(i * 7) % 100}%`}
            y={`${-10 - ((i * 8) % 20)}%`}
            width="6"
            height="10"
            fill={["#FF6B6B", "#4ECDC4", "#FFB347", "#45B7D1"][i % 4]}
            opacity="0.8"
          />
        ))}
      </svg>

      {/* === HEADINGS === */}
      <div className="w-full max-w-6xl grid grid-cols-2 items-center mb-16 px-8">
        <h2 className="text-5xl md:text-6xl font-extrabold font-display leading-tight">
          The Discovery
        </h2>
        <h2 className="text-5xl md:text-6xl font-extrabold font-display text-right leading-tight">
          The Planned Party
        </h2>
      </div>

      {/* === MAIN CONTENT === */}
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-12 items-center px-8 relative">
        {/* LEFT CARD */}
        <motion.div
          ref={cardRef}
          initial={{ y: 60, opacity: 0 }}
          animate={cardInView ? { y: 0, opacity: 1 } : { y: 60, opacity: 0 }}
          transition={{ duration: 0.8 }}
          className={`rounded-3xl p-8 shadow-2xl backdrop-blur-xl min-h-[460px] flex flex-col justify-between ${
            darkMode
              ? "bg-white/10 border border-white/10"
              : "bg-white/80 border border-gray-200"
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-2xl">✓</span>
                </div>
                <div>
                  <p className="font-bold text-lg">Alex Chen</p>
                  <p
                    className={`text-sm ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Verified · 3 interests
                  </p>
                </div>
              </div>
              <MapPin className="w-6 h-6 text-purple-400 animate-bounce" />
            </div>

            <div className="flex flex-wrap gap-2 mb-6 justify-center">
              {["🏔️ Hiking", "🎬 Indie Films", "🎲 Board Games"].map(
                (tag, i) => (
                  <motion.span
                    key={i}
                    initial={{ scale: 0 }}
                    animate={cardInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ delay: 0.2 * i }}
                    className="px-4 py-2 bg-purple-500 text-white rounded-full text-sm font-medium shadow-lg"
                  >
                    {tag}
                  </motion.span>
                )
              )}
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 text-white mt-auto">
            <p className="font-bold mb-2 text-lg">🏔️ Weekend Trail</p>
            <p className="text-sm mb-4 opacity-90">Sat 9 AM · 2.3 miles away</p>
            <button className="w-full bg-white text-green-600 font-bold py-3 rounded-xl shadow-lg">
              Join Activity
            </button>
          </div>
        </motion.div>

        {/* CENTER ARROW PATH */}
        <div className="hidden md:flex justify-center items-center relative h-full w-full">
          <svg
            viewBox="0 0 600 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="max-w-60 h-48"
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
              ref={arrowPathRef}
              d="M50 100 C 200 0, 400 200, 550 100"
              stroke="url(#arrowGradient)"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <circle
              ref={arrowDotRef}
              cx="50"
              cy="100"
              r="8"
              fill="#FFD700"
              className="drop-shadow-[0_0_10px_#FFD700]"
            />
            <ArrowRight
              className="absolute top-[45%] left-1/2 -translate-x-1/2 text-pink-500 opacity-70"
              strokeWidth={1.5}
            />
          </svg>
        </div>

        {/* RIGHT CARD */}
        <motion.div
          ref={partyCardRef}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className={`rounded-3xl p-8 shadow-2xl backdrop-blur-xl min-h-[460px] flex flex-col justify-between ${
            darkMode
              ? "bg-white/10 border border-white/10"
              : "bg-white/80 border border-gray-200"
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Calendar className="w-6 h-6 text-orange-400" />
                <h3 className="text-2xl font-bold">Create Your Event</h3>
              </div>
              <Users className="w-6 h-6 text-orange-400" />
            </div>

            <div className="grid grid-rows-3 gap-4 ">
              {[
                { icon: "🍕", label: "Food" },
                { icon: "🎵", label: "Music" },
                { icon: "🏠", label: "Venue" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2 }}
                  className={`rounded-2xl p-2 text-center  shadow-lg ${
                    darkMode
                      ? "bg-gradient-to-br from-orange-700 to-red-700 text-white"
                      : "bg-gradient-to-br from-orange-400 to-red-400 text-white"
                  }`}
                >
                  <div className="text-3xl inline  mb-2">{item.icon}</div>
                  <p className="font-medium inline">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 rounded-xl shadow-xl"
          >
            Publish Event
          </motion.button>
        </motion.div>
      </div>

      {/* === FOOTER PARAGRAPH === */}
      <div className="mt-20 text-center max-w-3xl px-8">
        <p
          className={`text-lg md:text-xl italic leading-relaxed ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          From discovery to celebration — turning moments into memories.
        </p>
      </div>
    </section>
  );
});

DiscoveryToPartyChapter.displayName = "DiscoveryToPartyChapter";
export default DiscoveryToPartyChapter;
