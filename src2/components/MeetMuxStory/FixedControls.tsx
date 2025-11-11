import { Moon, Sun, RotateCcw } from 'lucide-react';

interface FixedControlsProps {
    darkMode: boolean;
    toggleDarkMode: () => void;
    scrollToTop: () => void;
}

const FixedControls = ({ darkMode, toggleDarkMode, scrollToTop }: FixedControlsProps) => {
    return (
        <div className="fixed top-6 right-6 z-40 flex gap-3">
            <button
                onClick={toggleDarkMode}
                className="p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all"
            >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
                onClick={scrollToTop}
                className="p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all"
            >
                <RotateCcw className="w-5 h-5" />
            </button>
        </div>
    );
}

export default FixedControls
