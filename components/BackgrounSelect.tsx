'use client';

import { BACKGROUNDS } from "@/game/backgrounds";
import { useGame } from "@/game/GameState";
import { motion, AnimatePresence } from "framer-motion";

export default function BackgrounSelect({ onSelect }: { onSelect: () => void }) {
    const { background, setBackground } = useGame();

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-4"
            >
                <motion.div
                    initial={{ scale: 0.95, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.95, y: 20 }}
                    transition={{ type: "spring", stiffness: 120 }}
                    className="w-full max-w-4xl bg-zinc-900 rounded-2xl border border-white/20 p-4 sm:p-6 md:p-8"
                >
                    <h2 className="text-xl sm:text-2xl md:text-3xl mb-4 sm:mb-6 text-center font-bold">
                        Choose Your Realm
                    </h2>

                    <div
                        className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 mb-6 max-h-[60vh] overflow-y-auto overflow-x-hidden p-3"
                    >
                        {BACKGROUNDS.map(bg => {
                            const selected = bg.id === background.id;

                            return (
                                <motion.div
                                    key={bg.id}
                                    whileHover={!bg.locked ? { scale: 1.03 } : undefined}
                                    onClick={() => !bg.locked && setBackground(bg)}
                                    className={
                                        `relative aspect-video rounded-xl overflow-hidden cursor-pointer border 
                                        ${selected ? "border-cyan-400" : "border-white/20"} ${bg.locked ? "opacity-50 grayscale" : ""} `
                                    }
                                    style={{
                                        backgroundImage: `url(${bg.image})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                    }}
                                >
                                    {/* overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                                    <div className="absolute bottom-2 left-3 text-sm sm:text-base font-semibold text-cyan-300">
                                        {bg.name}
                                    </div>

                                    {bg.locked && (
                                        <div className="absolute inset-0 flex items-center justify-center text-lg font-bold">
                                            🔒 Locked
                                        </div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>

                    <div className="flex justify-center">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-2 rounded-md bg-cyan-500 text-black font-semibold"
                            onClick={onSelect}
                        >
                            Confirm
                        </motion.button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
