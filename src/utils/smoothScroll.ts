import { initLocomotiveScroll } from './locomotiveScroll';
import { initGsapAnimations } from './gsapAnimations';
import { initBackgroundTransition } from './backgroundTransition';
import type LocomotiveScroll from 'locomotive-scroll';

export const initSmoothScroll = (container: HTMLElement | null): (() => void) | null => {
  if (!container) return null;

  let locomotiveScroll: LocomotiveScroll | null = null;
  let handleResize: (() => void) | null = null;
  let handleScrollUpdate: (() => void) | null = null;

  // Initialize after DOM is ready
  const init = () => {
    // Ensure container has content before initializing
    if (container.children.length === 0) {
      setTimeout(init, 100);
      return;
    }

    locomotiveScroll = initLocomotiveScroll(container);
    
    if (!locomotiveScroll) return;

    // Initialize GSAP animations with locomotive scroll
    initGsapAnimations(locomotiveScroll);

    // Initialize smooth background transitions
    initBackgroundTransition(locomotiveScroll);

    // Update scroll to calculate proper height
    const updateScroll = () => {
      if (locomotiveScroll) {
        locomotiveScroll.update();
      }
    };

    // Update scroll multiple times to ensure proper height calculation
    requestAnimationFrame(() => {
      updateScroll();
      setTimeout(updateScroll, 50);
      setTimeout(updateScroll, 200);
      setTimeout(updateScroll, 500);
      setTimeout(updateScroll, 1000);
      setTimeout(updateScroll, 2000);
    });

    // Also update when all sections are loaded
    const sections = container.querySelectorAll('[data-scroll-section]');
    if (sections.length > 0) {
      // Wait for all sections to be rendered
      setTimeout(() => {
        updateScroll();
      }, 1500);
    }

    // Update on window resize
    handleResize = () => {
      updateScroll();
    };
    window.addEventListener('resize', handleResize);

    // Listen for scroll updates from components (like RealStories)
    handleScrollUpdate = () => {
      updateScroll();
    };
    window.addEventListener('scrollUpdate', handleScrollUpdate);

    // Update when images load
    const images = container.querySelectorAll('img');
    images.forEach((img) => {
      if (!img.complete) {
        img.addEventListener('load', updateScroll, { once: true });
      }
    });
  };

  // Initialize after React has rendered
  const timeoutId = setTimeout(() => {
    requestAnimationFrame(init);
  }, 200);

  return () => {
    clearTimeout(timeoutId);
    if (handleResize) {
      window.removeEventListener('resize', handleResize);
    }
    if (handleScrollUpdate) {
      window.removeEventListener('scrollUpdate', handleScrollUpdate);
    }
    if (locomotiveScroll) {
      locomotiveScroll.destroy();
    }
  };
};

