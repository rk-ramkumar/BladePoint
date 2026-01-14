'use client';

import { motion } from "framer-motion";
import PlayerNameTag from "./PlayerNameTag";

export default function HomeSpecter({ setOnEdit }: { setOnEdit: (val: boolean) => void }) {
    return (
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
            <motion.div
                animate={{
                    opacity: [0.1, 0.2, 0.1],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute inset-0"
                style={{
                    background: `
                        radial-gradient(circle at 20% 50%, rgba(120, 80, 255, 0.3) 0%, transparent 40%),
                        radial-gradient(circle at 80% 80%, rgba(100, 200, 255, 0.2) 0%, transparent 40%),
                        radial-gradient(circle at 50% 20%, rgba(0, 0, 0, 0.9) 0%, transparent 60%)
                    `,
                }}
            />

            {/* Specter container - properly centered */}
            <div className="absolute left-[20%] top-1/2 -translate-x-1/2 -translate-y-1/2 
                          w-[520px] h-[720px]">
                <motion.div
                    animate={{
                        y: [-10, 10, -10],
                        opacity: [0.7, 0.9, 0.7],
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute inset-0"
                    style={{
                        backgroundColor: "#a855f7",
                        WebkitMaskImage: "url(/assets/ui/black-cloak-specter.png)",
                        WebkitMaskRepeat: "no-repeat",
                        WebkitMaskPosition: "center",
                        WebkitMaskSize: "contain",
                        maskImage: "url(/assets/ui/black-cloak-specter.png)",
                        maskRepeat: "no-repeat",
                        maskPosition: "center",
                        maskSize: "contain",
                        filter: `
                            drop-shadow(0 0 30px rgba(168, 85, 247, 0.5))
                            drop-shadow(0 0 60px rgba(168, 85, 247, 0.3))
                        `,
                    }}
                />

                {/* Player name positioned at specter's chest */}
                <div className="absolute top-[45%] left-[50%] -translate-x-1/2 -translate-y-1/2 
                              pointer-events-auto">
                    <PlayerNameTag onEdit={() => setOnEdit(true)} />
                </div>
            </div>

            {/* Vignette effect */}
            <div className="absolute inset-0"
                style={{
                    background: `
                        radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.9) 80%),
                        linear-gradient(to bottom, transparent 70%, rgba(0,0,0,0.95))
                    `,
                }}
            />
        </div>
    );
}