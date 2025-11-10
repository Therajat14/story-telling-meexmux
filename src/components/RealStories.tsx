import { Sparkles } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type StoryItem = {
  category: string;
  imageUrl: string;
  quote: string;
  author: string;
  age: string;
  avatarUrl: string;
};

gsap.registerPlugin(ScrollTrigger);

const STORIES: StoryItem[] = [
  {
    category: "Yoga",
    imageUrl:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1600&auto=format&fit=crop",
    quote:
      "Met at a sunrise yoga session — now we hike together every weekend.",
    author: "Alex",
    age: "28",
    avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    category: "Running",
    imageUrl:
      "https://images.unsplash.com/photo-1546483875-ad9014c88eba?q=80&w=1600&auto=format&fit=crop",
    quote:
      "Joined a local running crew. Training for our first half-marathon!",
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
    category: "Photography",
    imageUrl:
      "https://images.unsplash.com/photo-1520975661595-6453be3f7070?q=80&w=1600&auto=format&fit=crop",
    quote:
      "Found my photo buddy. Every weekend we explore a new corner of the city.",
    author: "Jessica",
    age: "29",
    avatarUrl: "https://randomuser.me/api/portraits/women/12.jpg",
  },
  {
    category: "Reading",
    imageUrl:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1600&auto=format&fit=crop",
    quote:
      "Book club nights became the highlight of my month — great minds and great company.",
    author: "David",
    age: "35",
    avatarUrl: "https://randomuser.me/api/portraits/men/14.jpg",
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
    category: "Cooking",
    imageUrl:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=1600&auto=format&fit=crop",
    quote:
      "From pasta night to potlucks — cooking together made it feel like family.",
    author: "Priya",
    age: "25",
    avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    category: "Dance",
    imageUrl:
      "https://images.unsplash.com/photo-1520975922218-30c8a5020714?q=80&w=1600&auto=format&fit=crop",
    quote:
      "Met at a salsa social — rhythm, laughter, and new friends every week.",
    author: "Carlos",
    age: "29",
    avatarUrl: "https://randomuser.me/api/portraits/men/19.jpg",
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
      "The discussions went beyond books — it felt like finding ‘my people’.",
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
  // Calculate height: enough for pinning all slides (each slide needs ~80vh scroll)
  const scrollVh = STORIES.length * 80 + 200; // extra space to ensure smooth completion

  useLayoutEffect(() => {
    const sectionEl = sectionRef.current;
    const listEl = listRef.current;
    const slidesEl = slidesRef.current;
    if (!sectionEl || !listEl || !slidesEl) return;

    // Ensure section has proper positioning for ScrollTrigger
    if (getComputedStyle(sectionEl).position === 'static') {
      sectionEl.style.position = 'relative';
    }

    const setup = () => {
      const scrollContainer = document.querySelector('[data-scroll-container]') as HTMLElement;
      if (!scrollContainer) {
        console.warn('Scroll container not found, retrying...');
        return;
      }

      // Ensure scroll container has proper positioning
      const containerStyle = getComputedStyle(scrollContainer);
      if (containerStyle.position === 'static') {
        scrollContainer.style.position = 'relative';
      }

      const listItems = Array.from(listEl.querySelectorAll("li"));
      const slides = Array.from(slidesEl.querySelectorAll(".rs-slide"));
      const fill = fillRef.current;

      // Safety: if no items/slides, skip
      if (listItems.length === 0 || slides.length === 0) return;

      // Initial state
      gsap.set(slides, { autoAlpha: 0 });
      gsap.set(slides[0], { autoAlpha: 1 });
      if (fill) gsap.set(fill, { scaleY: 0, transformOrigin: "top left" });
      listItems.forEach((item, idx) => {
        gsap.set(item, { color: idx === 0 ? "#000" : "#008080" });
      });

      // Wait for ScrollTrigger to be ready
      ScrollTrigger.refresh();

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionEl,
          start: "top top",
          end: "+=" + listItems.length * 80 + "%",
          pin: true,
          scrub: true,
          scroller: scrollContainer,
          pinSpacing: false,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          markers: false, // Set to true for debugging
        },
      });

      listItems.forEach((item, j) => {
        if (j === 0) {
          tl.set(item, { color: "#000" }, 0.01).to(
            slides[j],
            { autoAlpha: 1, duration: 0.2 },
            "<"
          );
        } else {
          tl.set(item, { color: "#000" }, 0.5 * j)
            .to(slides[j], { autoAlpha: 1, duration: 0.2 }, "<")
            .set(listItems[j - 1], { color: "#008080" }, "<")
            .to(slides[j - 1], { autoAlpha: 0, duration: 0.2 }, "<");
        }
      });

      if (fill) {
        tl.to(
          fill,
          {
            scaleY: 1,
            ease: "none",
            duration: tl.duration() - 0.5,
          },
          0
        );
      }

      // Refresh after setup and update scroll container
      ScrollTrigger.refresh();
      
      // Trigger scroll container update after a brief delay
      setTimeout(() => {
        ScrollTrigger.refresh();
        // Dispatch custom event to notify other systems
        window.dispatchEvent(new CustomEvent('scrollUpdate'));
      }, 200);

      return () => {
        if (tl.scrollTrigger) {
          tl.scrollTrigger.kill();
        }
        tl.kill();
      };
    };

    // Wait for scroll system to be ready
    let cleanup: (() => void) | undefined;
    
    const initScrollTrigger = () => {
      if (cleanup) cleanup();
      cleanup = setup() || undefined;
    };

    // Wait for scrollReady event or try after delay
    const scrollContainer = document.querySelector('[data-scroll-container]');
    if (scrollContainer) {
      // Container exists, wait a bit for scrollerProxy to be set up
      setTimeout(initScrollTrigger, 500);
    }
    
    // Always listen for scrollReady event
    window.addEventListener("scrollReady", initScrollTrigger, { once: true });
    
    // Fallback: try after longer delay
    const fallbackTimer = setTimeout(initScrollTrigger, 1500);

    return () => {
      window.removeEventListener("scrollReady", initScrollTrigger);
      clearTimeout(fallbackTimer);
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <section
      data-scroll-section
      ref={sectionRef}
      className="relative flex items-start justify-center py-16 md:py-20 bg-gradient-to-b from-rose-50 via-amber-50 to-rose-50"
      style={{ 
        height: `${scrollVh}vh`,
        position: 'relative' // Ensure non-static positioning
      }}
    >
      <div 
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{ position: 'relative' }} // Ensure proper positioning for ScrollTrigger
      >
        <div className="container mx-auto px-6 relative z-10 max-w-7xl h-full flex flex-col pb-8">
          <div className="text-center mb-8 md:mb-10">
          <div className="inline-flex items-center space-x-2 px-6 py-2 bg-rose-500 text-white rounded-full text-sm tracking-wide mb-8 shadow-lg font-medium">
            <Sparkles className="w-4 h-4" />
            <span>REAL STORIES</span>
          </div>
          <h2
            className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Real stories from real people
          </h2>
            <p className="mt-4 text-gray-700 text-lg md:text-xl max-w-3xl mx-auto">
              “The best relationships start when you're not looking — they start when you're living.”
            </p>
            <p className="mt-2 text-gray-600 text-base max-w-3xl mx-auto">
              Real moments. Real people. Real connections — all through shared activities.
            </p>
          </div>

          {/* Pinned content: left list + right slides */}
          <div className="flex-1 relative">
            <div className="flex w-full h-full">
              {/* Left list */}
              <div className="relative w-full max-w-[360px] mr-6">
                <div ref={fillRef} className="absolute left-0 top-0 w-[4px] h-full bg-teal-600 origin-top"></div>
                <ul ref={listRef} className="list text-2xl md:text-3xl font-bold text-teal-700 space-y-6 pl-4">
                  {STORIES.map((story) => (
                    <li key={story.author + story.category} className="transition-colors duration-200">
                      {story.category}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right slides */}
              <div className="relative flex-1 rounded-3xl overflow-hidden border border-rose-100">
                <div ref={slidesRef} className="right w-full h-full relative">
                  {STORIES.map((story) => (
                    <div key={story.author + story.imageUrl} className="rs-slide absolute inset-0">
                      <img
                        src={story.imageUrl}
                        alt={`${story.category} story`}
                        className="absolute inset-0 w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                        <div className="mb-3 inline-flex items-center space-x-2 px-3 py-1.5 bg-white/15 rounded-full text-xs font-bold">
                          <span>{story.category}</span>
                        </div>
                        <p className="text-lg md:text-xl italic leading-relaxed max-w-2xl">
                          “{story.quote}”
                        </p>
                        <div className="mt-4 flex items-center space-x-3">
                          <Avatar className="ring-white">
                            <AvatarImage src={story.avatarUrl} alt={story.author} />
                            <AvatarFallback>{story.author.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="text-sm">
                            <p className="font-semibold">
                              {story.author}, {story.age}
                            </p>
                            <p className="text-white/70 text-xs">Early Member</p>
                          </div>
                        </div>
                      </div>
                    </div>
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


