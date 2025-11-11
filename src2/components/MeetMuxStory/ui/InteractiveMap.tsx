import { motion } from 'framer-motion';
import { MapPin, Users, Clock } from 'lucide-react';

interface ActivityPin {
    id: string;
    title: string;
    participants: number;
    time: string;
    x: number;
    y: number;
}

const activities: ActivityPin[] = [
    { id: '1', title: 'Hiking at Sunset Peak', participants: 3, time: '6:00 PM', x: 25, y: 30 },
    { id: '2', title: 'Coffee & Board Games', participants: 5, time: '2:00 PM', x: 60, y: 45 },
    { id: '3', title: 'Indie Film Screening', participants: 8, time: '7:30 PM', x: 40, y: 70 },
    { id: '4', title: 'Morning Yoga', participants: 6, time: '8:00 AM', x: 75, y: 25 },
];

const InteractiveMap = () => {
    return (
        <div className="relative w-full h-96 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl overflow-hidden">
            {/* Map background pattern */}
            <div className="absolute inset-0 opacity-20">
                <svg width="100%" height="100%" viewBox="0 0 400 400">
                    <defs>
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#8A6EFF" strokeWidth="1" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>

            {/* Activity pins */}
            {activities.map((activity, index) => (
                <motion.div
                    key={activity.id}
                    className="absolute group cursor-pointer"
                    style={{ left: `${activity.x}%`, top: `${activity.y}%` }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.2, duration: 0.5 }}
                    whileHover={{ scale: 1.1 }}
                >
                    {/* Pin */}
                    <motion.div
                        className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg"
                        animate={{
                            boxShadow: [
                                '0 0 0 0 rgba(138, 110, 255, 0.7)',
                                '0 0 0 10px rgba(138, 110, 255, 0)',
                                '0 0 0 0 rgba(138, 110, 255, 0)'
                            ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <MapPin className="w-3 h-3 text-white" />
                    </motion.div>

                    {/* Tooltip */}
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-xl p-3 min-w-48 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                        <h4 className="font-semibold text-gray-800 text-sm">{activity.title}</h4>
                        <div className="flex items-center gap-2 mt-1 text-xs text-gray-600">
                            <Users className="w-3 h-3" />
                            <span>{activity.participants} joining</span>
                            <Clock className="w-3 h-3 ml-2" />
                            <span>{activity.time}</span>
                        </div>
                        <div className="mt-2">
                            <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-3 py-1 rounded-full hover:shadow-md transition-shadow">
                                Join Now
                            </button>
                        </div>
                        {/* Arrow */}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
                    </div>
                </motion.div>
            ))}

            {/* Floating elements */}
            <motion.div
                className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-lg p-2 text-xs font-medium text-purple-600"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
            >
                Live Activities Nearby
            </motion.div>
        </div>
    );
};
export default InteractiveMap 
