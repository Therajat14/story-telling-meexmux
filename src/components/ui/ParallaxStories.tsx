import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

interface Story {
  quote: string;
  author: string;
  age: string;
  activity: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  imageUrl?: string;
}

export const ParallaxStories = ({
  stories,
  className,
}: {
  stories: Story[];
  className?: string;
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: gridRef,
    offset: ["start start", "end start"],
  });

  const translateFirst = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const translateSecond = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const translateThird = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const third = Math.ceil(stories.length / 3);
  const firstPart = stories.slice(0, third);
  const secondPart = stories.slice(third, 2 * third);
  const thirdPart = stories.slice(2 * third);

  const renderStoryCard = (story: Story, idx: number) => {
    const Icon = story.icon;
    return (
      <motion.div
        key={`story-${idx}`}
        className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all border-2 border-rose-100 h-full flex flex-col"
      >
        {/* Photo */}
        {story.imageUrl ? (
          <div className="w-full mb-6">
            <img
              src={story.imageUrl}
              alt={`${story.activity} by ${story.author}`}
              className="w-full h-48 md:h-56 rounded-2xl object-cover"
              loading="lazy"
            />
          </div>
        ) : null}

        {/* Activity badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-rose-100 rounded-full text-xs font-bold text-rose-700 mb-6 w-fit">
          <Icon className="w-4 h-4" />
          <span>{story.activity}</span>
        </div>

        {/* Quote */}
        <p className="text-gray-700 italic mb-6 leading-relaxed text-lg flex-grow">
          "{story.quote}"
        </p>

        {/* Author */}
        <div className="flex items-center space-x-3 mt-auto">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-400 to-amber-400 flex items-center justify-center text-white font-bold text-lg">
            {story.author.charAt(0)}
          </div>
          <div>
            <p className="font-bold text-gray-900">
              {story.author}, {story.age}
            </p>
            <p className="text-xs text-gray-500">Early Member</p>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div
      className={cn("h-[60rem] items-start overflow-y-auto w-full", className)}
      ref={gridRef}
    >
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start max-w-7xl mx-auto gap-8 py-20 px-6"
      >
        <div className="grid gap-8">
          {firstPart.map((story, idx) => (
            <motion.div
              style={{ y: translateFirst }}
              key={"grid-1-" + idx}
              className="min-h-[400px]"
            >
              {renderStoryCard(story, idx)}
            </motion.div>
          ))}
        </div>
        <div className="grid gap-8">
          {secondPart.map((story, idx) => (
            <motion.div
              style={{ y: translateSecond }}
              key={"grid-2-" + idx}
              className="min-h-[400px]"
            >
              {renderStoryCard(story, idx + third)}
            </motion.div>
          ))}
        </div>
        <div className="grid gap-8">
          {thirdPart.map((story, idx) => (
            <motion.div
              style={{ y: translateThird }}
              key={"grid-3-" + idx}
              className="min-h-[400px]"
            >
              {renderStoryCard(story, idx + 2 * third)}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

