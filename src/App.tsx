import { useEffect, useRef } from "react";
import Hero from "./components/Hero";
import Problem from "./components/Problem";
import Spark from "./components/Spark";
import Experience from "./components/Experience";
import AI from "./components/AI";
import Emotion from "./components/Emotion";
import Invitation from "./components/Invitation";
import { initSmoothScroll } from "./utils/smoothScroll";
import { initScrollAnimations } from "./utils/scrollAnimations";

function App() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize smooth scrolling
    const cleanup = initSmoothScroll(scrollRef.current);

    // Initialize all scroll-based animations
    initScrollAnimations();

    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <div
      ref={scrollRef}
      data-scroll-container
      className="bg-gradient-to-b from-peach-50 via-lavender-50 to-sage-50"
      style={{
        transition: "background-color 1.5s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <Hero />
      <Problem />
      <Spark />
      <Experience />
      <AI />
      <Emotion />
      <Invitation />
    </div>
  );
}

export default App;
