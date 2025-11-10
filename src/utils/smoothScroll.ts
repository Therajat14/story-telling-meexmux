import { useEffect } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import { initGsapAnimations } from './gsapAnimations';

export const useSmoothScroll = () => {
  useEffect(() => {
    const scrollEl = document.querySelector('[data-scroll-container]');

    if (scrollEl) {
      const locomotiveScroll = new LocomotiveScroll({
        el: scrollEl as HTMLElement,
        smooth: true,
        multiplier: 1,
        class: 'is-ready',
      });

      initGsapAnimations(locomotiveScroll);

      return () => {
        if (locomotiveScroll) locomotiveScroll.destroy();
      };
    }
  }, []);
};