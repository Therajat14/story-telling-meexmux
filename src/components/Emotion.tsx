import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Heart,
  Laugh,
  Mountain,
  Camera,
  Sparkles,
  Coffee,
  Music,
  Users,
} from "lucide-react";
import { ParallaxStories } from "./ui/ParallaxStories";
import Reveal from "./ui/Reveal";

gsap.registerPlugin(ScrollTrigger);

function Emotion() {
  const moments = [
    {
      icon: Laugh,
      text: "Shared laughter",
      color: "from-amber-400 to-orange-500",
    },
    {
      icon: Mountain,
      text: "New adventures",
      color: "from-emerald-400 to-teal-500",
    },
    {
      icon: Heart,
      text: "Real connections",
      color: "from-rose-400 to-pink-500",
    },
    {
      icon: Camera,
      text: "Lasting memories",
      color: "from-purple-400 to-indigo-500",
    },
  ];

  const stories = [
    {
      quote:
        "I met Sarah at a sunrise yoga session. Now we hike every weekend and she's my best friend.",
      author: "Alex",
      age: "28",
      activity: "Yoga",
      icon: Users,
      imageUrl:
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1600&auto=format&fit=crop",
    },
    {
      quote:
        "Found my running crew through MeetMux. Three months later, we're training for a marathon!",
      author: "Michael",
      age: "32",
      activity: "Running",
      icon: Mountain,
      imageUrl:
        "https://images.unsplash.com/photo-1546483875-ad9014c88eba?q=80&w=1600&auto=format&fit=crop",
    },
    {
      quote:
        "Started going to coffee tastings alone. Met someone who loves coffee as much as I do. Dating now!",
      author: "Emma",
      age: "26",
      activity: "Coffee",
      icon: Coffee,
      imageUrl:
        "https://images.unsplash.com/photo-1517705008128-361805f42e86?q=80&w=1600&auto=format&fit=crop",
    },
    {
      quote:
        "Joined a photography walk and met my now-boyfriend. We explore new places every weekend!",
      author: "Jessica",
      age: "29",
      activity: "Photography",
      icon: Camera,
      imageUrl:
        "https://images.unsplash.com/photo-1520975661595-6453be3f7070?q=80&w=1600&auto=format&fit=crop",
    },
    {
      quote:
        "Book club led to the best friendship I've ever had. We read and discuss books every month.",
      author: "David",
      age: "35",
      activity: "Reading",
      icon: Users,
      imageUrl:
        "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1600&auto=format&fit=crop",
    },
  ];

  const oldPointsRef = useRef<HTMLParagraphElement[]>([]);
  const newPointsRef = useRef<HTMLParagraphElement[]>([]);

  useEffect(() => {
    const oldPoints = oldPointsRef.current;
    const newPoints = newPointsRef.current;

    if (oldPoints.length > 0) {
      gsap.fromTo(
        oldPoints,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: oldPoints[0].parentElement,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    if (newPoints.length > 0) {
      gsap.fromTo(
        newPoints,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: newPoints[0].parentElement,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, []);

  return (
    <section
      data-scroll-section
      className="min-h-screen flex items-center justify-center py-24 md:py-32 relative overflow-hidden bg-gradient-to-b from-pink-50 via-rose-50 to-amber-50 z-10"
    >
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          data-parallax="-1"
          className="absolute top-20 left-20 w-96 h-96 bg-rose-300/20 rounded-full blur-3xl animate-pulse"
        />
        <div
          data-parallax="1.5"
          className="absolute top-1/3 right-20 w-[500px] h-[500px] bg-amber-300/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          data-parallax="-0.8"
          className="absolute bottom-20 left-1/3 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-20">
          <Reveal>
            <div
              data-scale
              className="inline-flex items-center space-x-2 px-6 py-2 bg-rose-500 text-white rounded-full text-sm tracking-wide mb-8 shadow-lg font-medium"
            >
              <Sparkles className="w-4 h-4" />
              <span>THE EMOTION</span>
            </div>
          </Reveal>

          <Reveal>
            <h2
              data-split
              className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight mb-8"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Because real stories
              <br />
              <span
                className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-amber-500 to-rose-500 animate-gradient"
                style={{ backgroundSize: "200% auto" }}
              >
                start offline.
              </span>
            </h2>
          </Reveal>

          {/* Decorative divider */}
          <div className="flex items-center justify-center space-x-4 mt-8">
            <div className="w-20 h-1 bg-gradient-to-r from-transparent via-rose-400 to-transparent rounded-full" />
            <Heart
              className="w-5 h-5 text-rose-400 animate-pulse"
              fill="currentColor"
            />
            <div className="w-20 h-1 bg-gradient-to-r from-transparent via-rose-400 to-transparent rounded-full" />
          </div>
        </div>

        {/* Comparison */}
        <div data-clip className="max-w-5xl mx-auto mb-24">
          <div className="grid md:grid-cols-2 gap-8">
            {/* OLD */}
            <div className="bg-gray-100 rounded-3xl p-10 space-y-4">
              <h4 className="text-2xl font-bold text-gray-500 mb-6">
                The old way:
              </h4>
              <div className="space-y-3 text-gray-600 text-lg">
                {[
                  "Profile pictures",
                  "Awkward first dates",
                  "Small talk",
                  "Wondering about chemistry",
                ].map((text, index) => (
                  <p
                    key={text}
                    ref={(el) => (oldPointsRef.current[index] = el!)}
                    className="flex items-start space-x-2"
                  >
                    <span className="text-red-500 mt-1">✗</span>
                    <span>{text}</span>
                  </p>
                ))}
              </div>
            </div>

            {/* NEW */}
            <div
              data-reveal
              className="bg-gradient-to-br from-rose-400 to-amber-400 rounded-3xl p-10 space-y-4 text-white relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent group-hover:translate-x-full transition-transform duration-1000" />

              <h4 className="text-2xl font-bold mb-6 relative z-10">
                The MeetMux way:
              </h4>
              <div className="space-y-3 text-lg relative z-10">
                {[
                  "Shared activities",
                  "Natural meetings",
                  "Real conversations",
                  "Chemistry reveals itself",
                ].map((text, index) => (
                  <p
                    key={text}
                    ref={(el) => (newPointsRef.current[index] = el!)}
                    className="flex items-start space-x-2"
                  >
                    <span className="mt-1 font-bold">✓</span>
                    <span>{text}</span>
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
      </div>
    </section>
  );
}

export default Emotion;
