'use client';
import { motion } from "framer-motion";

export default function PlayButton({ onClick }: { onClick: () => void }) {
    return (
        <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            whileHover={{
                scale: 1.1,
                rotateZ: -1,
                boxShadow: "0 0 60px rgba(160, 100, 255, 0.8), 0 0 100px rgba(255, 100, 255, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
            animate={{
                scale: 1,
                opacity: 1,
                boxShadow: [
                    "0 0 30px rgba(160, 100, 255, 0.6)",
                    "0 0 60px rgba(160, 100, 255, 0.9)",
                    "0 0 100px rgba(255, 100, 255, 0.5)",
                    "0 0 30px rgba(160, 100, 255, 0.6)",
                ],
                y: [0, -3, 0],
            }}
            transition={{
                boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
            onClick={onClick}
            className="relative group cursor-pointer px-20 py-6 text-3xl font-black 
                     bg-gradient-to-br from-purple-600 via-purple-700 to-pink-700
                     rounded-2xl border-2 border-purple-300/50
                     shadow-2xl shadow-purple-900/50
                     overflow-hidden"
        >
            {/* Animated shine effect */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Inner glow */}
            <div className="absolute inset-4 rounded-xl bg-gradient-to-b from-white/10 to-transparent 
                          border border-white/20" />

            <div className="relative flex items-center justify-center gap-4">
                {/* Animated fist icon */}
                <motion.div
                    animate={{
                        rotate: [0, 5, -5, 0],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="relative"
                    style={{
                        width: 56,
                        height: 56,
                        backgroundColor: "#f5f3ff",
                        WebkitMaskImage: "url(/assets/ui/fist-break.png)",
                        WebkitMaskRepeat: "no-repeat",
                        WebkitMaskPosition: "center",
                        WebkitMaskSize: "contain",
                        maskImage: "url(/assets/ui/fist-break.png)",
                        maskRepeat: "no-repeat",
                        maskPosition: "center",
                        maskSize: "contain",
                        filter: "drop-shadow(0 0 12px rgba(200, 140, 255, 1))",
                    }}
                />

                <motion.span
                    className="bg-gradient-to-r from-white via-purple-100 to-pink-100 
                             bg-clip-text text-transparent tracking-widest uppercase"
                    animate={{
                        textShadow: [
                            "0 0 0px #ffffff",
                            "0 0 10px #ffffff",
                            "0 0 20px rgba(255, 255, 255, 0.8)",
                            "0 0 0px #ffffff",
                        ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    PLAY NOW
                </motion.span>
            </div>

            {/* Particle effects on hover */}
            <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 pointer-events-none"
            >
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full"
                        initial={{
                            x: "50%",
                            y: "50%",
                            scale: 0
                        }}
                        whileHover={{
                            x: `${Math.random() * 100}%`,
                            y: `${Math.random() * 100}%`,
                            scale: [0, 1, 0],
                            opacity: [0, 1, 0],
                        }}
                        transition={{
                            duration: 0.8,
                            delay: i * 0.1,
                            repeat: Infinity,
                            repeatDelay: 1
                        }}
                    />
                ))}
            </motion.div>
        </motion.button>
    );
}