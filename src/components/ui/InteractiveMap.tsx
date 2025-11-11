"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

interface InteractiveMapProps {
  darkMode?: boolean;
}

const pointsOfInterest = [
  { id: 1, x: '25%', y: '30%', name: 'Greenwood Park' },
  { id: 2, x: '60%', y: '45%', name: 'Cineplex Central' },
  { id: 3, x: '40%', y: '65%', name: 'The Daily Grind Cafe' },
  { id: 4, x: '75%', y: '75%', name: 'Gamer\'s Guild' },
];

const InteractiveMap: React.FC<InteractiveMapProps> = ({ darkMode = false }) => {
  return (
    <div className={`relative w-full h-64 rounded-2xl overflow-hidden border-2 ${darkMode ? 'border-indigo-700 bg-indigo-900' : 'border-indigo-300 bg-indigo-100'}`}>
      {/* Map background - a simple gradient */}
      <div className={`absolute inset-0 ${darkMode ? 'opacity-30' : 'opacity-50'}`} style={{
        backgroundImage: `
          radial-gradient(${darkMode ? '#4f46e5' : '#a5b4fc'} 1px, transparent 1px),
          radial-gradient(${darkMode ? '#4f46e5' : '#a5b4fc'} 1px, transparent 1px)
        `,
        backgroundSize: '20px 20px',
        backgroundPosition: '0 0, 10px 10px',
      }}></div>

      {/* Points of Interest */}
      {pointsOfInterest.map((point, index) => (
        <motion.div
          key={point.id}
          className="absolute"
          style={{ left: point.x, top: point.y }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: index * 0.2 + 0.5, type: 'spring', stiffness: 200 }}
        >
          <MapPin className={`w-8 h-8 ${darkMode ? 'text-pink-400' : 'text-pink-500'} fill-current ${darkMode ? 'fill-pink-900' : 'fill-pink-200'}`} />
          <motion.div
            className={`absolute bottom-full mb-2 w-max px-2 py-1 text-xs rounded-md shadow-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 + 0.8 }}
          >
            {point.name}
          </motion.div>
          {/* Pulsing animation */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              backgroundColor: darkMode ? 'rgba(236, 72, 153, 0.5)' : 'rgba(236, 72, 153, 0.5)',
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: index * 0.3,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default InteractiveMap;
