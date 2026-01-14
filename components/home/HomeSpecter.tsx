'use client';

import { motion } from "framer-motion";
import PlayerNameTag from "./PlayerNameTag";

export default function HomeSpecter({ setOnEdit }: { setOnEdit: (val: boolean) => void }) {

    return (
        <div className="pointer-events-none fixed inset-0  overflow-hidden">
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
            <div className="absolute  top-1/2 -translate-y-1/2 w-520 h-720">
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
                    className="absolute left-[8%] top-1/2 -translate-y-1/2 "
                    style={{
                        width: 520,
                        height: 720,
                        backgroundColor: "red",
                        WebkitMaskImage: "url(/assets/ui/black-cloak-specter.png)",
                        WebkitMaskRepeat: "no-repeat",
                        WebkitMaskPosition: "center",
                        WebkitMaskSize: "contain",
                        maskImage: "url(/assets/ui/black-cloak-specter.png)",
                        maskRepeat: "no-repeat",
                        maskPosition: "center",
                        maskSize: "contain",
                        filter: ` drop-shadow(0 0 32px rgba(120,60,255,0.05)) `,
                    }}
                />
                <div className="absolute inset-0 flex items-center justify-center -translate-x-150 -translate-y-10">
                    <div className="pointer-events-auto">
                        <PlayerNameTag onEdit={() => setOnEdit(true)} />
                    </div>
                </div>
            </div>
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
