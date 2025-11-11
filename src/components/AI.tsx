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

  // ========== SECTION PIN + SCROLL BEHAVIOR ==========
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

    return () => {
      tl.kill();
    };
  }, []);

  // ========== FEATURE CARD ENTRANCE ANIMATION ==========
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

  // ========== HEADING GRADIENT ANIMATION ==========
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

  return (
    <section
      ref={sectionRef}
      data-scroll-section
      data-section="ai"
      className="
        min-h-screen 
        flex 
        items-center 
        justify-center 
        py-24 md:py-32 
        relative 
        bg-gradient-to-b 
        from-slate-50 via-blue-50 to-indigo-50 
        overflow-hidden
      "
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          data-speed="0.5"
          className="absolute top-1/4 right-10 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl animate-pulse"
        />
        <div
          data-speed="0.8"
          className="absolute bottom-1/3 left-10 w-80 h-80 bg-rose-300/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        {/* Header Section */}
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
              data-fade
              className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed"
            >
              We bring real, meaningful, in-person connections back into your
              life.
            </p>
          </Reveal>
        </div>

        {/* Features Grid */}
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

        {/* Bottom CTA Indicator (Mobile) */}
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
