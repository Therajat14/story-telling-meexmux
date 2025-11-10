import { useEffect, useRef } from "react";
import { Heart, Sparkles } from "lucide-react";
import SplitType from "split-type";
import { gsap } from "gsap";
import Reveal from "./ui/Reveal";
import { Avatar, AvatarImage } from "./ui/avatar";

function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // Small delay to ensure DOM is ready
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
          stagger: 0.03,
        });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      data-scroll-section
      className="min-h-screen flex items-center justify-center py-24 md:py-32 relative overflow-hidden"
    >
      {/* Animated background gradients */}
      <div
        data-scroll
        data-scroll-speed="-2"
        data-parallax="-0.5"
        className="absolute inset-0 bg-gradient-to-br from-peach-100 via-lavender-50 to-sage-100 opacity-60"
      />

      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          data-parallax="2"
          className="absolute top-20 left-10 w-32 h-32 bg-rose-300/20 rounded-full blur-2xl"
        />
        <div
          data-parallax="-1.5"
          className="absolute top-1/3 right-20 w-48 h-48 bg-amber-300/20 rounded-full blur-3xl"
        />
        <div
          data-parallax="1"
          className="absolute bottom-1/4 left-1/4 w-40 h-40 bg-purple-300/20 rounded-full blur-2xl"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center max-w-7xl">
        {/* Heart icon with animation hook */}
        <div className="mb-8 flex justify-center" data-animation="hero-heart">
          <div className="relative">
            <Heart
              className="w-16 h-16 text-rose-400"
              strokeWidth={1.5}
              fill="currentColor"
            />
            <Sparkles className="w-6 h-6 text-amber-400 absolute -top-2 -right-2 animate-pulse" />
          </div>
        </div>

        {/* Main title */}
        <Reveal>
          <h1
            ref={titleRef}
            className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6 text-gray-900"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            MEETMUX
          </h1>
        </Reveal>
        <div ref={subtitleRef}>
          {/* Animated subtitle */}
          <div data-animation="hero-subtitle">
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

            {/* Trust indicators */}
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
      </div>

      {/* Scroll indicator */}
      <div
        data-scroll
        data-scroll-speed="2"
        data-animation="scroll-indicator"
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
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
