
import React, { useRef, useEffect, useState, useEffectEvent } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface ScrollAnimationProps {
    children: React.ReactNode;
    className?: string;
}

export const ScrollAnimation: React.FC<ScrollAnimationProps> = ({
    children,
    className = "",
}) => {
    const ref = useRef<HTMLDivElement | null>(null);

    useGSAP(
        () => {
            gsap.from(ref.current, {
                y: 20,
                delay: 1.2,
                opacity: 0,
                duration: 1.2,
                ease: "power2.out",
            });
        },
        { scope: ref }
    );
    return (
        <div
            ref={ref}
            className={className}
        >
            {children}
        </div>
    );
};

/* ===============================
   ParallaxSection
   =============================== */
interface ParallaxSectionProps {
    children: React.ReactNode;
    className?: string;
}

export const ParallaxSection: React.FC<ParallaxSectionProps> = ({
    children,
    className = "",
}) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

    return (
        <motion.div ref={ref} style={{ y }} className={className}>
            {children}
        </motion.div>
    );
};

/* ===============================
   FadeInSection
   =============================== */
interface FadeInSectionProps {
    children: React.ReactNode;
    className?: string;
}

export const FadeInSection: React.FC<FadeInSectionProps> = ({
    children,
    className = "",
    delay,
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setIsVisible(true);
            },
            { threshold: 0.1 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <motion.div

            transition={{
                duration: 0.8,
                delay,
                ease: [0.25, 0.25, 0.25, 0.75],
            }}
            ref={ref}
            className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                } ${className}`}
        >
            {children}
        </motion.div>
    );
};

