'use client';

import { useEffect, useState } from "react";
import { initSlashImage } from "@/weapons/skins/katanaSkins";
import { SelectedWeapon } from "@/app/page";
import { motion } from "framer-motion"
import { loadGameAssets } from "@/game/GameLoader";

interface LoadingScreenProps {
    onDone: () => void;
    selectedWeapon: SelectedWeapon | null;
}

export default function LoadingScreen({ onDone, selectedWeapon }: LoadingScreenProps) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let cancelled = false;
        if (!selectedWeapon) {
            console.error("No weapon selected!");
            return;
        }

        initSlashImage(selectedWeapon.skin);

        loadGameAssets(p => {
            if (!cancelled) setProgress(p);
        }).then(() => {
            if (!cancelled) onDone();
        });

        return () => {
            cancelled = true;
        };


    }, [onDone, selectedWeapon]);

    return (
        <div className="fixed inset-0 bg-gradient-to-br from-gray-950 via-black to-purple-950/50 flex items-center justify-center">
            <div className="text-center max-w-2xl w-full px-4">
                <div className="relative inline-block mb-8">
                    <div className="text-5xl md:text-7xl font-black bg-gradient-to-r from-purple-300 via-pink-300 to-cyan-300 
                        bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(168,85,247,0.5)]">
                        PREPARING BATTLE
                    </div>
                    <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-48 h-1 
                        bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
                </div>

                {selectedWeapon && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <div className="inline-flex items-center gap-4 p-4 bg-gray-900/50 rounded-2xl border border-purple-500/30">
                            <div className="w-16 h-16 bg-gradient-to-br from-purple-900/30 to-cyan-900/30 
                            rounded-lg flex items-center justify-center border border-purple-500/30">
                                <img
                                    src={selectedWeapon.skin.image}
                                    alt="Weapon"
                                    className="w-12 h-12 object-contain"
                                />
                            </div>
                            <div className="text-left">
                                <div className="text-lg font-bold text-white">
                                    {selectedWeapon.skin.id.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                </div>
                                <div className="text-sm text-gray-300">
                                    Ready for battle
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                <div className="mb-6">
                    <div className="w-full bg-gray-800/50 rounded-full h-3 mb-2 overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 rounded-full"
                            style={{ width: `${progress}%` }}
                            initial={{ width: "0%" }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>
                    <div className="text-2xl font-bold text-white">{progress}%</div>
                </div>

                <div className="text-gray-400">
                    {progress < 30 && "Loading weapon assets..."}
                    {progress >= 30 && progress < 60 && "Initializing combat system..."}
                    {progress >= 60 && progress < 90 && "Preparing enemies..."}
                    {progress >= 90 && "Almost ready..."}
                </div>

                <div className="mt-8">
                    <div className="inline-block w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
                </div>
            </div>
        </div>
    );
}