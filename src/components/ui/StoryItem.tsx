import { Avatar, AvatarImage, AvatarFallback } from "./avatar";

type StoryItemProps = {
  category: string;
  imageUrl: string;
  quote: string;
  author: string;
  age: string;
  avatarUrl: string;
};

export const StoryItem = ({
  category,
  imageUrl,
  quote,
  author,
  age,
  avatarUrl,
}: StoryItemProps) => (
  <div className="rs-slide absolute inset-0">
    <img
      src={imageUrl}
      alt={`${category} story`}
      className="absolute inset-0 w-full h-full object-cover"
      loading="lazy"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>
    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
      <div className="mb-3 inline-flex items-center space-x-2 px-3 py-1.5 bg-white/15 rounded-full text-xs font-bold">
        <span>{category}</span>
      </div>
      <p className="text-lg md:text-xl italic leading-relaxed max-w-2xl">
        “{quote}”
      </p>
      <div className="mt-4 flex items-center space-x-3">
        <Avatar className="ring-white">
          <AvatarImage src={avatarUrl} alt={author} />
          <AvatarFallback>{author.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="text-sm">
          <p className="font-semibold">
            {author}, {age}
          </p>
          <p className="text-white/70 text-xs">Early Member</p>
        </div>
      </div>
    </div>
  </div>
);
