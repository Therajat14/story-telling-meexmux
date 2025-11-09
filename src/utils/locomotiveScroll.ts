import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';

export const initLocomotiveScroll = (container: HTMLElement | null) => {
  if (!container) return null;

  const scroll = new LocomotiveScroll({
    el: container,
    smooth: true,
    multiplier: 1,
    class: 'is-reveal',
    reloadOnContextChange: true,
    resetNativeScroll: true,
    lerp: 0.1,
    smartphone: {
      smooth: false, /* Disable on mobile to avoid issues */
    },
    tablet: {
      smooth: false, /* Disable on tablet to avoid issues */
    },
  });

  return scroll;
};
