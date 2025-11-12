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

const FloatingParticles = ({ darkMode }: { darkMode: boolean }) => (
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none opacity-30"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g className="particles">
      {[...Array(20)].map((_, i) => (
        <circle
          key={i}
          cx={Math.random() * 100 + "%"}
          cy={Math.random() * 100 + "%"}
          r={Math.random() * 3 + 1}
          fill={darkMode ? "#fff" : "#9ca3af"}
          opacity={Math.random() * 0.5 + 0.3}
        />
      ))}
    </g>
  </svg>
);

const AnimatedPath = ({ darkMode }: { darkMode: boolean }) => {
  const pathRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    if (!pathRef.current) return;

    const animation = gsap.fromTo(
      pathRef.current,
      { strokeDasharray: 1000, strokeDashoffset: 1000 },
      {
        strokeDashoffset: 0,
        duration: 2.5,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: pathRef.current,
          start: "top 90%",
          end: "bottom 50%",
          toggleActions: "play none none reverse",
        },
      }
    );

    return () => animation.kill();
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

const ConnectionNodes = ({ darkMode }: { darkMode: boolean }) => (
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
        opacity="0.4"
      />
      <line
        x1="80%"
        y1="30%"
        x2="20%"
        y2="70%"
        stroke={darkMode ? "#ec4899" : "#fbcfe8"}
        strokeWidth="1"
        opacity="0.4"
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
    const sectionRef = useRef<HTMLElement | null>(null);
    const headerRef = useRef<HTMLDivElement | null>(null);
    const leftColumnRef = useRef<HTMLDivElement | null>(null);
    const rightColumnRef = useRef<HTMLDivElement | null>(null);
    const quoteRef = useRef<HTMLParagraphElement | null>(null);
    const compassRef = useRef<SVGElement | null>(null);
    const bgOverlayRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      const ctx = gsap.context(() => {
        // Background overlay soft fade
        gsap.to(bgOverlayRef.current, {
          opacity: 0.25,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "center center",
            scrub: true,
          },
        });

        // Header fade-in
        gsap.from(headerRef.current?.children, {
          opacity: 0,
          y: 50,
          scale: 0.95,
          duration: 1,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });

        // Left + Right column slides
        gsap.from(leftColumnRef.current, {
          opacity: 0,
          x: -80,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: leftColumnRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });

        gsap.from(rightColumnRef.current, {
          opacity: 0,
          x: 80,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: rightColumnRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });

        // Compass infinite rotation
        gsap.to(compassRef.current, {
          rotation: 360,
          repeat: -1,
          duration: 4,
          ease: "none",
        });

        // Quote fade-in
        gsap.from(quoteRef.current, {
          opacity: 0,
          y: 40,
          scale: 0.95,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: quoteRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        });

        // Floating particles soft drift
        gsap.utils.toArray(".particles circle").forEach((circle) => {
          gsap.to(circle, {
            x: `${Math.random() * 30 - 15}`,
            y: `${Math.random() * 30 - 15}`,
            duration: Math.random() * 3 + 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
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
        {/* Background visual layers */}
        <FloatingParticles darkMode={darkMode} />
        <AnimatedPath darkMode={darkMode} />
        <ConnectionNodes darkMode={darkMode} />

        <div
          ref={bgOverlayRef}
          className="absolute inset-0 pointer-events-none"
        ></div>

        {/* Content */}
        <div className="relative z-10 px-6 md:px-12 py-20 md:py-24 max-w-6xl w-full">
          {/* Header */}
          <div ref={headerRef} className="text-center mb-12 md:mb-16">
            <h1
              className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              The Journey Continues
            </h1>
            <p className="text-lg md:text-2xl font-light italic opacity-80 max-w-3xl mx-auto px-4">
              Real people. Real plans. Real connections. MeetMux wasn&apos;t
              just an app — it became part of everyday life.
            </p>
          </div>

          {/* Grid Columns */}
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Left Column */}
            <div ref={leftColumnRef} className="space-y-6 md:space-y-8">
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
              <p className="text-base md:text-lg leading-relaxed">
                What started as a small meet-up turned into something bigger —
                weekly hikes, movie nights, and real friendships.
              </p>

              <div className="mt-6 md:mt-8 border border-gray-300 rounded-lg p-4">
                <h4
                  className="font-semibold mb-3 text-lg"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Friends & Activities Near You:
                </h4>
                <InteractiveMap darkMode={darkMode} />
              </div>
            </div>

            {/* Right Column */}
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
            className="text-center mt-12 text-lg md:text-xl italic opacity-80 leading-relaxed px-4"
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
