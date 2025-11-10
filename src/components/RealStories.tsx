// RealStories.tsx
import { Sparkles } from "lucide-react";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { initScrollAnimations } from "../utils/animation";
import { StoryItem } from "./ui/StoryItem";

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
      "https://images.unsplash.com/photo-1546483875-ad9014c88eba?q=80&w=1600&auto=format&fit=crop",
    quote: "Joined a local running crew. Training for our first half-marathon!",
    author: "Michael",
    age: "32",
    avatarUrl: "https://randomuser.me/api/portraits/men/68.jpg",
  },
  {
    category: "Coffee",
    imageUrl:
      "https://images.unsplash.com/photo-1517705008128-361805f42e86?q=80&w=1600&auto=format&fit=crop",
    quote:
      "Coffee tastings turned into weekly dates. Real conversation, zero awkwardness.",
    author: "Emma",
    age: "26",
    avatarUrl: "https://randomuser.me/api/portraits/women/21.jpg",
  },
  {
    category: "Hiking",
    imageUrl:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop",
    quote:
      "A spontaneous hike matched us up — the views and the company were both incredible.",
    author: "Nina",
    age: "27",
    avatarUrl: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    category: "Cycling",
    imageUrl:
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?q=80&w=1600&auto=format&fit=crop",
    quote:
      "Weekend cycling loops turned into a close-knit crew and sunrise rides.",
    author: "Leo",
    age: "31",
    avatarUrl: "https://randomuser.me/api/portraits/men/71.jpg",
  },
  {
    category: "Art",
    imageUrl:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1600&auto=format&fit=crop",
    quote:
      "Sketch walks became our Sunday ritual — creativity sparked connection.",
    author: "Mia",
    age: "24",
    avatarUrl: "https://randomuser.me/api/portraits/women/29.jpg",
  },
  {
    category: "Gaming",
    imageUrl:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1600&auto=format&fit=crop",
    quote:
      "LAN night strangers turned into friends — and our weekly co-op squad.",
    author: "Ethan",
    age: "22",
    avatarUrl: "https://randomuser.me/api/portraits/men/46.jpg",
  },
  {
    category: "Book Club",
    imageUrl:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1600&auto=format&fit=crop",
    quote:
      "The discussions went beyond books — it felt like finding 'my people'.",
    author: "Hannah",
    age: "33",
    avatarUrl: "https://randomuser.me/api/portraits/women/9.jpg",
  },
];

function RealStories() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const fillRef = useRef<HTMLDivElement | null>(null);
  const slidesRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    initScrollAnimations(sectionRef, listRef, slidesRef, fillRef, STORIES);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex items-start justify-center py-4 md:py-16 bg-gradient-to-b from-rose-50 via-amber-50 to-rose-50"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-6xl h-full flex flex-col py-6">
          <div className="text-center mb-6 md:mb-8">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-rose-500 text-white rounded-full text-xs tracking-wide mb-4 shadow-md font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>REAL STORIES</span>
            </div>
            <h2
              className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Real stories from real people
            </h2>
            <p className="mt-3 text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
              "The best relationships start when you're not looking — they start
              when you're living."
            </p>
          </div>

          <div className="flex-1 relative min-h-0">
            <div className="flex w-full h-full gap-4 md:gap-8">
              <div className="relative w-32 md:w-48 flex-shrink-0">
                <div
                  ref={fillRef}
                  className="absolute left-0 top-0 w-[3px] bg-rose-400 origin-top rounded-full"
                  style={{ height: "0%" }}
                ></div>
                <div className="absolute left-0 top-0 w-[3px] h-full bg-rose-100 rounded-full"></div>
                <ul
                  ref={listRef}
                  className="list text-base md:text-xl font-semibold text-gray-400 space-y-4 md:space-y-6 pl-5 md:pl-6 relative"
                >
                  {STORIES.map((story, index) => (
                    <li
                      key={story.author + story.category}
                      className="transition-colors duration-300 flex items-center"
                      data-index={index}
                    >
                      <div className="absolute -left-5 md:-left-6 w-3 h-3 rounded-full bg-rose-100 border-2 border-white shadow-sm transition-all duration-300"></div>
                      <span>{story.category}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative flex-1 min-w-0 max-h-[70vh]">
                <div ref={slidesRef} className="right w-full h-full relative">
                  {STORIES.map((story) => (
                    <StoryItem key={story.author + story.imageUrl} {...story} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RealStories;
