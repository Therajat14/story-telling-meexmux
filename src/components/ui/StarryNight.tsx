import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const StarryNight = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const stars = gsap.utils.toArray<SVGElement>(".star");
    const shootingStars = gsap.utils.toArray<SVGElement>(".shooting-star");

    gsap.set(stars, {
      opacity: 0,
      transformOrigin: "center center",
    });
    gsap.set(shootingStars, {
      opacity: 0,
      y: -100,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: svg,
        start: "top 80%",
        end: "bottom 20%",
        scrub: 1.5,
      },
    });

    tl.to(
      stars,
      {
        opacity: 1,
        stagger: 0.1,
        ease: "power2.out",
      },
      0
    ).to(
      shootingStars,
      {
        opacity: 1,
        x: 800,
        y: 800,
        stagger: 2,
        ease: "power1.inOut",
      },
      0.5
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1600 1200"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id="star-gradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(255, 255, 255, 1)" />
          <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
        </radialGradient>
      </defs>

      {/* Stars */}
      <g className="star">
        <circle cx="200" cy="300" r="2" fill="url(#star-gradient)" />
      </g>
      <g className="star">
        <circle cx="400" cy="500" r="3" fill="url(#star-gradient)" />
      </g>
      <g className="star">
        <circle cx="600" cy="200" r="2" fill="url(#star-gradient)" />
      </g>
      <g className="star">
        <circle cx="800" cy="400" r="4" fill="url(#star-gradient)" />
      </g>
      <g className="star">
        <circle cx="1000" cy="600" r="2" fill="url(#star-gradient)" />
      </g>
      <g className="star">
        <circle cx="1200" cy="300" r="3" fill="url(#star-gradient)" />
      </g>
      <g className="star">
        <circle cx="1400" cy="500" r="2" fill="url(#star-gradient)" />
      </g>

      {/* Shooting Stars */}
      <g className="shooting-star">
        <line
          x1="100"
          y1="100"
          x2="150"
          y2="150"
          stroke="white"
          strokeWidth="2"
        />
      </g>
      <g className="shooting-star">
        <line
          x1="500"
          y1="200"
          x2="550"
          y2="250"
          stroke="white"
          strokeWidth="2"
        />
      </g>
    </svg>
  );
};

export default StarryNight;
