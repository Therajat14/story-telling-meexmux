import { forwardRef, useRef } from "react";
import { Sparkles, MapPin } from "lucide-react";
import { motion, useInView } from "framer-motion";

interface DiscoveryChapterProps {
}

const DiscoveryChapter = () => {
    const sparkRef = useRef(null);
    const sectionRef = useRef<HTMLElement>(null);
    const cardRef = useRef(null);
    const isInView = useInView(sparkRef, { once: false, amount: 0.3 });
    const cardInView = useInView(cardRef, { once: false, amount: 0.3 });

    return (
        <section
            ref={sectionRef}
            className="chapter relative min-h-screen flex items-center justify-center overflow-hidden transition-all duration-1000"
        >
            <div
                className="absolute inset-0 bg-gradient-to-br from-rose-100 via-purple-100 to-amber-100 transition-all duration-1000"
            ></div>

            {/* Animated Connection Lines SVG */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.3 }}>
                <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#f43f5e" />
                        <stop offset="50%" stopColor="#f59e0b" />
                        <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                </defs>

                {/* Animated connecting lines */}
                {[
                    { x1: "10%", y1: "20%", x2: "50%", y2: "50%", delay: 0 },
                    { x1: "90%", y1: "30%", x2: "50%", y2: "50%", delay: 0.5 },
                    { x1: "20%", y1: "80%", x2: "50%", y2: "50%", delay: 1 },
                    { x1: "80%", y1: "70%", x2: "50%", y2: "50%", delay: 1.5 },
                ].map((line, i) => (
                    <motion.line
                        key={i}
                        x1={line.x1}
                        y1={line.y1}
                        x2={line.x2}
                        y2={line.y2}
                        stroke="url(#lineGradient)"
                        strokeWidth="2"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={isInView ? { pathLength: 1, opacity: 0.6 } : { pathLength: 0, opacity: 0 }}
                        transition={{ duration: 1.5, delay: line.delay, ease: "easeInOut" }}
                    />
                ))}

                {/* Floating location pins */}
                {[
                    { cx: "15%", cy: "25%", delay: 0 },
                    { cx: "85%", cy: "35%", delay: 0.3 },
                    { cx: "25%", cy: "75%", delay: 0.6 },
                    { cx: "75%", cy: "65%", delay: 0.9 },
                ].map((pin, i) => (
                    <motion.g key={i}>
                        <motion.circle
                            cx={pin.cx}
                            cy={pin.cy}
                            r="20"
                            fill="url(#lineGradient)"
                            opacity="0.2"
                            animate={{
                                scale: [1, 1.3, 1],
                                opacity: [0.2, 0.4, 0.2],
                            }}
                            transition={{
                                duration: 2,
                                delay: pin.delay,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />
                        <motion.circle
                            cx={pin.cx}
                            cy={pin.cy}
                            r="8"
                            fill="#fff"
                            animate={{
                                y: [-5, 5, -5],
                            }}
                            transition={{
                                duration: 2,
                                delay: pin.delay,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />
                    </motion.g>
                ))}
            </svg>

            {/* Orbiting interests SVG */}
            <motion.svg
                className="absolute top-1/2 left-1/2 w-96 h-96 pointer-events-none"
                style={{ x: "-50%", y: "-50%", opacity: 0.15 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            >
                {[0, 120, 240].map((angle, i) => {
                    const rad = (angle * Math.PI) / 180;
                    const x = 150 + Math.cos(rad) * 100;
                    const y = 150 + Math.sin(rad) * 100;
                    return (
                        <motion.circle
                            key={i}
                            cx={x}
                            cy={y}
                            r="15"
                            fill={["#f43f5e", "#f59e0b", "#a855f7"][i]}
                            animate={{
                                scale: [1, 1.2, 1],
                            }}
                            transition={{
                                duration: 2,
                                delay: i * 0.3,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />
                    );
                })}
            </motion.svg>

            {/* Sparkle particles */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.4 }}>
                {Array.from({ length: 12 }).map((_, i) => {
                    const x = `${10 + (i * 8) % 80}%`;
                    const y = `${15 + (i * 13) % 70}%`;
                    return (
                        <motion.path
                            key={i}
                            d="M12,2 L14,10 L22,12 L14,14 L12,22 L10,14 L2,12 L10,10 Z"
                            fill="#fbbf24"
                            transform={`translate(${x}, ${y})`}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{
                                scale: [0, 1, 0],
                                opacity: [0, 1, 0],
                                rotate: [0, 180, 360],
                            }}
                            transition={{
                                duration: 3,
                                delay: i * 0.2,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />
                    );
                })}
            </svg>

            <div className="relative z-10 text-center px-6 max-w-5xl">
                <div className="mb-12">
                    <motion.div
                        ref={sparkRef}
                        initial={{ rotate: 0, opacity: 0, scale: 0.5 }}
                        animate={isInView ? { rotate: 360, opacity: 1, scale: 1 } : { rotate: 0, opacity: 0, scale: 0.5 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            <Sparkles className="w-16 h-16 mx-auto mb-6 text-yellow-300" />
                        </motion.div>
                    </motion.div>
                    <motion.div
                        className="absolute -left-1/3 bottom-0 -rotate-90 origin-left"
                        initial={{ x: -100, opacity: 0 }}
                        animate={isInView ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <h2 className="text-5xl md:text-6xl font-extrabold tracking-wider" style={{ fontFamily: "'Playfair Display', serif" }}>
                            The Discovery
                        </h2>
                    </motion.div>
                </div>

                {/* Activity Card */}
                <motion.div
                    ref={cardRef}
                    initial={{ y: 50, opacity: 0 }}
                    animate={cardInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition-all duration-500"
                >
                    {/* User Info */}
                    <motion.div
                        className="flex items-center justify-between mb-6"
                        initial={{ x: -50, opacity: 0 }}
                        animate={cardInView ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                    >
                        <div className="flex items-center gap-3">
                            <motion.div
                                className="w-12 h-12 bg-gradient-to-br from-rose-500 to-amber-500 rounded-full flex items-center justify-center"
                                animate={{
                                    boxShadow: [
                                        "0 0 0 0 rgba(244, 63, 94, 0.4)", // rose-500 with opacity
                                        "0 0 0 10px rgba(244, 63, 94, 0)",
                                        "0 0 0 0 rgba(244, 63, 94, 0)",
                                    ],
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <span className="text-2xl">✓</span>
                            </motion.div>
                            <div className="text-left">
                                <p className="font-bold">Alex Chen</p>
                                <p
                                    className="text-sm text-gray-600"
                                >
                                    Verified · 3 interests
                                </p>
                            </div>
                        </div>
                        <motion.div
                            animate={{ y: [-3, 3, -3] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <MapPin className="w-6 h-6 text-rose-400" />
                        </motion.div>
                    </motion.div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {["🏔️ Hiking", "🎬 Indie Films", "🎲 Board Games"].map((tag, i) => (
                            <motion.span
                                key={i}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={cardInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                                transition={{ duration: 0.4, delay: 0.9 + i * 0.2 }}
                                whileHover={{ scale: 1.1, y: -5 }}
                                className="px-4 py-2 bg-rose-500 text-white rounded-full text-sm font-medium shadow-lg cursor-pointer"
                            >
                                {tag}
                            </motion.span>
                        ))}
                    </div>

                    {/* Activity Block */}
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={cardInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
                        transition={{ duration: 0.6, delay: 1.5 }}
                        className="bg-gradient-to-r from-amber-500 to-rose-500 rounded-2xl p-6 text-white relative overflow-hidden"
                    >
                        <motion.div
                            className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"
                            animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.1, 0.3, 0.1],
                            }}
                            transition={{ duration: 3, repeat: Infinity }}
                        />
                        <p className="font-bold mb-2">🏔️ Weekend Mountain Trail</p>
                        <p className="text-sm mb-4 opacity-90">
                            Saturday 9 AM · 2.3 miles away
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full bg-white text-rose-600 font-bold py-3 rounded-xl shadow-lg"
                        >
                            Join Live Activity
                        </motion.button>
                        <div className="absolute bottom-2 right-2">
                            <div className="flex -space-x-2">
                                {[1, 2, 3].map((i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ scale: 0 }}
                                        animate={cardInView ? { scale: 1 } : { scale: 0 }}
                                        transition={{ duration: 0.3, delay: 1.7 + i * 0.1 }}
                                        className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-rose-400 border-2 border-white"
                                    ></motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={cardInView ? { opacity: 0.8, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.8, delay: 2 }}
                    className="text-xl mt-8 italic text-gray-600"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                >
                    &quot;Real people. Real interests. Real locations.&quot;
                </motion.p>
            </div>
        </section>
    );
}

export default DiscoveryChapter
