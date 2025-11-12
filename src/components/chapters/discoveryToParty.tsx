"use client";

import { forwardRef, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Sparkles, MapPin, Calendar, Users } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

interface DiscoveryToPartyChapterProps {
  darkMode: boolean;
}

const DiscoveryToPartyChapter = forwardRef<
  HTMLElement,
  DiscoveryToPartyChapterProps
>(({ darkMode }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const discoveryRef = useRef<HTMLDivElement>(null);
  const partyRef = useRef<HTMLDivElement>(null);
  const connectorRef = useRef<SVGLineElement>(null);
  const sparkleRef = useRef<SVGCircleElement>(null);
  const cardRef = useRef(null);
  const partyCardRef = useRef(null);
  const discoverySparkRef = useRef(null);

  const discoveryInView = useInView(discoverySparkRef, {
    once: false,
    amount: 0.3,
  });
  const cardInView = useInView(cardRef, { once: false, amount: 0.3 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray(".x-section");

      // === Horizontal Scroll Setup ===
      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (sections.length - 1),
          end: () => `+=${containerRef.current!.offsetWidth}`,
        },
      });

      // === Connector Line Animation (horizontal) ===
      if (connectorRef.current && sparkleRef.current) {
        const lineLength = connectorRef.current.getTotalLength();
        gsap.set(connectorRef.current, {
          strokeDasharray: lineLength,
          strokeDashoffset: lineLength,
        });

        gsap.to(connectorRef.current, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "left left",
            end: "right right",
            scrub: 1.5,
          },
        });

        gsap.to(sparkleRef.current, {
          motionPath: {
            path: connectorRef.current,
            align: connectorRef.current,
            alignOrigin: [0.5, 0.5],
          },
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // === Floating Particles ===
      gsap.utils.toArray(".particle").forEach((particle: any, i) => {
        gsap.to(particle, {
          y: "random(-80,80)",
          x: "random(-50,50)",
          rotation: "random(-180,180)",
          scale: "random(0.5,1.5)",
          duration: "random(3,6)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.2,
        });
      });

      // === Party Card Tilt ===
      gsap.to(partyCardRef.current, {
        scrollTrigger: {
          trigger: partyCardRef.current,
          start: "left 70%",
          end: "right 50%",
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            gsap.to(partyCardRef.current, {
              rotateX: (progress - 0.5) * 10,
              rotateY: (progress - 0.5) * 5,
              duration: 0.1,
            });
          },
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
      className={`relative w-full overflow-hidden h-screen transition-all duration-1000 ${
        darkMode
          ? "bg-gradient-to-br from-purple-900 via-pink-900 to-orange-900 text-white"
          : "bg-gradient-to-br from-purple-200 via-pink-200 to-orange-200 text-gray-900"
      }`}
    >
      {/* Shared Background */}
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
        {[...Array(10)].map((_, i) => (
          <circle
            key={i}
            className="particle"
            cx={`${(i * 10) % 100}%`}
            cy={`${(i * 12) % 100}%`}
            r="2"
            fill="url(#sharedGradient)"
            opacity="0.5"
          />
        ))}
      </svg>

      {/* Horizontal Scroll Container */}
      <div
        ref={containerRef}
        className="flex flex-nowrap h-full w-[200vw] overflow-visible"
      >
        {/* === DISCOVERY SECTION === */}
        <div
          ref={discoveryRef}
          className="x-section w-screen h-full flex flex-col items-center justify-center text-center px-8"
        >
          <motion.div
            ref={discoverySparkRef}
            initial={{ rotate: 0, opacity: 0, scale: 0.5 }}
            animate={
              discoveryInView
                ? { rotate: 360, opacity: 1, scale: 1 }
                : { rotate: 0, opacity: 0, scale: 0.5 }
            }
            transition={{ duration: 1 }}
          >
            <Sparkles className="w-16 h-16 mx-auto mb-6 text-yellow-300" />
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-extrabold mb-8">
            The Discovery
          </h2>

          <motion.div
            ref={cardRef}
            initial={{ y: 60, opacity: 0 }}
            animate={cardInView ? { y: 0, opacity: 1 } : { y: 60, opacity: 0 }}
            transition={{ duration: 0.8 }}
            className={`rounded-3xl p-8 shadow-2xl backdrop-blur-xl mx-auto max-w-2xl ${
              darkMode ? "bg-white/10" : "bg-white/80"
            }`}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-2xl">✓</span>
                </div>
                <div>
                  <p className="font-bold">Alex Chen</p>
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

            <motion.div
              initial={{ opacity: 0 }}
              animate={cardInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 text-white relative"
            >
              <p className="font-bold mb-2">🏔️ Weekend Mountain Trail</p>
              <p className="text-sm mb-4 opacity-90">
                Saturday 9 AM · 2.3 miles away
              </p>
              <button className="w-full bg-white text-green-600 font-bold py-3 rounded-xl shadow-lg">
                Join Live Activity
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* === CONNECTOR ANIMATION === */}
        <div className="x-section relative flex items-center justify-center w-screen h-full">
          <svg
            className="absolute inset-0 w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              ref={connectorRef}
              x1="10%"
              y1="50%"
              x2="90%"
              y2="50%"
              stroke="url(#sharedGradient)"
              strokeWidth="6"
              strokeLinecap="round"
              className="glow-line"
            />
            <circle
              ref={sparkleRef}
              cx="10%"
              cy="50%"
              r="8"
              fill="#FFD700"
              className="connector-sparkle drop-shadow-lg"
            />
          </svg>

          <div className="text-3xl font-semibold text-center z-10">
            The journey continues →
          </div>
        </div>

        {/* === PARTY SECTION === */}
        <div
          ref={partyRef}
          className="x-section w-screen h-full flex flex-col items-center justify-center text-center px-8"
        >
          <h2 className="text-5xl md:text-6xl font-extrabold mb-6">
            The Planned Party
          </h2>
          <p
            className={`text-lg md:text-xl italic mb-10 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            From solo scrolling to hosting 12 people. What a turnaround.
          </p>

          <motion.div
            ref={partyCardRef}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className={`rounded-3xl p-8 shadow-2xl backdrop-blur-xl mx-auto max-w-2xl ${
              darkMode ? "bg-white/10" : "bg-white/80"
            }`}
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Calendar className="w-6 h-6 text-orange-400" />
                <h3 className="text-2xl font-bold">Create Your Event</h3>
              </div>
              <Users className="w-6 h-6 text-orange-400" />
            </div>

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
                  transition={{ delay: i * 0.2 }}
                  className={`rounded-2xl p-6 cursor-pointer hover:scale-105 transition-all shadow-lg ${
                    darkMode
                      ? "bg-gradient-to-br from-orange-700 to-red-700 text-white"
                      : "bg-gradient-to-br from-orange-400 to-red-400 text-white"
                  }`}
                >
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <p className="font-medium">{item.label}</p>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 rounded-xl shadow-xl"
            >
              🎉 Publish Event
            </motion.button>

            <div className="mt-6 flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <p className="text-sm font-medium text-green-400">
                Your Event is Live!
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

DiscoveryToPartyChapter.displayName = "DiscoveryToPartyChapter";
export default DiscoveryToPartyChapter;
