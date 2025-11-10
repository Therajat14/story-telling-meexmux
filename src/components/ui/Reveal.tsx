import { useEffect, useRef } from "react";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Stagger index used for delay sequencing within a group */
  index?: number;
};

export default function Reveal({ children, className = "", index = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.setProperty("--reveal-delay", `${index * 80}ms`);

    let observer: IntersectionObserver | null = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add("reveal-in");
            if (observer) {
              observer.disconnect();
              observer = null;
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(el);

    return () => {
      if (observer) observer.disconnect();
    };
  }, [index]);

  return (
    <div ref={ref} className={`reveal-up ${className}`}>
      {children}
    </div>
  );
}


