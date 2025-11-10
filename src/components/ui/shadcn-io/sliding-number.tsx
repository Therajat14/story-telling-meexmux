import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

export interface SlidingNumberProps {
  number: number;
  /**
   * When provided, left-pads the number with zeros.
   * If boolean true, defaults to 2 digits.
   */
  padStart?: number | boolean;
  /**
   * If true (default), the animation starts when the component enters the viewport.
   * If false, it animates immediately on mount.
   */
  triggerOnView?: boolean;
  /** Additional classes applied to the root container */
  className?: string;
  /** Classes applied to each digit */
  digitClassName?: string;
}

export function SlidingNumber({
  number,
  padStart,
  triggerOnView = true,
  className,
  digitClassName,
}: SlidingNumberProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const columnRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isActive, setIsActive] = useState(!triggerOnView);

  const digitString = useMemo(() => {
    const padLength =
      typeof padStart === "number" ? Math.max(0, padStart) : padStart ? 2 : 0;
    const safeNumber = Number.isFinite(number) ? Math.max(0, Math.floor(number)) : 0;
    const padded = padLength ? safeNumber.toString().padStart(padLength, "0") : safeNumber.toString();
    return padded;
  }, [number, padStart]);

  const digits = useMemo(() => digitString.split(""), [digitString]);

  // Observe visibility to start animation when in view
  useEffect(() => {
    if (!triggerOnView) return;
    const el = rootRef.current;
    if (!el) return;
    let observer: IntersectionObserver | null = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsActive(true);
            if (observer) {
              observer.disconnect();
              observer = null;
            }
          }
        });
      },
      {
        root: null,
        threshold: 0.3,
      }
    );
    observer.observe(el);
    return () => {
      if (observer) observer.disconnect();
    };
  }, [triggerOnView]);

  useEffect(() => {
    columnRefs.current = columnRefs.current.slice(0, digits.length);

    columnRefs.current.forEach((column) => {
      if (!column) return;
      column.style.transition = "none";
      column.style.transform = "translateY(0%)";
    });

    if (!isActive) return;

    const raf = requestAnimationFrame(() => {
      columnRefs.current.forEach((column, index) => {
        if (!column) return;
        column.style.transition = "transform 0.6s cubic-bezier(0.33, 1, 0.68, 1)";
        const digit = Number(digits[index] ?? 0);
        column.style.transform = `translateY(-${digit * 10}%)`;
      });
    });

    return () => {
      cancelAnimationFrame(raf);
    };
  }, [digits, isActive]);

  return (
    <div ref={rootRef} className={cn("inline-flex items-end gap-1 leading-none", className)}>
      {digits.map((digit, index) => (
        <div
          key={`${index}-${digit}`}
          className="relative h-[1em] min-w-[0.6em] overflow-hidden"
        >
          <div
            ref={(el) => {
              columnRefs.current[index] = el;
            }}
            className="flex flex-col"
          >
            {DIGITS.map((d) => (
              <span
                key={d}
                className={cn(
                  "flex h-[1em] items-center justify-center leading-none text-current",
                  digitClassName
                )}
              >
                {d}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}


