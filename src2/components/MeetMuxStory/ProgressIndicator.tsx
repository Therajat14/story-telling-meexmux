// src/components/MeetMuxStory/ProgressIndicator.tsx
interface ProgressIndicatorProps {
    currentChapter: number;
    totalChapters: number;
}

export default function ProgressIndicator({ currentChapter, totalChapters }: ProgressIndicatorProps) {
    return (
        <div className="fixed left-6 top-1/2 transform -translate-y-1/2 z-40 flex flex-col gap-2">
            {[...Array(totalChapters)].map((_, i) => (
                <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all duration-500 ${currentChapter >= i ? 'bg-purple-500 scale-125' : 'bg-white/30'
                        }`}
                />
            ))}
        </div>
    );
}
