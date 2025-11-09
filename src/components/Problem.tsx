import {
  Smartphone,
  X,
  Heart,
  TrendingDown,
  Users,
  MessageCircle,
} from "lucide-react";
import { useEffect, useRef } from "react";
import SplitType from "split-type";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Problem() {
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!paragraphRef.current) return;

    let split: SplitType | null = null;
    let trigger: ScrollTrigger | null = null;
    let fallbackTimer: NodeJS.Timeout | null = null;

    const timer = setTimeout(() => {
      try {
        // Split the paragraph into words
        split = new SplitType(paragraphRef.current!, {
          types: "words",
          wordClass: "word-animate",
        });

        if (!split.words || split.words.length === 0) {
          console.warn("No words found to animate");
          return;
        }

        // Set initial state - words start visible but slightly offset
        gsap.set(split.words, {
          opacity: 0.3, // Start partially visible as fallback
          y: 15,
        });

        // Wait for ScrollTrigger to be ready
        ScrollTrigger.refresh();

        // Create ScrollTrigger animation
        trigger = ScrollTrigger.create({
          trigger: paragraphRef.current,
          start: "top 85%",
          end: "top 50%",
          scroller: "[data-scroll-container]",
          onEnter: () => {
            gsap.to(split!.words, {
              opacity: 1,
              y: 0,
              stagger: 0.05, // 50ms delay between each word
              duration: 0.6,
              ease: "power2.out",
            });
          },
          onEnterBack: () => {
            gsap.to(split!.words, {
              opacity: 1,
              y: 0,
              stagger: 0.05,
              duration: 0.6,
              ease: "power2.out",
            });
          },
          once: false, // Allow re-animation
        });

        // Fallback: if ScrollTrigger doesn't work, animate after delay
        fallbackTimer = setTimeout(() => {
          if (split && split.words) {
            const currentOpacity = gsap.getProperty(split.words[0], "opacity");
            if (currentOpacity === 0.3) {
              // Animation didn't trigger, so animate manually
              gsap.to(split.words, {
                opacity: 1,
                y: 0,
                stagger: 0.05,
                duration: 0.6,
                ease: "power2.out",
              });
            }
          }
        }, 2000);
      } catch (error) {
        console.error("Error setting up word animation:", error);
        // Ensure text is visible even if animation fails
        if (paragraphRef.current) {
          paragraphRef.current.style.opacity = "1";
        }
      }
    }, 800);

    return () => {
      clearTimeout(timer);
      if (fallbackTimer) {
        clearTimeout(fallbackTimer);
      }
      if (trigger) {
        trigger.kill();
      }
      if (split) {
        try {
          split.revert();
        } catch {
          // Ignore revert errors
        }
      }
    };
  }, []);

  return (
    <section
      data-scroll-section
      data-section="problem"
      className="min-h-screen flex items-center justify-center py-24 md:py-32 relative bg-gradient-to-b from-slate-50 via-blue-50 to-indigo-50 overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          data-parallax="1.5"
          className="absolute top-1/4 right-10 w-64 h-64 bg-gray-200 rounded-full blur-3xl opacity-30"
        />
        <div
          data-parallax="-1"
          className="absolute bottom-1/3 left-10 w-80 h-80 bg-slate-200 rounded-full blur-3xl opacity-30"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <div className="grid md:grid-cols-2 gap-20 lg:gap-24 items-center">
          {/* ========== LEFT SIDE - TEXT CONTENT ========== */}
          <div data-scroll data-scroll-speed="1">
            <div className="space-y-12" data-animation="problem-text">
              {/* Badge */}
              <div className="inline-block px-6 py-2 bg-rose-500 text-white rounded-full text-sm tracking-wide font-medium shadow-lg mb-4">
                THE PROBLEM
              </div>

              {/* Main headline */}
              <h2
                data-scroll
                data-scroll-speed="0.5"
                ref={paragraphRef}
                className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-8"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                We stopped meeting new people naturally.
              </h2>

              {/* Content blocks */}
              <div className="space-y-8 text-lg md:text-xl text-gray-600 leading-relaxed">
                {/* First point - How it used to be */}
                <p className="flex items-start space-x-4 mb-6">
                  <span className="text-rose-400 mt-1 text-2xl flex-shrink-0">
                    ✓
                  </span>
                  <span ref={paragraphRef} className="inline-block">
                    We used to meet through{" "}
                    <strong className="text-gray-900">moments</strong> — a
                    shared laugh at a coffee shop, a spontaneous plan at the
                    gym, a common hobby at a meetup.
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* ========== RIGHT SIDE - VISUAL MOCKUP ========== */}
          <div data-scroll data-scroll-speed="-1" className="relative">
            <div className="relative h-[600px] md:h-[700px] flex items-center justify-center">
              {/* Background shadow layers with animation hooks */}
              <div
                data-animation="phone-layer"
                className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 rounded-3xl transform rotate-6 opacity-40 blur-sm"
              />
              <div
                data-animation="phone-layer"
                className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 rounded-3xl transform -rotate-3 opacity-40 blur-sm"
              />

              {/* Main phone mockup card */}
              <div className="relative bg-white rounded-3xl p-8 md:p-10 lg:p-12 shadow-2xl flex flex-col items-center justify-center space-y-6 md:space-y-8 w-full max-w-md border border-gray-200">
                {/* Phone icon with swipe indicators - animation hook */}
                <div data-animation="phone-icon" className="relative">
                  <Smartphone
                    className="w-32 h-32 text-gray-400"
                    strokeWidth={1}
                  />

                  {/* Left swipe (reject) */}
                  <div className="absolute -right-6 top-1/4 animate-pulse">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center shadow-md border-2 border-red-200">
                      <X className="w-5 h-5 text-red-600" />
                    </div>
                  </div>

                  {/* Right swipe (like) */}
                  <div
                    className="absolute -left-6 top-1/4 animate-pulse"
                    style={{ animationDelay: "0.5s" }}
                  >
                    <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center shadow-md border-2 border-rose-200">
                      <Heart className="w-5 h-5 text-rose-600" />
                    </div>
                  </div>

                  {/* Notification badge */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-rose-500 rounded-full flex items-center justify-center text-white text-xs font-bold animate-bounce">
                    99+
                  </div>
                </div>

                {/* Mock app stats */}
                <div className="text-center space-y-4 w-full">
                  <div className="grid grid-cols-2 gap-3">
                    {/* Swipes stat */}
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
                      <div className="flex items-center justify-center space-x-1 mb-1">
                        <Users className="w-4 h-4 text-gray-400" />
                      </div>
                      <div className="text-3xl font-bold text-gray-400">
                        500+
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Swipes today
                      </div>
                    </div>

                    {/* Matches stat */}
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
                      <div className="flex items-center justify-center space-x-1 mb-1">
                        <MessageCircle className="w-4 h-4 text-gray-400" />
                      </div>
                      <div className="text-3xl font-bold text-gray-400">12</div>
                      <div className="text-xs text-gray-500 mt-1">Matches</div>
                    </div>
                  </div>

                  {/* Connection quality */}
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <div className="flex items-center justify-center space-x-2">
                      <TrendingDown className="w-5 h-5 text-red-500" />
                      <div className="text-2xl font-bold text-red-600">0</div>
                    </div>
                    <div className="text-sm text-red-700 mt-1 font-medium">
                      Real connections
                    </div>
                  </div>

                  {/* Status message */}
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-gray-500 text-base font-medium italic">
                      "Scrolling... But feeling disconnected"
                    </p>
                  </div>
                </div>

                {/* Arrow pointing to solution (visible on larger screens) */}
                <div className="hidden md:block absolute -bottom-10 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-rose-500 to-amber-500 text-white px-6 py-3 rounded-full text-sm font-bold shadow-xl border-2 border-white animate-pulse">
                    There's a better way →
                  </div>
                </div>
              </div>

              {/* Floating decorative elements */}
              <div
                data-parallax="2"
                className="absolute top-10 left-0 w-16 h-16 bg-gray-300/30 rounded-full blur-xl"
              />
              <div
                data-parallax="-2"
                className="absolute bottom-10 right-0 w-20 h-20 bg-gray-300/30 rounded-full blur-xl"
              />
            </div>
          </div>
        </div>

        {/* Bottom CTA indicator (mobile) */}
        <div className="md:hidden text-center mt-12">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-rose-500 to-amber-500 text-white px-6 py-3 rounded-full text-sm font-bold shadow-xl animate-pulse">
            <span>There's a better way</span>
            <span>→</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Problem;
