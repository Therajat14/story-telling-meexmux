"use client";

import { motion } from "framer-motion";
import { Camera, MapPin, Users, Calendar } from "lucide-react";

interface AppMockupProps {
    screen?: "signup" | "verification" | "interests" | "activities" | "event";
    className?: string;
}

export const AppMockup = ({
    screen = "signup",
    className = "",
}: AppMockupProps) => {
    const renderScreen = () => {
        switch (screen) {
            case "signup":
                return (
                    <div className="p-6 h-full flex flex-col">
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                                <span className="text-white font-bold text-xl">M</span>
                            </div>
                            <h2
                                className="text-xl font-bold text-gray-800"
                            >
                                Welcome to MeetMux
                            </h2>
                            <p
                                className="text-sm text-gray-600"
                            >
                                Find people who actually want to do stuff
                            </p>
                        </div>

                        <div className="space-y-4 flex-1">
                            <div
                                className="border-2 border-dashed rounded-xl p-6 text-center border-purple-300 bg-purple-50/50"
                            >
                                <Camera
                                    className="w-8 h-8 mx-auto mb-2 text-purple-500"
                                />
                                <p
                                    className="text-sm text-gray-600"
                                >
                                    Take a selfie to verify
                                </p>
                                <button className="mt-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg text-sm">
                                    Verify with Selfie
                                </button>
                            </div>

                            <input
                                type="text"
                                placeholder="Your name"
                                className="w-full p-3 rounded-lg border border-gray-300 text-gray-800"
                            />
                            <input
                                type="email"
                                placeholder="Email address"
                                className="w-full p-3 rounded-lg border border-gray-300 text-gray-800"
                            />
                        </div>

                        <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-semibold mt-6">
                            Get Started
                        </button>
                    </div>
                );

            case "interests":
                return (
                    <div className="p-6 h-full">
                        <h2
                            className="text-xl font-bold mb-2 text-gray-800"
                        >
                            Pick your interests
                        </h2>
                        <p
                            className="text-sm mb-6 text-gray-600"
                        >
                            What do you actually want to do?
                        </p>

                        <div className="grid grid-cols-2 gap-3">
                            {[
                                "Hiking",
                                "Indie Films",
                                "Board Games",
                                "Coffee",
                                "Yoga",
                                "Photography",
                            ].map((interest) => (
                                <motion.button
                                    key={interest}
                                    className="p-3 border-2 rounded-lg text-sm font-medium transition border-purple-200 hover:border-purple-500 hover:bg-purple-50"
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {interest}
                                </motion.button>
                            ))}
                        </div>
                    </div>
                );

            case "activities":
                return (
                    <div className="p-6 h-full">
                        <div className="flex items-center justify-between mb-4">
                            <h2
                                className="text-lg font-bold text-gray-800"
                            >
                                Live Activities
                            </h2>
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        </div>

                        <div className="space-y-3">
                            <div
                                className="p-4 rounded-xl border bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200"
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <MapPin className="w-4 h-4 text-purple-500" />
                                    <span className="font-semibold text-sm">Hiking at Sunset Peak</span>
                                </div>
                                <div
                                    className="flex items-center gap-4 text-xs text-gray-600"
                                >
                                    <div className="flex items-center gap-1">
                                        <Users className="w-3 h-3" />
                                        <span>3 joining now</span>
                                    </div>
                                    <span>6:00 PM</span>
                                </div>
                                <button className="mt-3 w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-lg text-sm font-medium">
                                    Join Live Activity
                                </button>
                            </div>

                            <div
                                className="p-4 rounded-xl bg-gray-50"
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <Calendar className="w-4 h-4 text-gray-500" />
                                    <span className="font-semibold text-sm">Board Game Night</span>
                                </div>
                                <div
                                    className="text-xs text-gray-600"
                                >
                                    Tomorrow, 7:00 PM • 5 spots left
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case "event":
                return (
                    <div className="p-6 h-full">
                        <h2
                            className="text-lg font-bold mb-4 text-gray-800"
                        >
                            Create Event
                        </h2>

                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Indie Film Night + Pizza"
                                className="w-full p-3 border rounded-lg text-sm border-gray-300"
                                defaultValue="Indie Film Night + Pizza"
                            />

                            <div
                                className="p-3 rounded-lg bg-purple-50"
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <MapPin className="w-4 h-4 text-purple-500" />
                                    <span className="text-sm font-medium">Suggested Venues</span>
                                </div>
                                <div
                                    className="text-xs text-gray-600"
                                >
                                    Cozy Corner Café • 0.3 miles
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <input
                                    type="date"
                                    className="flex-1 p-2 border rounded-lg text-sm border-gray-300"
                                />
                                <input
                                    type="time"
                                    className="flex-1 p-2 border rounded-lg text-sm border-gray-300"
                                />
                            </div>

                            <div
                                className="border rounded-lg p-3 bg-green-50 border-green-200"
                            >
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span
                                        className="text-sm font-medium text-green-800"
                                    >
                                        Your Event is Live!
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <motion.div
            className={`phone-mockup ${className}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <div
                className="phone-screen rounded-[2rem] overflow-hidden shadow-2xl border-4 border-gray-200 bg-white"
            >
                {renderScreen()}
            </div>
        </motion.div>
    );
};

export default AppMockup;