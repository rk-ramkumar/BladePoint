'use client';

import { loadGameAssets } from "@/game/GameLoader";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function LoadingScreen({ onDone }: { onDone: () => void }) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let cancelled = false;

        loadGameAssets(p => {
            if (!cancelled) setProgress(p);
        }).then(() => {
            if (!cancelled) onDone();
        });

        return () => {
            cancelled = true;
        };
    }, [onDone]);

    return (
        <div className="fixed inset-0 bg-black flex flex-col items-center justify-center text-white">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-3xl mb-6"
            >
                Awakening the Relic…
            </motion.div>

            <div className="w-80 h-3 bg-white/20 rounded overflow-hidden">
                <motion.div
                    className="h-full bg-cyan-400"
                    animate={{ width: `${progress * 100}%` }}
                />
            </div>

            <div className="mt-4 text-sm">
                {Math.floor(progress * 100)}%
            </div>
        </div>
    );
}
