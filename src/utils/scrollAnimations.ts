import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const initScrollAnimations = () => {
  // Add any scroll-based animations here
  // This function can be used to set up scroll-triggered animations
  // that don't require locomotive scroll integration
  
  // Example: You can add scroll-triggered animations for elements
  // ScrollTrigger.refresh() is already called in smoothScroll.ts
  // but you can add additional animations here if needed
};

