import {
  Sparkles,
  MapPin,
  Shield,
  Zap,
  Users,
  Activity,
} from "lucide-react";

function AI() {
  const features = [
    {
      icon: Zap,
      title: "Smart Matching",
      description:
        "Our AI matches you with people who share your interests and are nearby, making connections more meaningful.",
      color: "from-rose-400 to-pink-500",
    },
    {
      icon: Shield,
      title: "AI Verification",
      description:
        "AI-powered selfie verification ensures authentic connections. Meet real people, not fake profiles.",
      color: "from-amber-400 to-orange-500",
    },
    {
      icon: Activity,
      title: "Activity-First Platform",
      description:
        "Discover people around you based on real-time and planned activities like sports, movies, or travel.",
      color: "from-emerald-400 to-teal-500",
    },
  ];

  return (
    <section
      data-scroll-section
      className="min-h-screen flex items-center justify-center py-24 md:py-32 relative overflow-hidden bg-gradient-to-b from-emerald-50 via-teal-50 to-cyan-50"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          data-parallax="1.5"
          className="absolute top-1/4 right-10 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl animate-pulse"
        />
        <div
          data-parallax="-1"
          className="absolute bottom-1/3 left-10 w-80 h-80 bg-rose-300/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 px-6 py-2 bg-rose-500 text-white rounded-full text-sm tracking-wide font-medium shadow-lg mb-8">
            <Sparkles className="w-4 h-4" />
            <span>POWERED BY AI</span>
          </div>

          <h2
            data-scroll
            data-scroll-speed="0.5"
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-8"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            MeetMux is an AI-powered,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-amber-500 to-rose-500">
              activity-first social platform
            </span>
          </h2>

          <p
            data-fade
            className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed"
          >
            We bring real, meaningful, in-person connections back into your
            life.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                data-scroll
                data-scroll-speed={index % 2 === 0 ? "1" : "-1"}
                className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 transform transition-transform group-hover:rotate-12 group-hover:scale-110`}
                >
                  <Icon className="w-8 h-8 text-white" strokeWidth={2} />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Key Benefits */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-r from-rose-50 via-amber-50 to-rose-50 rounded-3xl p-10 md:p-12 border-2 border-rose-200 shadow-xl relative overflow-hidden">
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 animate-pulse" />

            <div className="relative z-10">
              <div className="flex items-center justify-center mb-8">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-rose-500 to-amber-500 flex items-center justify-center">
                  <Users className="w-10 h-10 text-white" strokeWidth={2} />
                </div>
              </div>

              <h3
                className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-8"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Real connections, powered by AI
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-rose-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2 text-lg">
                      Location-Based Discovery
                    </h4>
                    <p className="text-gray-600">
                      Find people nearby who share your interests and are ready
                      to connect.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2 text-lg">
                      Verified Profiles
                    </h4>
                    <p className="text-gray-600">
                      AI verification ensures you're meeting real people, not
                      fake profiles.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <Activity className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2 text-lg">
                      Activity Matching
                    </h4>
                    <p className="text-gray-600">
                      Connect through real-time and planned activities that you
                      both love.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2 text-lg">
                      Smart Recommendations
                    </h4>
                    <p className="text-gray-600">
                      Our AI learns your preferences to suggest the best
                      connections and activities.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the future of social connection. Where AI meets
            authenticity, and technology brings people together in real life.
          </p>
        </div>
      </div>
    </section>
  );
}

export default AI;

