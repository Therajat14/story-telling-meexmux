interface BackgroundArcsProps {
    darkMode?: boolean;
}

export const BackgroundArcs = ({ darkMode = true }: BackgroundArcsProps) => {
    const strokeColor = darkMode ? "rgba(255,255,255," : "rgba(76,29,149,";
    const opacity = darkMode ? "0.1)" : "0.15)";

    return (
        <svg
            className="background-arcs absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
        >
            <path
                d="M10,50 Q50,10 90,50"
                stroke={`${strokeColor}${opacity}`}
                strokeWidth="0.5"
                fill="none"
                strokeDasharray="200"
                strokeDashoffset="200"
                className="arc-path-1"
            />
            <path
                d="M10,70 Q50,30 90,70"
                stroke={`${strokeColor}${opacity}`}
                strokeWidth="0.5"
                fill="none"
                strokeDasharray="200"
                strokeDashoffset="200"
                className="arc-path-2"
            />
        </svg>
    );
};
