import { MapPin, MessageCircle, Users, Calendar } from 'lucide-react';
import Reveal from "./ui/Reveal";

function Experience() {
  const steps = [
    {
      icon: Calendar,
      title: 'Pick what you love',
      description: 'From morning runs to art jams',
      color: 'from-rose-400 to-pink-500',
    },
    {
      icon: MapPin,
      title: 'Find people nearby',
      description: 'Who want to do the same',
      color: 'from-amber-400 to-orange-500',
    },
    {
      icon: MessageCircle,
      title: 'Connect & chat',
      description: 'Plan your activity together',
      color: 'from-emerald-400 to-teal-500',
    },
    {
      icon: Users,
      title: 'Meet in person',
      description: 'Start your real story',
      color: 'from-blue-400 to-indigo-500',
    },
  ];

  return (
    <section
      data-scroll-section
      className="min-h-screen flex items-center justify-center py-24 md:py-32 bg-gradient-to-b from-lavender-50 via-purple-50 to-fuchsia-50"
    >
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-20" data-scroll data-scroll-speed="1">
          <Reveal>
            <div className="inline-block px-6 py-2 bg-rose-500 text-white rounded-full text-sm tracking-wide font-medium shadow-lg mb-8">
              THE EXPERIENCE
            </div>
          </Reveal>

          <Reveal>
            <h2
              data-scroll
              data-scroll-speed="0.5"
              className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight mb-8"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              How it works.
            </h2>
          </Reveal>

          <Reveal index={1}>
            <p data-scroll data-scroll-speed="0.8" className="text-3xl font-medium text-gray-700 max-w-2xl mx-auto">
              It's that simple.
            </p>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                data-scroll
                data-scroll-speed={index % 2 === 0 ? '1' : '-1'}
                className="group"
              >
                <div className="bg-white rounded-3xl p-8 shadow-lg transform transition-all duration-500 hover:scale-110 hover:shadow-2xl min-h-[320px] flex flex-col items-center justify-center">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 transform transition-transform group-hover:rotate-12`}>
                    <Icon className="w-10 h-10 text-white" strokeWidth={2} />
                  </div>

                  <div className="text-4xl font-bold text-gray-300 mb-4">
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">
                    {step.title}
                  </h3>

                  <p className="text-gray-600 text-center leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Experience;
