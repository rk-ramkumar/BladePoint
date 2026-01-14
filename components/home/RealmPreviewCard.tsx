'use client';

import { motion } from "framer-motion";
import { useGame } from "@/game/GameState";
import { Sparkles } from "lucide-react";

export default function RealmPreviewCard({ onClick }: { onClick: () => void }) {
    const { background } = useGame();

    return (
        <motion.div
            whileHover={{ scale: 1.03, y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className="relative cursor-pointer group w-full max-w-md"
        >
            <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 
                         rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"
            />

            <div
                className="relative overflow-hidden rounded-xl border-2 border-purple-500/30 
                         bg-gradient-to-b from-gray-900/80 to-black/80
                         shadow-2xl shadow-purple-900/20"
                style={{
                    height: "180px",
                    backgroundImage: `url(${background.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 to-cyan-500" />

                <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-bold text-white">{background.name}</h3>
                            <p className="text-sm text-purple-200/70">Current realm</p>
                        </div>
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                            className="p-2 rounded-full bg-gradient-to-br from-purple-900/50 to-cyan-900/50 
                                     border border-purple-500/30"
                        >
                            <Sparkles className="w-5 h-5 text-purple-300" />
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0.5, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                        className="mt-3 text-xs text-cyan-300 font-medium flex items-center gap-2"
                    >
                        <span>Click to choose different realm</span>
                        <span className="text-lg">→</span>
                    </motion.div>
                </div>

                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>
        </motion.div>
    );
}