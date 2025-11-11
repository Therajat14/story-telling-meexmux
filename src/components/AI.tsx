import { useEffect, useRef } from "react";
import { Sparkles, Shield, Zap, Activity } from "lucide-react";
import Reveal from "./ui/Reveal";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function AI() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const featureRefs = useRef<HTMLDivElement[]>([]);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const gradientSpanRef = useRef<HTMLSpanElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const features = [
    {
      icon: Zap,
      title: "Smart Matching",
      description:
        "Our AI matches you with people who share your interests and are nearby, making connections more meaningful.",
      color: "from-rose-400 to-pink-500",
    },
    {
      icon: Shield,
      title: "AI Verification",
      description:
        "AI-powered selfie verification ensures authentic connections. Meet real people, not fake profiles.",
      color: "from-amber-400 to-orange-500",
    },
    {
      icon: Activity,
      title: "Activity-First Platform",
      description:
        "Discover people around you based on real-time and planned activities like sports, movies, or travel.",
      color: "from-emerald-400 to-teal-500",
    },
  ];

  // === SECTION PINNING ===
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        pin: true,
      },
    });
    return () => tl.kill();
  }, []);

  // === FEATURE FADE-IN ===
  useEffect(() => {
    if (featureRefs.current.length > 0) {
      gsap.fromTo(
        featureRefs.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: featureRefs.current[0].parentElement,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, []);

  // === HEADING ENTRANCE + GRADIENT ===
  useEffect(() => {
    if (headingRef.current && gradientSpanRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
          end: "bottom top",
          scrub: 1,
        },
      });

      tl.fromTo(
        headingRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      ).fromTo(
        gradientSpanRef.current,
        { backgroundPosition: "200% 0" },
        { backgroundPosition: "-200% 0", duration: 2, ease: "none" },
        "<"
      );
    }
  }, []);

  // === ENHANCED SVG YOYO MOTION ===
  useEffect(() => {
    if (svgRef.current && sectionRef.current) {
      const tl = gsap.timeline({
        repeat: -1,
        yoyo: true,
        paused: true,
        defaults: { ease: "power2.inOut", duration: 2 },
      });

      // Define motion stages (multi-axis)
      tl.to(svgRef.current, { x: 200, y: -150, scale: 1.25, rotation: 10 })
        .to(svgRef.current, { x: -180, y: 120, scale: 1.05, rotation: -6 })
        .to(svgRef.current, { x: 0, y: 0, scale: 1, rotation: 0 });

      // Link timeline progress to scroll position
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => tl.progress(self.progress),
      });

      return () => {
        tl.kill();
        ScrollTrigger.getAll().forEach((st) => st.kill());
      };
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      data-scroll-section
      data-section="ai"
      className="min-h-screen flex items-center justify-center py-24 md:py-32 relative overflow-hidden bg-gradient-to-b from-slate-50 via-blue-50 to-indigo-50"
    >
      {/* === AI SVG BACKGROUND === */}
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full opacity-70 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="ai-flow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff80b5" />
            <stop offset="40%" stopColor="#ffd080" />
            <stop offset="100%" stopColor="#80ffea" />
          </linearGradient>

          <filter id="soft-glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Neural curves */}
        <g
          stroke="url(#ai-flow)"
          strokeWidth="1.5"
          fill="none"
          filter="url(#soft-glow)"
        >
          <path d="M0 200 Q400 50 800 200 T1600 200" opacity="0.4" />
          <path d="M0 400 Q300 250 600 400 T1200 400" opacity="0.3" />
          <path d="M0 600 Q500 450 1000 600 T1600 600" opacity="0.35" />
          <path d="M0 800 Q400 700 800 800 T1600 800" opacity="0.25" />
        </g>

        {/* Circuit connectors */}
        <g
          stroke="url(#ai-flow)"
          strokeWidth="1"
          opacity="0.25"
          filter="url(#soft-glow)"
        >
          <line x1="100" y1="150" x2="700" y2="800" />
          <line x1="400" y1="100" x2="1200" y2="900" />
          <line x1="800" y1="300" x2="1500" y2="700" />
          <line x1="300" y1="700" x2="1100" y2="200" />
        </g>

        {/* Moving data particles */}
        <g fill="url(#ai-flow)" filter="url(#soft-glow)">
          {[...Array(14)].map((_, i) => (
            <circle key={i} cx={i * 120} cy={(i % 5) * 200 + 100} r="6">
              <animate
                attributeName="cy"
                values={`${(i % 5) * 200 + 100};${(i % 5) * 200 - 200};${
                  (i % 5) * 200 + 100
                }`}
                dur={`${3 + i * 0.4}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
        </g>

        {/* Glowing nodes */}
        <g fill="url(#ai-flow)" filter="url(#soft-glow)">
          {[...Array(20)].map((_, i) => (
            <circle
              key={i}
              cx={(i * 120) % 1600}
              cy={(i * 220) % 900}
              r={3 + (i % 3)}
              opacity="0.6"
            >
              <animate
                attributeName="r"
                values="3;6;3"
                dur={`${2 + i * 0.3}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
        </g>
      </svg>

      {/* === Floating Glow Orbs === */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-10 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/3 left-10 w-80 h-80 bg-rose-300/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      {/* === MAIN CONTENT === */}
      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <div className="text-center mb-20">
          <Reveal>
            <div className="inline-flex items-center space-x-2 px-6 py-2 bg-rose-500 text-white rounded-full text-sm tracking-wide font-medium shadow-lg mb-8">
              <Sparkles className="w-4 h-4" />
              <span>POWERED BY AI</span>
            </div>
          </Reveal>

          <Reveal>
            <h2
              ref={headingRef}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-8"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              MeetMux is an AI-powered,
              <br />
              <span
                ref={gradientSpanRef}
                className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-amber-500 to-rose-500"
              >
                activity-first social platform
              </span>
            </h2>
          </Reveal>

          <Reveal index={1}>
            <p
              ref={headingRef}
              className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed"
            >
              We bring real, meaningful, in-person connections back into your
              life.
            </p>
          </Reveal>
        </div>

        {/* === FEATURE CARDS === */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                ref={(el) => (featureRefs.current[index] = el!)}
                className="group bg-white rounded-3xl p-8 shadow-lg border border-transparent hover:border-rose-400 hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 transform transition-transform group-hover:rotate-12 group-hover:scale-110 animate-pulse-slow`}
                >
                  <Icon className="w-8 h-8 text-white" strokeWidth={2} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* === MOBILE CTA === */}
        <div className="md:hidden text-center mt-12">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-rose-500 to-amber-500 text-white px-6 py-3 rounded-full text-sm font-bold shadow-xl animate-pulse">
            <span>See how it works</span>
            <span>→</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AI;
