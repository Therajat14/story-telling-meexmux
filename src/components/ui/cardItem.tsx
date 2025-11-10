// StoryItem.tsx
import { Heart, MessageCircle, Send, Bookmark } from "lucide-react";

type StoryItemProps = {
  category: string;
  imageUrl: string;
  quote: string;
  author: string;
  age: string;
  avatarUrl: string;
};

export function StoryItem({
  imageUrl,
  quote,
  author,
  age,
  avatarUrl,
}: StoryItemProps) {
  return (
    <div className="absolute inset-0 w-full h-full flex items-center justify-center p-3">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-sm w-full border border-gray-100">
        {/* Post Header */}
        <div className="flex items-center gap-2.5 px-3 py-2.5">
          <img
            src={avatarUrl}
            alt={author}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 text-sm leading-tight">
              {author}
            </h3>
            <p className="text-xs text-gray-500 leading-tight">
              {age} years old
            </p>
          </div>
          <button className="text-gray-400 hover:text-gray-600 w-6 h-6 flex items-center justify-center">
            <svg className="w-1 h-1" viewBox="0 0 4 16" fill="currentColor">
              <circle cx="2" cy="2" r="2" />
              <circle cx="2" cy="8" r="2" />
              <circle cx="2" cy="14" r="2" />
            </svg>
          </button>
        </div>

        {/* Post Image */}
        <div className="relative aspect-square w-full bg-gray-50">
          <img
            src={imageUrl}
            alt={`${author}'s story`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Post Actions */}
        <div className="flex items-center px-3 py-2">
          <div className="flex items-center gap-3 flex-1">
            <button className="hover:text-rose-500 transition-colors active:scale-90">
              <Heart className="w-5 h-5" strokeWidth={2} />
            </button>
            <button className="hover:text-blue-500 transition-colors active:scale-90">
              <MessageCircle className="w-5 h-5" strokeWidth={2} />
            </button>
            <button className="hover:text-green-500 transition-colors active:scale-90">
              <Send className="w-5 h-5" strokeWidth={2} />
            </button>
          </div>
          <button className="hover:text-amber-500 transition-colors active:scale-90">
            <Bookmark className="w-5 h-5" strokeWidth={2} />
          </button>
        </div>

        {/* Post Caption */}
        <div className="px-3 pb-3">
          <p className="text-xs text-gray-800 leading-relaxed">
            <span className="font-semibold">{author}</span>{" "}
            <span className="text-gray-700">{quote}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
