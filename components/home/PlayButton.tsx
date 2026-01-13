'use client';
import { motion } from "framer-motion";

export default function PlayButton({ onClick }: { onClick: () => void }) {
    return (
        <motion.button
            initial={{ skewX: -10 }}
            whileHover={{ scale: 1.08, skewX: -10 }}
            whileTap={{ scale: 0.95, skewX: -10 }}
            animate={{
                boxShadow: [
                    "0 0 20px rgba(160,100,255,0.4)",
                    "0 0 40px rgba(160,100,255,0.9)",
                    "0 0 20px rgba(160,100,255,0.4)",
                ],

            }}
            transition={{ duration: 2, repeat: Infinity }}
            onClick={onClick}
            className="cursor-pointer px-16 py-4 text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 border-4 border-purple-300/40"
        >
            <div className="flex items-center gap-1.5">
                <div
                    style={{
                        width: 44,
                        height: 44,
                        backgroundColor: "#e9d5ff",
                        WebkitMaskImage: "url(/assets/ui/fist-break.png)",
                        WebkitMaskRepeat: "no-repeat",
                        WebkitMaskPosition: "center",
                        WebkitMaskSize: "contain",
                        maskImage: "url(/assets/ui/fist-break.png)",
                        maskRepeat: "no-repeat",
                        maskPosition: "center",
                        maskSize: "contain",
                        filter: "drop-shadow(0 0 8px rgba(200,140,255,0.8))",
                    }}
                />

                <span
                    style={{
                        display: "inline-block",
                        transform: "skewX(10deg)",
                        letterSpacing: "0.1em",
                    }}
                >
                    PLAY
                </span>
            </div>
        </motion.button>
    );
}
