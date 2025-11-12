"use client";

import { forwardRef, useEffect, useRef } from "react";
import { Compass } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AppMockup from "../ui/AppMockup";
import InteractiveMap from "../ui/InteractiveMap";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const FloatingParticles = ({ darkMode }) => (
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none opacity-30"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g className="particles">
      {[...Array(20)].map((_, i) => (
        <circle
          key={i}
          className={`particle-${i}`}
          cx={Math.random() * 100 + "%"}
          cy={Math.random() * 100 + "%"}
          r={Math.random() * 3 + 1}
          fill={darkMode ? "#fff" : "#9ca3af"}
          opacity={Math.random() * 0.5 + 0.2}
        />
      ))}
    </g>
  </svg>
);

const AnimatedPath = ({ darkMode }) => {
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
            start: "top 85%",
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
        stroke={darkMode ? "#ec4899" : "#a78bfa"}
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
};

const ConnectionNodes = ({ darkMode }) => (
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g className="connection-nodes">
      <line
        x1="20%"
        y1="30%"
        x2="80%"
        y2="70%"
        stroke={darkMode ? "#8b5cf6" : "#a5b4fc"}
        strokeWidth="1"
        opacity="0.5"
      />
      <line
        x1="80%"
        y1="30%"
        x2="20%"
        y2="70%"
        stroke={darkMode ? "#ec4899" : "#fbcfe8"}
        strokeWidth="1"
        opacity="0.5"
      />
      <circle cx="20%" cy="30%" r="4" fill={darkMode ? "#8b5cf6" : "#a5b4fc"} />
      <circle cx="80%" cy="30%" r="4" fill={darkMode ? "#ec4899" : "#fbcfe8"} />
      <circle cx="80%" cy="70%" r="4" fill={darkMode ? "#8b5cf6" : "#a5b4fc"} />
      <circle cx="20%" cy="70%" r="4" fill={darkMode ? "#ec4899" : "#fbcfe8"} />
    </g>
  </svg>
);

interface JourneyContinueProps {
  darkMode: boolean;
}

const JourneyContinueChapter = forwardRef<HTMLElement, JourneyContinueProps>(
  ({ darkMode }, ref) => {
    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const leftColumnRef = useRef(null);
    const rightColumnRef = useRef(null);
    const quoteRef = useRef(null);
    const compassRef = useRef(null);
    const bgOverlayRef = useRef(null);

    useEffect(() => {
      const ctx = gsap.context(() => {
        // Soft background glow
        gsap.to(bgOverlayRef.current, {
          opacity: 0.3,
          duration: 1.5,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
            end: "bottom 10%",
            scrub: true,
          },
        });

        // Header fade-in
        gsap.fromTo(
          headerRef.current?.children,
          { opacity: 0, y: 60, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Left column slide
        gsap.fromTo(
          leftColumnRef.current,
          { opacity: 0, x: -100 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: leftColumnRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Right column slide
        gsap.fromTo(
          rightColumnRef.current,
          { opacity: 0, x: 100 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: rightColumnRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Compass rotation
        gsap.to(compassRef.current, {
          rotation: 360,
          duration: 3,
          ease: "none",
          repeat: -1,
        });

        // Quote fade-in
        gsap.fromTo(
          quoteRef.current,
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: quoteRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Floating particles animation
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
      }, sectionRef);

      return () => ctx.revert();
    }, [darkMode]);

    return (
      <section
        ref={(el) => {
          sectionRef.current = el;
          if (typeof ref === "function") ref(el);
          else if (ref) ref.current = el;
        }}
        data-scroll-section
        className={`relative min-h-screen flex items-center justify-center overflow-hidden transition-all duration-700 ${
          darkMode
            ? "bg-gradient-to-br from-blue-300 via-purple-300 to-pink-300 text-white"
            : "bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 text-gray-900"
        }`}
      >
        {/* Background Elements */}
        <FloatingParticles darkMode={darkMode} />
        <AnimatedPath darkMode={darkMode} />
        <ConnectionNodes darkMode={darkMode} />

        {/* Overlay */}
        <div
          ref={bgOverlayRef}
          className="absolute inset-0 pointer-events-none"
        ></div>

        {/* Content */}
        <div className="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 py-20 sm:py-24 max-w-6xl w-full">
          {/* Header */}
          <div ref={headerRef} className="text-center mb-12 sm:mb-16">
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 sm:mb-6 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              The Journey Continues
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl font-light opacity-80 italic max-w-3xl mx-auto px-4">
              Real people. Real plans. Real connections. MeetMux wasn&apos;t
              just an app — it became part of everyday life.
            </p>
          </div>

          {/* Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 lg:gap-16 items-center">
            {/* Left */}
            <div ref={leftColumnRef} className="space-y-6 sm:space-y-8">
              <div className="flex items-center gap-3">
                <div ref={compassRef}>
                  <Compass className="w-8 h-8 text-pink-400" />
                </div>
                <h4
                  className="font-semibold text-lg md:text-xl"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Discovering More
                </h4>
              </div>
              <p className="text-base sm:text-lg leading-relaxed max-w-prose">
                What started as a small meet-up turned into something bigger —
                weekly hikes, movie nights, and real friendships.
              </p>

              <div className="mt-6 sm:mt-8 border border-gray-300 rounded-lg p-3">
                <h4
                  className="font-semibold mb-3 text-lg"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Friends & Activities Near You:
                </h4>
                <InteractiveMap darkMode={darkMode} />
              </div>
            </div>

            {/* Right */}
            <div
              ref={rightColumnRef}
              className="flex justify-center w-full max-w-md mx-auto"
            >
              <AppMockup screen="activities" darkMode={darkMode} />
            </div>
          </div>

          {/* Quote */}
          <p
            ref={quoteRef}
            className="text-center mt-12 mb-10 text-lg md:text-xl italic opacity-80 leading-relaxed px-4"
          >
            &quot;What began as an app became the start of something real.&quot;
          </p>
        </div>
      </section>
    );
  }
);

JourneyContinueChapter.displayName = "JourneyContinueChapter";
export default JourneyContinueChapter;
