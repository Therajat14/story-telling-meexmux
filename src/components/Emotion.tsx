import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heart, Sparkles } from "lucide-react";
import Reveal from "./ui/Reveal";

gsap.registerPlugin(ScrollTrigger);

function Emotion() {
  const oldPointsRef = useRef<HTMLParagraphElement[]>([]);
  const newPointsRef = useRef<HTMLParagraphElement[]>([]);
  const comparisonGridRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const leftLineRef = useRef<HTMLDivElement>(null);
  const rightLineRef = useRef<HTMLDivElement>(null);
  const heartRef = useRef<SVGSVGElement>(null);

  // ========== BULLET POINT ANIMATIONS ==========
  useEffect(() => {
    const oldPoints = oldPointsRef.current;
    const newPoints = newPointsRef.current;

    if (oldPoints.length === 0 && newPoints.length === 0) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: comparisonGridRef.current,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });

    if (oldPoints.length > 0) {
      tl.fromTo(
        oldPoints,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 0.6,
          ease: "power3.out",
        },
        0 // Start at the beginning of the timeline
      );
    }

    if (newPoints.length > 0) {
      tl.fromTo(
        newPoints,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 0.6,
          ease: "power3.out",
        },
        0 // Start at the beginning of the timeline, parallel to oldPoints
      );
    }

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      data-scroll-section
      className="min-h-screen flex items-center justify-center py-24 md:py-32 relative overflow-hidden bg-gradient-to-b from-rose-50 via-pink-50 to-amber-50 z-10"
    >
      {/* === Subtle SVG Background === */}
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full opacity-50 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            id="emotionGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#ffb3c1" />
            <stop offset="50%" stopColor="#ffd9a0" />
            <stop offset="100%" stopColor="#ffe4e1" />
          </linearGradient>
        </defs>

        <path
          d="M0 300 Q400 200 800 300 T1600 300"
          fill="none"
          stroke="url(#emotionGradient)"
          strokeWidth="1.5"
          opacity="0.4"
        />
        <path
          d="M0 500 Q500 400 1000 500 T1600 500"
          fill="none"
          stroke="url(#emotionGradient)"
          strokeWidth="1.2"
          opacity="0.3"
        />
        <path
          d="M0 700 Q600 600 1200 700 T1600 700"
          fill="none"
          stroke="url(#emotionGradient)"
          strokeWidth="1.2"
          opacity="0.25"
        />

        {[...Array(12)].map((_, i) => (
          <circle
            key={i}
            cx={i * 140}
            cy={(i % 5) * 180 + 100}
            r={3 + (i % 2)}
            fill="url(#emotionGradient)"
          >
            <animate
              attributeName="cy"
              values={`${(i % 5) * 180 + 100};${(i % 5) * 180 - 50};${
                (i % 5) * 180 + 100
              }`}
              dur={`${3 + i * 0.4}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </svg>

      {/* === Content === */}
      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-20">
          <Reveal>
            <div className="inline-flex items-center space-x-2 px-6 py-2 bg-rose-500 text-white rounded-full text-sm tracking-wide shadow-md font-medium mb-8">
              <Sparkles className="w-4 h-4" />
              <span>THE EMOTION</span>
            </div>
          </Reveal>

          <Reveal>
            <h2
              className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight mb-8"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Because real stories
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-amber-500 to-rose-500 animate-gradient">
                start offline.
              </span>
            </h2>
          </Reveal>

          {/* Animated Divider */}
          <div className="flex items-center justify-center space-x-4 mt-8 overflow-hidden">
            <div
              ref={leftLineRef}
              className="w-20 h-1 bg-gradient-to-r from-transparent via-rose-400 to-transparent rounded-full"
            />
            <Heart
              ref={heartRef}
              className="w-6 h-6 text-rose-400"
              fill="currentColor"
            />
            <div
              ref={rightLineRef}
              className="w-20 h-1 bg-gradient-to-r from-transparent via-rose-400 to-transparent rounded-full"
            />
          </div>
        </div>

        {/* Comparison Section */}
        <div
          ref={comparisonGridRef}
          className="grid md:grid-cols-2 gap-10 mb-24"
        >
          {/* Old Way */}
          <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-3xl p-10 shadow-sm hover:shadow-md transition-all duration-300">
            <h4
              className="text-2xl font-semibold text-gray-600 mb-6 flex items-center space-x-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              <span>😐</span>
              <span>The old way</span>
            </h4>
            <div
              className="space-y-4 text-gray-700 text-lg"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {[
                "Profile pictures",
                "Awkward first dates",
                "Small talk",
                "Wondering about chemistry",
              ].map((text, index) => (
                <p
                  key={text}
                  ref={(el) => (oldPointsRef.current[index] = el!)}
                  className="flex items-start  font-bold font-sans space-x-2"
                >
                  <span className="text-rose-500 mt-1">✗</span>
                  <span>{text}</span>
                </p>
              ))}
            </div>
          </div>

          {/* MeetMux Way */}
          <div className="bg-gradient-to-br from-rose-400 to-amber-400 text-white rounded-3xl p-10 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent group-hover:translate-x-full transition-transform duration-1000" />

            <h4
              className="text-2xl font-semibold mb-6 flex text-gray-100 items-center space-x-2 relative z-10"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              <span>💫</span>
              <span>The MeetMux way</span>
            </h4>

            <div
              className="space-y-4 text-lg relative z-10"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {[
                "Shared activities",
                "Natural meetings",
                "Real conversations",
                "Chemistry reveals itself",
              ].map((text, index) => (
                <p
                  key={text}
                  ref={(el) => (newPointsRef.current[index] = el!)}
                  className="flex items-start font-bold space-x-2"
                >
                  <span className="mt-1 font-bold">✓</span>
                  <span>{text}</span>
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Emotion;
