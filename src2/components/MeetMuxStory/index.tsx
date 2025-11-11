"use client";

import { useState, useEffect, useRef } from "react";
import DiscoveryChapter from "./chapters/DiscoveryChapter";
import HeroChapter from "./chapters/HeroChapter";
import FixedControls from "./FixedControls";
import ProgressIndicator from "./ProgressIndicator";
import JourneyContinue from "./chapters/JourneyContinue";
import PlannedPartyChapter from "./chapters/PlannedPartyChapter";
import { TribeFound } from "./chapters/TribeFoundChapter";
import YourTurnChapter from "./chapters/YourTurnChapter";
import Footer from "./Footer";

export const MeetMuxStory: React.FC = () => {
    const [darkMode, setDarkMode] = useState(true);
    const [currentChapter, setCurrentChapter] = useState(0);

    const totalChapters = 6;
    const toggleDarkMode = () => setDarkMode((prev) => !prev);
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

    const heroRef = useRef<HTMLElement | null>(null);
    const discoveryRef = useRef<HTMLElement | null>(null);
    const journeyRef = useRef<HTMLElement | null>(null);
    const plannedRef = useRef<HTMLElement | null>(null);
    const tribeRef = useRef<HTMLElement | null>(null);
    const yourTurnRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        document.documentElement.classList.toggle("dark", darkMode);
    }, [darkMode]);

    // ✅ Detect current chapter (still works with Lenis)
    useEffect(() => {
        const handleScroll = () => {
            const sections = [
                { ref: heroRef, index: 0 },
                { ref: discoveryRef, index: 1 },
                { ref: journeyRef, index: 2 },
                { ref: plannedRef, index: 3 },
                { ref: tribeRef, index: 4 },
                { ref: yourTurnRef, index: 5 },
            ];

            let current = 0;
            for (let i = sections.length - 1; i >= 0; i--) {
                const el = sections[i].ref.current;
                if (el && el.getBoundingClientRect().top <= window.innerHeight / 2) {
                    current = sections[i].index;
                    break;
                }
            }
            setCurrentChapter(current);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <main
            className={`w-full chapter overflow-x-hidden transition-colors duration-500 ${darkMode ? "bg-slate-900 text-white" : "bg-gray-100 text-black"
                }`}
        >
            <ProgressIndicator
                currentChapter={currentChapter}
                totalChapters={totalChapters}
            />

            <FixedControls
                darkMode={darkMode}
                toggleDarkMode={toggleDarkMode}
                scrollToTop={scrollToTop}
            />

            <HeroChapter ref={heroRef} darkMode={darkMode} />
            <DiscoveryChapter ref={discoveryRef} darkMode={darkMode} />
            <JourneyContinue ref={journeyRef} darkMode={darkMode} />
            <PlannedPartyChapter ref={plannedRef} darkMode={darkMode} />
            <TribeFound ref={tribeRef} darkMode={darkMode} />
            <YourTurnChapter ref={yourTurnRef} darkMode={darkMode} />
            <Footer darkMode={darkMode} />
        </main>
    );
};

export default MeetMuxStory;

