import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const StoreBackground = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const hearts = gsap.utils.toArray<SVGElement>(".heart");
    const sparks = gsap.utils.toArray<SVGElement>(".spark");

    gsap.set(hearts, {
      opacity: 0,
      scale: 0,
      transformOrigin: "center center",
    });
    gsap.set(sparks, {
      opacity: 0,
      scale: 0,
      transformOrigin: "center center",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: svg,
        start: "top 90%",
        end: "bottom 10%",
        scrub: 2,
      },
    });

    tl.to(
      hearts,
      {
        opacity: 1,
        scale: 1.2,
        stagger: 0.3,
        ease: "elastic.out(1, 0.4)",
      },
      0
    )
      .to(
        sparks,
        {
          opacity: 1,
          scale: 1.5,
          stagger: 0.15,
          ease: "elastic.out(1, 0.5)",
        },
        0.3
      )
      .to(
        hearts,
        {
          rotation: 360,
          duration: 30,
          ease: "none",
          repeat: -1,
        },
        0
      )
      .to(
        sparks,
        {
          x: () => gsap.utils.random(-200, 200),
          y: () => gsap.utils.random(-200, 200),
          rotation: () => gsap.utils.random(-360, 360),
          duration: 20,
          ease: "power1.inOut",
          repeat: -1,
          yoyo: true,
        },
        0
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
        <radialGradient
          id="heart-gradient-1"
          cx="50%"
          cy="50%"
          r="50%"
          fx="50%"
          fy="50%"
        >
          <stop offset="0%" stopColor="rgba(255, 105, 180, 0.4)" />
          <stop offset="100%" stopColor="rgba(255, 105, 180, 0)" />
        </radialGradient>
        <radialGradient
          id="heart-gradient-2"
          cx="50%"
          cy="50%"
          r="50%"
          fx="50%"
          fy="50%"
        >
          <stop offset="0%" stopColor="rgba(255, 20, 147, 0.4)" />
          <stop offset="100%" stopColor="rgba(255, 20, 147, 0)" />
        </radialGradient>
      </defs>

      {/* Hearts */}
      <g className="heart">
        <path
          d="M800 600 L750 550 A50 50 0 0 1 800 500 A50 50 0 0 1 850 550 Z"
          fill="url(#heart-gradient-1)"
        />
      </g>
      <g className="heart">
        <path
          d="M400 300 L350 250 A50 50 0 0 1 400 200 A50 50 0 0 1 450 250 Z"
          fill="url(#heart-gradient-2)"
        />
      </g>
      <g className="heart">
        <path
          d="M1200 900 L1150 850 A50 50 0 0 1 1200 800 A50 50 0 0 1 1250 850 Z"
          fill="url(#heart-gradient-1)"
        />
      </g>

      {/* Sparks */}
      <g className="spark">
        <Sparkles
          className="w-8 h-8"
          fill="rgba(255, 255, 255, 0.9)"
          stroke="none"
        />
      </g>
      <g className="spark">
        <Sparkles
          className="w-10 h-10"
          fill="rgba(255, 255, 255, 0.8)"
          stroke="none"
        />
      </g>
      <g className="spark">
        <Sparkles
          className="w-6 h-6"
          fill="rgba(255, 255, 255, 0.95)"
          stroke="none"
        />
      </g>
      <g className="spark">
        <Sparkles
          className="w-12 h-12"
          fill="rgba(255, 255, 255, 0.7)"
          stroke="none"
        />
      </g>
      <g className="spark">
        <Sparkles
          className="w-7 h-7"
          fill="rgba(255, 255, 255, 0.9)"
          stroke="none"
        />
      </g>
      <g className="spark">
        <Sparkles
          className="w-9 h-9"
          fill="rgba(255, 255, 255, 0.8)"
          stroke="none"
        />
      </g>
      <g className="spark">
        <Sparkles
          className="w-11 h-11"
          fill="rgba(255, 255, 255, 0.85)"
          stroke="none"
        />
      </g>
    </svg>
  );
};

export default StoreBackground;
