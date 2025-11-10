import { SlidingNumber } from "@/components/ui/shadcn-io/sliding-number";
import {
  Zap,
  Frown,
  Smile,
  TrendingUp,
  Activity,
  Users,
  Heart,
} from "lucide-react";
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Reveal from "./ui/Reveal";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Spark() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const oldRef = useRef<HTMLDivElement | null>(null);
  const newRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 50%",
        end: "bottom top",
        scrub: true,
      },
    });

    tl.from(oldRef.current, {
      y: -50,
      ease: "none",
    }).from(
      newRef.current,
      {
        y: 50,
        ease: "none",
      },
      0
    );
  }, []);

  const activities = [
    "Morning Runs",
    "Coffee Meetups",
    "Art Classes",
    "Hiking",
    "Book Clubs",
    "Cooking",
    "Photography Walks",
    "Yoga",
    "Music Jams",
    "Dance",
    "Cycling",
    "Gaming",
    "Rock Climbing",
    "Pottery",
    "Tennis",
    "Meditation",
  ];

  const stats = [
    {
      label: "Success rate",
      value: 98.9,
      padStart: true,
      icon: <TrendingUp className="w-8 h-8 text-amber-500" />,
    },
    {
      label: "Activities",
      value: 500,
      padStart: 3,
      icon: <Activity className="w-8 h-8 text-rose-500" />,
    },
    {
      label: "Members",
      value: 99999,
      padStart: 4,
      icon: <Users className="w-8 h-8 text-indigo-500" />,
    },
  ];

  return (
    <section
      ref={sectionRef}
      data-scroll-section
      className="min-h-screen flex items-center justify-center py-8 md:py-8 bg-gradient-to-b from-rose-50 via-amber-50 to-orange-50 relative overflow-hidden"
      data-bg-color="#fff5f0"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          data-parallax="1"
          className="absolute top-1/4 left-10 w-96 h-96 bg-amber-300/20 rounded-full blur-3xl"
        />
        <div
          data-parallax="-1.5"
          className="absolute bottom-1/4 right-10 w-[500px] h-[500px] bg-rose-300/20 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-20">
          <Reveal>
            <div
              data-scale
              className="inline-block px-6 py-2 bg-rose-500 text-white rounded-full text-sm tracking-wide font-medium shadow-lg mb-8"
            >
              THE SPARK
            </div>
          </Reveal>

          <Reveal>
            <h2
              data-split
              className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight mb-8"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Connection through activity.
            </h2>
          </Reveal>

          <Reveal index={1}>
            <p
              data-fade
              className="text-2xl md:text-3xl text-gray-700 max-w-4xl mx-auto leading-relaxed"
            >
              What if making new friends or finding a partner started with doing
              something you love?
            </p>
          </Reveal>
        </div>

        {/* Comparison cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-20">
          {/* Old way */}
          

          {/* New way */}
          
        </div>

        {/* Key insight */}
        <div data-scale className="text-center mb-20">
          <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-amber-400 to-rose-400 rounded-3xl shadow-2xl px-10 py-8 text-3xl md:text-4xl font-bold text-white max-w-4xl">
            <Zap className="w-12 h-12 text-white flex-shrink-0 animate-pulse" />
            <span>
              MeetMux connects you through real activities — not profiles.
            </span>
          </div>
        </div>

        {/* Activities preview */}
        <div className="max-w-6xl mx-auto">
          <div data-fade className="text-center mb-10">
            <div className="inline-flex items-center space-x-2 text-gray-600 text-lg">
              <Activity className="w-5 h-5" />
              <span className="font-semibold">
                Popular activities on MeetMux:
              </span>
            </div>
          </div>

          <div data-stagger className="flex flex-wrap justify-center gap-4">
            {activities.map((activity) => (
              <div
                key={activity}
                data-magnetic="0.2"
                className="px-8 py-4 bg-white rounded-full text-gray-700 font-semibold shadow-lg hover:shadow-2xl hover:scale-110 transition-all cursor-pointer border-2 border-transparent hover:border-amber-400 hover:bg-amber-50"
              >
                {activity}
              </div>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div
          data-fade
          className="mt-24 grid grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="flex justify-center mb-4">{stat.icon}</div>
              <SlidingNumber
                number={stat.value}
                padStart={stat.padStart}
                className="text-6xl font-bold"
                digitClassName="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-amber-500"
              />
              <div className="text-gray-600 mt-2 text-lg">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-lavender-50 to-transparent" />
    </section>
  );
}

export default Spark;
