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
  <div className="rs-slide absolute inset-0 rounded-xl overflow-hidden">
    {/* Background Image */}
    <img
      src={imageUrl}
      alt={`${category} story`}
      className="absolute inset-0 w-full h-full object-cover rounded-xl"
      loading="lazy"
    />

    {/* Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>

    {/* Text Content */}
    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white bg-black/40 relative z-10">
      <div className="mb-3 inline-flex items-center space-x-2 px-3 py-1.5 bg-white/20 rounded-full text-xs font-bold">
        <span>{category}</span>
      </div>

      <p className="text-lg md:text-xl italic leading-relaxed max-w-2xl">
        “{quote}”
      </p>

      {/* Author Info */}
      <div className="mt-4 flex items-center space-x-3">
        <img
          src={avatarUrl}
          alt={author}
          className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md"
          loading="lazy"
        />
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
