// src/utils/animation.ts
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

  if (!sectionEl || !listEl || !slidesEl || !stories || stories.length === 0) {
    console.warn("initScrollAnimations: missing elements or no stories");
    return;
  }

  const listItems = Array.from(listEl.querySelectorAll("li"));
  const slides = Array.from(slidesEl.querySelectorAll(".rs-slide"));
  const fill = fillRef.current;

  if (!slides.length || !listItems.length) {
    console.warn("initScrollAnimations: no slides or list items found");
    return;
  }

  // Ensure initial visibility
  gsap.set(slides, { autoAlpha: 0, y: 0 });
  gsap.set(slides[0], { autoAlpha: 1 });
  gsap.set(listItems, { color: "#008080" });
  gsap.set(listItems[0], { color: "#000" });
  if (fill) gsap.set(fill, { scaleY: 0, transformOrigin: "top left" });

  const totalSlides = slides.length;

  // Use viewport height per slide for robust spacing:
  // give each slide roughly 1 viewport height (adjust multiplier if you want slower/faster)
  const perSlideVH = window.innerHeight; // 1 * vh
  const totalScrollDistance = perSlideVH * totalSlides; // reserve full viewport per slide

  // Create timeline with dynamic end
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionEl,
      start: "top top",
      end: `+=${Math.round(totalScrollDistance)}`, // e.g. "+=4200"
      pin: true,
      scrub: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });

  // Build animation blocks — each slide gets a chunk of timeline
  const slideChunk = tl.duration() || totalScrollDistance / totalSlides; // fallback
  // We'll calculate explicit times based on index and perSlideVH to be deterministic:
  const timePerSlide = totalScrollDistance / totalSlides;

  slides.forEach((slide, i) => {
    const startAt = i * timePerSlide;

    // Fade current slide in
    tl.to(
      slide,
      {
        autoAlpha: 1,
        duration: timePerSlide * 0.25,
        ease: "none",
      },
      startAt
    );

    // Fade previous slide out (except for i === 0)
    if (i > 0) {
      tl.to(
        slides[i - 1],
        {
          autoAlpha: 0,
          duration: timePerSlide * 0.25,
          ease: "none",
        },
        startAt
      );

      // style list items: mark previous as muted, current as active
      tl.set(listItems[i - 1], { color: "#008080" }, startAt);
    }

    // Set current list item active
    tl.set(listItems[i], { color: "#000" }, startAt);
  });

  // Final fade-out - ensure the last slide fades out near the end
  const lastStart = (totalSlides - 1) * timePerSlide;
  tl.to(
    slides[totalSlides - 1],
    {
      autoAlpha: 0,
      duration: timePerSlide * 0.25,
      ease: "none",
    },
    lastStart + timePerSlide * 0.6
  );

  // Animate fill bar across entire timeline
  if (fill) {
    tl.to(
      fill,
      {
        scaleY: 1,
        ease: "none",
        duration: tl.duration() - 0.1,
      },
      0
    );
  }

  // Refresh ScrollTrigger on resize (so end recalculates)
  ScrollTrigger.addEventListener("refreshInit", () => {
    // nothing special here — invalidateOnRefresh on timeline handles it
  });

  return () => {
    if (tl.scrollTrigger) tl.scrollTrigger.kill();
    tl.kill();
  };
};
