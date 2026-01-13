'use client';

import { motion } from "framer-motion";
import { useGame } from "@/game/GameState";

export default function RealmPreviewCard({ onClick }: { onClick: () => void }) {
    const { background } = useGame();

    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={onClick}
            className="cursor-pointer"
            style={{
                width: 320,
                height: 160,
                backgroundImage: `url(${background.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: 12,
                overflow: "hidden",
                boxShadow: "0 0 40px rgba(100,200,255,0.4)",
                border: "2px solid rgba(255,255,255, 0.5)",
                position: "relative"
            }}
        >
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)"
                }}
            />

            <div className="absolute bottom-3 left-4 text-xl font-bold text-cyan-300">
                {background.name}
            </div>
        </motion.div>
    );
}
