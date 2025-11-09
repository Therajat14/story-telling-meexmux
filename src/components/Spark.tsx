import { Zap, Frown, Smile, TrendingUp, Activity } from "lucide-react";

function Spark() {
  const activities = [
    "Morning Runs",
    "Coffee Meetups",
    "Art Classes",
    "Hiking",
    "Book Clubs",
    "Cooking",
    "Photography Walks",
    "Yoga",
    "Music Jams",
    "Dance",
    "Cycling",
    "Gaming",
    "Rock Climbing",
    "Pottery",
    "Tennis",
    "Meditation",
  ];

  return (
    <section
      data-scroll-section
      className="min-h-screen flex items-center justify-center py-24 md:py-32 bg-gradient-to-b from-peach-50 via-lavender-50 to-sage-50 relative overflow-hidden"
      data-bg-color="#fff5f0"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          data-parallax="1"
          className="absolute top-1/4 left-10 w-96 h-96 bg-amber-300/20 rounded-full blur-3xl"
        />
        <div
          data-parallax="-1.5"
          className="absolute bottom-1/4 right-10 w-[500px] h-[500px] bg-rose-300/20 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-20">
          <div
            data-scale
            className="inline-block px-6 py-2 bg-rose-500 text-white rounded-full text-sm tracking-wide font-medium shadow-lg mb-8"
          >
            THE SPARK
          </div>

          <h2
            data-split
            className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight mb-8"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Connection through activity.
          </h2>

          <p
            data-fade
            className="text-2xl md:text-3xl text-gray-700 max-w-4xl mx-auto leading-relaxed"
          >
            What if making new friends or finding a partner started with doing
            something you love?
          </p>
        </div>

        {/* Comparison cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-20">
          {/* Old way */}
          <div
            data-scrub="scale"
            className="bg-gray-100 rounded-[3rem] p-12 flex flex-col items-center justify-center space-y-6 min-h-[500px] relative overflow-hidden group"
          >
            {/* Fade overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-200/80 to-transparent pointer-events-none" />

            <div data-scale>
              <Frown
                className="w-32 h-32 text-gray-400 group-hover:rotate-12 transition-transform duration-500"
                strokeWidth={1.5}
              />
            </div>

            <div className="text-center space-y-4 relative z-10">
              <p className="text-3xl font-bold text-gray-600">
                Lonely in a crowded world
              </p>
              <div className="space-y-3 text-gray-500 text-lg">
                <p>• Profile after profile</p>
                <p>• Small talk, no spark</p>
                <p>• Conversations that fade</p>
                <p>• Always wondering "what if"</p>
              </div>
            </div>
          </div>

          {/* New way */}
          <div
            data-reveal
            className="bg-gradient-to-br from-rose-400 via-amber-400 to-rose-400 rounded-[3rem] p-12 flex flex-col items-center justify-center space-y-6 min-h-[500px] relative overflow-hidden group"
            style={{ backgroundSize: "200% 200%" }}
          >
            {/* Animated shine */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-1000" />

            <div data-rotate>
              <Smile
                className="w-32 h-32 text-white group-hover:scale-110 transition-transform duration-500"
                strokeWidth={1.5}
              />
            </div>

            <div className="text-center space-y-4 relative z-10">
              <p className="text-3xl font-bold text-white">
                Connected through shared moments
              </p>
              <div className="space-y-3 text-white/95 text-lg font-medium">
                <p>✓ Activities you already love</p>
                <p>✓ Instant common ground</p>
                <p>✓ Real conversations, real connections</p>
                <p>✓ Chemistry reveals itself naturally</p>
              </div>
            </div>

            {/* Badge */}
            <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full flex items-center space-x-2 text-white text-sm font-bold">
              <TrendingUp className="w-4 h-4" />
              <span>Better way</span>
            </div>
          </div>
        </div>

        {/* Key insight */}
        <div data-scale className="text-center mb-20">
          <div className="inline-flex items-center space-x-4 bg-white rounded-3xl shadow-2xl px-10 py-8 text-2xl md:text-3xl font-bold text-gray-900 max-w-4xl border-2 border-amber-200">
            <Zap className="w-10 h-10 text-amber-500 flex-shrink-0 animate-pulse" />
            <span>
              MeetMux connects you through real activities — not profiles.
            </span>
          </div>
        </div>

        {/* Activities preview */}
        <div className="max-w-6xl mx-auto">
          <div data-fade className="text-center mb-10">
            <div className="inline-flex items-center space-x-2 text-gray-600 text-lg">
              <Activity className="w-5 h-5" />
              <span className="font-semibold">
                Popular activities on MeetMux:
              </span>
            </div>
          </div>

          <div data-stagger className="flex flex-wrap justify-center gap-4">
            {activities.map((activity, index) => (
              <div
                key={activity}
                data-magnetic="0.2"
                className="px-8 py-4 bg-white rounded-full text-gray-700 font-semibold shadow-lg hover:shadow-2xl hover:scale-110 transition-all cursor-pointer border-2 border-transparent hover:border-amber-400"
              >
                {activity}
              </div>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div
          data-fade
          className="mt-24 grid grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          <div className="text-center">
            <div
              data-counter="89"
              className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-amber-500"
            >
              0
            </div>
            <div className="text-gray-600 mt-2">Success rate</div>
          </div>
          <div className="text-center">
            <div
              data-counter="500"
              className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-amber-500"
            >
              0
            </div>
            <div className="text-gray-600 mt-2">Activities</div>
          </div>
          <div className="text-center">
            <div
              data-counter="1000"
              className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-amber-500"
            >
              0
            </div>
            <div className="text-gray-600 mt-2">Members</div>
          </div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-lavender-50 to-transparent" />
    </section>
  );
}

export default Spark;
