'use client';
import { useGame } from "@/game/GameState";
import { motion } from "framer-motion";

export default function PlayerNameTag({ onEdit }: { onEdit: () => void }) {
    const { playerName } = useGame();

    return (
        <motion.div
            animate={{
                y: [-8, 8, -8],
                skewY: [12]
            }}
            transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
            }}
            className="relative top-72 left-78 cursor-pointer pointer-events-auto text-purple-300 text-4xl font-semibold 
            hover:text-purple-100 skew-y-12 w-38 border-2 text-wrap overflow-hidden text-ellipsis"
            onClick={onEdit}
        >
            {playerName}
        </motion.div >
    );
}
