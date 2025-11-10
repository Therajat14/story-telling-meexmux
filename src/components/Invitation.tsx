import { ArrowRight, Mail } from "lucide-react";
import Reveal from "./ui/Reveal";
import { useState } from "react";

function Invitation() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      data-scroll-section
      className="min-h-screen flex items-center justify-center py-24 md:py-32 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 relative overflow-hidden"
    >
      <div data-scroll data-scroll-speed="-2" className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-rose-500/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <div className="max-w-4xl mx-auto text-center">
          <div data-scroll data-scroll-speed="0.5">
            <Reveal>
              <div className="inline-block px-6 py-2 bg-rose-500 text-white rounded-full text-sm tracking-wide font-medium shadow-lg mb-8">
                THE INVITATION
              </div>
            </Reveal>

            <Reveal>
              <h2
                className="text-6xl md:text-8xl font-bold text-white leading-tight mb-8"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Join the movement.
              </h2>
            </Reveal>

            <Reveal index={1}>
              <p className="text-2xl md:text-3xl text-gray-300 mb-16 leading-relaxed max-w-3xl mx-auto">
                Be part of bringing back authentic human connection.
              </p>
            </Reveal>
          </div>

          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              data-scroll
              data-scroll-speed="1"
              className="max-w-2xl mx-auto mb-16"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Mail className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20  text-gray-400 w-6 h-6" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full pl-16 pr-6 py-6 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-2xl text-white placeholder-gray-400 text-lg focus:outline-none focus:border-rose-400 transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="group px-10 py-6 bg-gradient-to-r from-rose-500 to-amber-500 text-white text-lg font-bold rounded-2xl shadow-2xl transform transition-all hover:scale-105 hover:shadow-3xl whitespace-nowrap"
                >
                  <span className="inline-flex items-center space-x-2">
                    <span>Get Early Access</span>
                    <ArrowRight className="w-5 h-5 transform transition-transform group-hover:translate-x-1" />
                  </span>
                </button>
              </div>
            </form>
          ) : (
            <div
              data-scroll
              data-scroll-speed="1"
              className="max-w-2xl mx-auto mb-16 p-8 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl"
            >
              <div className="text-3xl font-bold text-white mb-4">
                Welcome aboard! 🎉
              </div>
              <p className="text-xl text-gray-300">
                We'll reach out soon with your early access details.
              </p>
            </div>
          )}

          <div data-scroll data-scroll-speed="0.8" className="space-y-6">
            <h3
              className="text-5xl font-bold text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              MEETMUX
            </h3>
            <p className="text-xl text-gray-400">
              Meet through moments, not matches.
            </p>

            <div className="flex justify-center space-x-8 text-gray-500 text-sm pt-8">
              <a href="#" className="hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Invitation;
