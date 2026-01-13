'use client';

import { motion } from "framer-motion";

export default function HomeSpecter() {
    return (
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
            <motion.div
                animate={{
                    opacity: [0.15, 0.25, 0.15],
                    scale: [0.95, 1.05, 0.95],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute inset-0"
                style={{
                    background:
                        "radial-gradient(circle at 60% 50%, rgba(180,120,255,0.25), transparent 60%)",
                }}
            />

            <motion.div
                animate={{
                    y: [-8, 8, -8],
                    opacity: [0.85, 1, 0.85],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute left-[8%] top-1/2 -translate-y-1/2"
                style={{
                    width: 520,
                    height: 720,
                    backgroundColor: "#d8b4fe",
                    WebkitMaskImage: "url(/assets/ui/black-cloak-specter.png)",
                    WebkitMaskRepeat: "no-repeat",
                    WebkitMaskPosition: "center",
                    WebkitMaskSize: "contain",
                    maskImage: "url(/assets/ui/man-in-a-black-cloak.png)",
                    maskRepeat: "no-repeat",
                    maskPosition: "center",
                    maskSize: "contain",
                    filter: `
            drop-shadow(0 0 12px rgba(190,140,255,0.6))
            drop-shadow(0 0 32px rgba(120,60,255,0.35))
          `,
                }}
            />

            <div
                className="absolute inset-0"
                style={{
                    background:
                        "radial-gradient(circle, transparent 40%, rgba(0,0,0,0.85) 80%)",
                }}
            />
        </div>
    );
}
