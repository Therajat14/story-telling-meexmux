import {
  Heart,
  Laugh,
  Mountain,
  Camera,
  Sparkles,
  Coffee,
  Music,
  Users,
} from "lucide-react";
import { ParallaxStories } from "./ui/ParallaxStories";

function Emotion() {
  const moments = [
    {
      icon: Laugh,
      text: "Shared laughter",
      color: "from-amber-400 to-orange-500",
    },
    {
      icon: Mountain,
      text: "New adventures",
      color: "from-emerald-400 to-teal-500",
    },
    {
      icon: Heart,
      text: "Real connections",
      color: "from-rose-400 to-pink-500",
    },
    {
      icon: Camera,
      text: "Lasting memories",
      color: "from-purple-400 to-indigo-500",
    },
  ];

  const stories = [
    {
      quote:
        "I met Sarah at a sunrise yoga session. Now we hike every weekend and she's my best friend.",
      author: "Alex",
      age: "28",
      activity: "Yoga",
      icon: Users,
    },
    {
      quote:
        "Found my running crew through MeetMux. Three months later, we're training for a marathon!",
      author: "Michael",
      age: "32",
      activity: "Running",
      icon: Mountain,
    },
    {
      quote:
        "Started going to coffee tastings alone. Met someone who loves coffee as much as I do. Dating now!",
      author: "Emma",
      age: "26",
      activity: "Coffee",
      icon: Coffee,
    },
    {
      quote:
        "Joined a photography walk and met my now-boyfriend. We explore new places every weekend!",
      author: "Jessica",
      age: "29",
      activity: "Photography",
      icon: Camera,
    },
    {
      quote:
        "Book club led to the best friendship I've ever had. We read and discuss books every month.",
      author: "David",
      age: "35",
      activity: "Reading",
      icon: Users,
    },
  ];


  return (
    <section
      data-scroll-section
      className="min-h-screen flex items-center justify-center py-24 md:py-32 relative overflow-hidden bg-gradient-to-b from-peach-50 via-lavender-50 to-sage-50"
    >
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          data-parallax="-1"
          className="absolute top-20 left-20 w-96 h-96 bg-rose-300/20 rounded-full blur-3xl animate-pulse"
        />
        <div
          data-parallax="1.5"
          className="absolute top-1/3 right-20 w-[500px] h-[500px] bg-amber-300/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          data-parallax="-0.8"
          className="absolute bottom-20 left-1/3 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-20">
          <div
            data-scale
            className="inline-flex items-center space-x-2 px-6 py-2 bg-rose-500 text-white rounded-full text-sm tracking-wide mb-8 shadow-lg font-medium"
          >
            <Sparkles className="w-4 h-4" />
            <span>THE EMOTION</span>
          </div>

          <h2
            data-split
            className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight mb-8"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Because real stories
            <br />
            <span
              className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-amber-500 to-rose-500 animate-gradient"
              style={{ backgroundSize: "200% auto" }}
            >
              start offline.
            </span>
          </h2>

          <p
            data-fade
            className="text-3xl font-medium text-gray-700 max-w-3xl mx-auto leading-relaxed"
          >
            Stop swiping. Start living.
          </p>

          {/* Decorative divider */}
          <div className="flex items-center justify-center space-x-4 mt-8">
            <div className="w-20 h-1 bg-gradient-to-r from-transparent via-rose-400 to-transparent rounded-full" />
            <Heart
              className="w-5 h-5 text-rose-400 animate-pulse"
              fill="currentColor"
            />
            <div className="w-20 h-1 bg-gradient-to-r from-transparent via-rose-400 to-transparent rounded-full" />
          </div>
        </div>

        {/* Moment cards */}
        <div
          data-stagger
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto mb-24"
        >
          {moments.map((moment, index) => {
            const Icon = moment.icon;
            return (
              <div
                key={index}
                data-scale
                data-magnetic="0.2"
                className="group bg-white/90 backdrop-blur-sm rounded-3xl p-8 text-center transition-all hover:scale-110 hover:bg-white hover:shadow-2xl cursor-pointer"
              >
                <div
                  className={`w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${moment.color} flex items-center justify-center group-hover:rotate-12 group-hover:scale-110 transition-all duration-500`}
                >
                  <Icon className="w-10 h-10 text-white" strokeWidth={2} />
                </div>
                <p className="text-gray-700 font-bold text-lg">{moment.text}</p>
              </div>
            );
          })}
        </div>

        {/* Stories Gallery */}
        <div className="max-w-7xl mx-auto mb-24">
          <h3
            data-fade
            className="text-4xl font-bold text-gray-900 text-center mb-16"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Real stories from real people
          </h3>

          <ParallaxStories stories={stories} />
        </div>

        {/* Comparison */}
        <div data-clip className="max-w-5xl mx-auto mb-24">
          <div className="grid md:grid-cols-2 gap-8">
            {/* OLD */}
            <div className="bg-gray-100 rounded-3xl p-10 space-y-4">
              <h4 className="text-2xl font-bold text-gray-500 mb-6">
                The old way:
              </h4>
              <div className="space-y-3 text-gray-600 text-lg">
                {[
                  "Profile pictures",
                  "Awkward first dates",
                  "Small talk",
                  "Wondering about chemistry",
                ].map((text) => (
                  <p key={text} className="flex items-start space-x-2">
                    <span className="text-red-500 mt-1">✗</span>
                    <span>{text}</span>
                  </p>
                ))}
              </div>
            </div>

            {/* NEW */}
            <div
              data-reveal
              className="bg-gradient-to-br from-rose-400 to-amber-400 rounded-3xl p-10 space-y-4 text-white relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent group-hover:translate-x-full transition-transform duration-1000" />

              <h4 className="text-2xl font-bold mb-6 relative z-10">
                The MeetMux way:
              </h4>
              <div className="space-y-3 text-lg relative z-10">
                {[
                  "Shared activities",
                  "Natural meetings",
                  "Real conversations",
                  "Chemistry reveals itself",
                ].map((text) => (
                  <p key={text} className="flex items-start space-x-2">
                    <span className="mt-1 font-bold">✓</span>
                    <span>{text}</span>
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div data-scale className="text-center">
          <button
            data-magnetic="0.4"
            className="group relative px-16 py-8 bg-gradient-to-r from-rose-500 to-amber-500 text-white text-3xl font-bold rounded-full shadow-2xl overflow-hidden hover:shadow-rose-500/50 transition-all"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />

            <span className="relative inline-flex items-center space-x-3">
              <Music className="w-8 h-8" />
              <span>Start your next story</span>
              <span className="group-hover:translate-x-2 transition-transform">
                →
              </span>
            </span>
          </button>

          <p className="mt-6 text-gray-600">
            Join 1,000+ people already making real connections
          </p>
        </div>

        {/* Quote */}
        <div data-fade className="max-w-4xl mx-auto mt-24 text-center">
          <blockquote
            className="text-3xl md:text-5xl font-bold text-gray-800 leading-relaxed"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            "The best relationships start when you're not looking—
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-amber-500">
              {" "}
              they start when you're living."
            </span>
          </blockquote>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 to-transparent" />
    </section>
  );
}

export default Emotion;
