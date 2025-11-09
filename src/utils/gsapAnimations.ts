import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type LocomotiveScroll from 'locomotive-scroll';

gsap.registerPlugin(ScrollTrigger);

export const initGsapAnimations = (locomotiveScroll: LocomotiveScroll) => {
  locomotiveScroll.on('scroll', ScrollTrigger.update);

  ScrollTrigger.scrollerProxy('[data-scroll-container]', {
    scrollTop(value) {
      if (arguments.length) {
        locomotiveScroll.scrollTo(value as number, { duration: 0, disableLerp: true });
      }
      return locomotiveScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: (document.querySelector('[data-scroll-container]') as HTMLElement)?.style.transform
      ? 'transform'
      : 'fixed',
  });

  ScrollTrigger.addEventListener('refresh', () => locomotiveScroll.update());
  ScrollTrigger.refresh();
};
