import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type StoryItem = {
  category: string;
  imageUrl: string;
  quote: string;
  author: string;
  age: string;
  avatarUrl: string;
};

export const initScrollAnimations = (
  sectionRef: React.RefObject<HTMLElement>,
  listRef: React.RefObject<HTMLUListElement>,
  slidesRef: React.RefObject<HTMLDivElement>,
  fillRef: React.RefObject<HTMLDivElement>,
  stories: StoryItem[]
) => {
  const sectionEl = sectionRef.current;
  const listEl = listRef.current;
  const slidesEl = slidesRef.current;

  if (!sectionEl || !listEl || !slidesEl || stories.length === 0) {
    console.warn("initScrollAnimations: Missing elements or no stories provided.");
    return;
  }

  const listItems = Array.from(listEl.querySelectorAll("li"));
  const slides = Array.from(slidesEl.querySelectorAll(".rs-slide"));
  const fill = fillRef.current;

  if (listItems.length === 0 || slides.length === 0) return;

  gsap.set(slides, { autoAlpha: 0, y: 0 });
  gsap.set(slides[0], { autoAlpha: 1, y: 0 });
  if (fill) gsap.set(fill, { scaleY: 0, transformOrigin: "top left" });
  listItems.forEach((item, idx) => {
    gsap.set(item, { color: idx === 0 ? "#000" : "#008080" });
  });

  if (listItems.length === 0 || slides.length === 0) return;

  const totalPinDuration = stories.length * 250;
  const animationDurationPerSlide = totalPinDuration / stories.length;

  const lastSlideAnimationEnd = (stories.length - 1) * animationDurationPerSlide + (animationDurationPerSlide * 0.2) + 100;
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionEl,
      start: "top top",
      end: "+=" + lastSlideAnimationEnd,
      pin: true,
      scrub: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });

  listItems.forEach((item, j) => {
    const startTime = j * animationDurationPerSlide;

    if (j === 0) {
      tl.set(item, { color: "#000" }, startTime).fromTo(
        slides[j],
        { autoAlpha: 0, y: 0 }, // Explicitly start from y:0
        { autoAlpha: 1, y: 0, duration: animationDurationPerSlide * 0.2 }, // Explicitly end at y:0
        "<"
      );
    } else {
      tl.set(item, { color: "#000" }, startTime)
        .fromTo(slides[j], { autoAlpha: 0, y: 0 }, { autoAlpha: 1, y: 0, duration: animationDurationPerSlide * 0.2 }, "<")
        .set(listItems[j - 1], { color: "#008080" }, "<")
        .to(slides[j - 1], { autoAlpha: 0, duration: animationDurationPerSlide * 0.2 }, "<");
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

  return () => {
    if (tl.scrollTrigger) {
      tl.scrollTrigger.kill();
    }
    tl.kill();
  };
};
