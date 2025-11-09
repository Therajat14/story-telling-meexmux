import type LocomotiveScroll from 'locomotive-scroll';

// RGB values for smooth interpolation (average of gradient colors)
const sectionRGBValues = [
  { r: 255, g: 245, b: 240 }, // Hero - peach-100/lavender-50/sage-100 blend
  { r: 255, g: 247, b: 237 }, // Problem - peach-50/lavender-50/sage-50
  { r: 255, g: 247, b: 237 }, // Spark - peach-50/lavender-50/sage-50
  { r: 255, g: 247, b: 237 }, // Experience - peach-50/lavender-50/sage-50
  { r: 255, g: 247, b: 237 }, // Emotion - peach-50/lavender-50/sage-50
  { r: 17, g: 24, b: 39 }, // Invitation - gray-900
];

export function initBackgroundTransition(locomotiveScroll: LocomotiveScroll | null) {
  if (!locomotiveScroll) return;

  const sections = document.querySelectorAll('[data-scroll-section]');
  if (sections.length === 0) return;

  const container = document.querySelector('[data-scroll-container]') as HTMLElement;
  if (!container) return;

  let rafId: number | null = null;

  const updateBackground = () => {
    const scrollY = locomotiveScroll!.scroll.instance.scroll.y;
    const windowHeight = window.innerHeight;
    
    // Find current section and calculate transition progress
    let currentSectionIndex = 0;
    let transitionProgress = 0;

    sections.forEach((section, index) => {
      const rect = (section as HTMLElement).getBoundingClientRect();
      const sectionTop = scrollY + rect.top;
      const sectionHeight = rect.height;
      const viewportCenter = scrollY + windowHeight / 2;
      
      // Check if viewport center is in this section
      if (viewportCenter >= sectionTop && viewportCenter < sectionTop + sectionHeight) {
        currentSectionIndex = index;
        // Calculate how far through the section we are (0 to 1)
        const sectionProgress = (viewportCenter - sectionTop) / sectionHeight;
        
        // Use the middle 60% of section for transition (20% to 80%)
        if (sectionProgress > 0.2 && sectionProgress < 0.8) {
          transitionProgress = (sectionProgress - 0.2) / 0.6;
        } else if (sectionProgress >= 0.8) {
          transitionProgress = 1;
        }
      }
    });

    // Interpolate between current and next section colors
    const currentColor = sectionRGBValues[Math.min(currentSectionIndex, sectionRGBValues.length - 1)];
    const nextColor = sectionRGBValues[Math.min(currentSectionIndex + 1, sectionRGBValues.length - 1)];
    
    const r = Math.round(currentColor.r + (nextColor.r - currentColor.r) * transitionProgress);
    const g = Math.round(currentColor.g + (nextColor.g - currentColor.g) * transitionProgress);
    const b = Math.round(currentColor.b + (nextColor.b - currentColor.b) * transitionProgress);

    // Apply smooth background color transition
    container.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
  };

  // Throttled update using requestAnimationFrame
  const throttledUpdate = () => {
    if (rafId) return;
    rafId = requestAnimationFrame(() => {
      updateBackground();
      rafId = null;
    });
  };

  // Update on scroll
  locomotiveScroll.on('scroll', throttledUpdate);
  
  // Initial update
  setTimeout(updateBackground, 500);
}

