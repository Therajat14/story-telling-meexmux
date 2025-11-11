import { useEffect, useRef } from "react";
import { Heart, Sparkles } from "lucide-react";
import SplitType from "split-type";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "./ui/Reveal";
import { Avatar, AvatarImage } from "./ui/avatar";

gsap.registerPlugin(ScrollTrigger);

function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const heartRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // Initial animations
  useEffect(() => {
    const timer = setTimeout(() => {
      if (titleRef.current) {
        const split = new SplitType(titleRef.current, { types: "chars" });
        gsap.from(split.chars, {
          opacity: 0,
          y: 100,
          stagger: 0.03,
          duration: 0.8,
          ease: "power3.out",
        });
      }

      if (subtitleRef.current) {
        gsap.from(subtitleRef.current, {
          opacity: 0,
          y: 30,
          delay: 0.8,
          duration: 1,
          ease: "power2.out",
        });
      }
    }, 100);

    // Scroll-based pin and parallax
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        pin: true,
      },
    });

    tl.to(heartRef.current, {
      y: window.innerHeight / 2,
      ease: "none",
    });

    return () => {
      clearTimeout(timer);
      tl.kill();
    };
  }, []);

  // === Romantic SVG background motion ===
  useEffect(() => {
    if (svgRef.current && sectionRef.current) {
      const tl = gsap.timeline({
        repeat: -1,
        yoyo: true,
        paused: true,
        defaults: { ease: "power2.inOut", duration: 2 },
      });

      tl.to(svgRef.current, { x: 120, y: -80, scale: 1.1, rotation: 6 })
        .to(svgRef.current, { x: -100, y: 60, scale: 1.05, rotation: -4 })
        .to(svgRef.current, { x: 0, y: 0, scale: 1, rotation: 0 });

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
      className="min-h-screen flex items-center justify-center py-24 md:py-32 relative overflow-hidden bg-gradient-to-br from-rose-50 via-peach-50 to-amber-50"
    >
      {/* === Warm “Connection Flow” SVG background === */}
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full opacity-80 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient
            id="love-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#ff80b5" />
            <stop offset="40%" stopColor="#ffb680" />
            <stop offset="100%" stopColor="#ffd580" />
          </linearGradient>

          <filter id="glow-soft">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Flowing connection curves */}
        <g
          stroke="url(#love-gradient)"
          strokeWidth="2"
          fill="none"
          filter="url(#glow-soft)"
        >
          <path d="M0 300 Q400 150 800 300 T1600 300" opacity="0.3" />
          <path d="M0 500 Q300 350 600 500 T1200 500" opacity="0.25" />
          <path d="M0 700 Q500 550 1000 700 T1600 700" opacity="0.2" />
        </g>

        {/* Floating heart-like particles */}
        <g fill="url(#love-gradient)" filter="url(#glow-soft)">
          {[...Array(12)].map((_, i) => (
            <circle
              key={i}
              cx={i * 130}
              cy={(i % 5) * 150 + 100}
              r={5 + (i % 3)}
              opacity="0.7"
            >
              <animate
                attributeName="cy"
                values={`${(i % 5) * 150 + 100};${(i % 5) * 150 - 100};${
                  (i % 5) * 150 + 100
                }`}
                dur={`${3 + i * 0.4}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
        </g>

        {/* Soft linking arcs to resemble emotional connections */}
      </svg>

      {/* === Floating warm orbs === */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-rose-200/30 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 left-16 w-72 h-72 bg-amber-200/40 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      {/* === Main Content === */}
      <div className="container mx-auto px-6 relative z-10 text-center max-w-7xl">
        {/* Heart icon */}
        <div ref={heartRef} className="mb-8 flex justify-center">
          <div className="relative">
            <Heart
              className="w-16 h-16 text-rose-400"
              strokeWidth={1.5}
              fill="currentColor"
            />
            <Sparkles className="w-6 h-6 text-amber-400 absolute -top-2 -right-2 animate-pulse" />
          </div>
        </div>

        {/* Title */}
        <Reveal>
          <h1
            ref={titleRef}
            className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6 text-gray-900"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            MEETMUX
          </h1>
        </Reveal>

        {/* Subtitle */}
        <div ref={subtitleRef}>
          <Reveal>
            <p
              className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-amber-500 mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Where strangers become stories
            </p>
          </Reveal>

          <Reveal index={1}>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Meet through moments, not matches.
            </p>
          </Reveal>

          {/* Community indicators */}
          <div className="mt-12 flex items-center justify-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center space-x-3">
              <div className="flex -space-x-2">
                {[
                  "https://i.pinimg.com/736x/1a/e0/28/1ae0289b4aa8103b3a313b5cd89444dc.jpg",
                  "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/474297bHr/avatar-nam-that-tinh-co-don-dep-nhat_085125633.jpg",
                  "https://img.freepik.com/premium-vector/beauty-girl-avatar-character-simple-vector_855703-381.jpg",
                  "https://static.vecteezy.com/system/resources/thumbnails/030/648/627/small/a-girl-with-long-curly-hair-and-glasses-free-photo.jpg",
                ].map((src, idx) => (
                  <Avatar key={idx} className="ring-white shadow-md">
                    <AvatarImage src={src} alt="member" />
                  </Avatar>
                ))}
              </div>
              <span>1,000+ early members</span>
            </div>
            <div className="hidden md:block w-1 h-1 bg-gray-400 rounded-full" />
            <span className="hidden md:inline">Launching soon</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center space-y-2">
          <span className="text-xs text-gray-400 uppercase tracking-wider">
            Scroll
          </span>
          <svg
            className="w-6 h-6 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}

export default Hero;
