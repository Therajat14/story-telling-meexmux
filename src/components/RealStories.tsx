import { Sparkles } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

import StarryNight from "./ui/StarryNight";

gsap.registerPlugin(ScrollTrigger);

type Story = {
  category: string;
  imageUrl: string;
  quote: string;
  author: string;
  age: string;
  avatarUrl: string;
};

const STORIES: Story[] = [
  {
    category: "Running",
    imageUrl:
      "https://img.freepik.com/premium-photo/group-friends-maintains-healthy-lifestyle-by-running-outdoors-sunny-day-bonding-fitness-enjoying-energizing-effects-exercise-nature_1078540-8772.jpg",
    quote: "Joined a local running crew. Training for our first half-marathon!",
    author: "Michael",
    age: "32",
    avatarUrl: "https://randomuser.me/api/portraits/men/68.jpg",
  },
  {
    category: "Coffee",
    imageUrl:
      "https://pauljohncaffeine.com/wp-content/uploads/2024/07/pexels-hoanggiahuy-7298246-2.png",
    quote:
      "Coffee tastings turned into weekly dates. Real conversation, zero awkwardness.",
    author: "Emma",
    age: "26",
    avatarUrl: "https://randomuser.me/api/portraits/women/21.jpg",
  },
  {
    category: "Hiking",
    imageUrl:
      "https://images.stockcake.com/public/3/4/e/34e39832-ba77-4548-93e6-ed2b986b8a28_large/sunset-mountain-hike-stockcake.jpg",
    quote:
      "A spontaneous hike matched us up — the views and the company were both incredible.",
    author: "Nina",
    age: "27",
    avatarUrl: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    category: "Art",
    imageUrl:
      "https://thumbs.dreamstime.com/b/group-people-smiling-happy-looking-draw-partner-art-studio-group-people-smiling-happy-looking-draw-partner-223306525.jpg",
    quote:
      "Sketch walks became our Sunday ritual — creativity sparked connection.",
    author: "Mia",
    age: "24",
    avatarUrl: "https://randomuser.me/api/portraits/women/29.jpg",
  },
];

function RealStories() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate heading
    const headingSplit = new SplitType(headingRef.current, { types: "chars" });
    gsap.from(headingSplit.chars, {
      opacity: 0,
      y: 30,
      stagger: 0.05,
      ease: "power2.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "top 60%",
        scrub: 1,
      },
    });

    // Animate subtext
    const subtextSplit = new SplitType(subtextRef.current, { types: "words" });
    gsap.from(subtextSplit.words, {
      opacity: 0,
      y: 20,
      stagger: 0.08,
      scrollTrigger: {
        trigger: subtextRef.current,
        start: "top 85%",
        end: "top 55%",
        scrub: 1,
      },
    });

    // Cards scroll animation
    const cards = gsap.utils.toArray<HTMLElement>(
      cardsRef.current?.querySelectorAll(".story-card") || []
    );

    gsap.set(cards, { opacity: 0, scale: 0.9, yPercent: 10 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=" + window.innerHeight * (cards.length - 1),
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      },
    });

    cards.forEach((card, i) => {
      const prev = cards[i - 1];
      if (prev) {
        tl.to(prev, {
          opacity: 0,
          scale: 0.9,
          yPercent: -20,
          duration: 0.5,
          ease: "power2.out",
        });
      }
      tl.to(
        card,
        {
          opacity: 1,
          scale: 1,
          yPercent: 0,
          duration: 0.7,
          ease: "power2.out",
        },
        "<"
      );
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      data-scroll-section
      data-section="realstories"
      className="min-h-screen flex items-center justify-center py-24 md:py-32 relative overflow-hidden"
    >
      <StarryNight />

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <div className="grid md:grid-cols-2 gap-20 lg:gap-24 items-center">
          {/* LEFT SIDE TEXT */}
          <div>
            <div className="space-y-10">
              <div className="inline-block px-6 py-2 bg-rose-500 text-white rounded-full text-sm tracking-wide font-medium shadow-lg mb-4">
                REAL STORIES
              </div>

              <h2
                ref={headingRef}
                className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Real stories from real people
              </h2>

              <p
                ref={subtextRef}
                className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-lg"
              >
                "The best relationships start when you're not looking — they
                start when you're living."
              </p>
            </div>
          </div>

          {/* RIGHT SIDE - STORY CARDS */}
          <div
            ref={cardsRef}
            className="relative h-[600px] md:h-[700px] flex items-center justify-center"
          >
            {STORIES.map((story, i) => (
              <div
                key={story.author + i}
                className="story-card absolute inset-0 flex items-center justify-center"
              >
                <div className="w-full h-full rounded-3xl overflow-hidden shadow-2xl border border-gray-200 relative">
                  <img
                    src={story.imageUrl}
                    alt={story.category}
                    className="w-full h-full object-cover"
                  />

                  {/* Text overlay only at bottom */}
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 via-black/1000 to-transparent p-6 md:p-8 rounded-b-3xl">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      {story.category}
                    </h3>
                    <p className="text-sm md:text-base mb-3 italic text-gray-100/90">
                      {story.quote}
                    </p>
                    <div className="flex items-center space-x-3">
                      <img
                        src={story.avatarUrl}
                        alt={story.author}
                        className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white"
                      />
                      <p className="text-sm font-semibold text-white">
                        {story.author}, {story.age}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default RealStories;
