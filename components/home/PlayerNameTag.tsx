'use client';
import { useGame } from "@/game/GameState";
import { motion } from "framer-motion";

export default function PlayerNameTag({ onEdit }: { onEdit: () => void }) {
    const { playerName } = useGame();

    return (
        <motion.div
            animate={{
                y: [-10, 10, -10],
                skewY: [12],
                opacity: [0.7, 1, 0.7],
                filter: ["brightness(1)", "brightness(2)", "brightness(1)"]
            }}
            transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
            }}
            className="cursor-pointer pointer-events-auto text-red-300 text-3xl md:text-4xl font-semibold 
            hover:text-red-100 skew-y-12 px-4 py-2
            text-wrap overflow-hidden text-ellipsis min-w-35 max-w-40 rounded-lg"
            onClick={onEdit}
            suppressHydrationWarning
        >
            {playerName}
        </motion.div >
    );
}
