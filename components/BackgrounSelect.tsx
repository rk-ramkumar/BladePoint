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
                className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            >
                <motion.div
                    initial={{ scale: 0.9, y: 30 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 30 }}
                    transition={{ type: "spring", stiffness: 120 }}
                    className="bg-zinc-900 p-8 rounded-2xl border border-white/20"
                >
                    <h2 className="text-3xl mb-6 text-center font-bold">
                        Choose Your Realm
                    </h2>

                    <div className="flex gap-6 mb-8">
                        {BACKGROUNDS.map(bg => {
                            const selected = bg.id === background.id;

                            return (
                                <motion.div
                                    key={bg.id}
                                    whileHover={{ scale: bg.locked ? 1 : 1.05 }}
                                    onClick={() => !bg.locked && setBackground(bg)}
                                    style={{
                                        width: 220,
                                        height: 130,
                                        backgroundImage: `url(${bg.image})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        borderRadius: 12,
                                        cursor: bg.locked ? "not-allowed" : "pointer",
                                        boxShadow: selected
                                            ? "0 0 30px rgba(100,200,255,0.9)"
                                            : "0 0 12px rgba(0,0,0,0.6)",
                                        filter: bg.locked
                                            ? "grayscale(1) brightness(0.5)"
                                            : "none",
                                        border: selected
                                            ? "3px solid cyan"
                                            : "2px solid rgba(255,255,255,0.2)"
                                    }}
                                >
                                    {bg.locked && (
                                        <div className="w-full h-full flex items-center justify-center text-lg font-bold">
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
                            className="px-6 py-2 rounded-full bg-cyan-500 text-black"
                            onClick={() => onSelect()}
                        >
                            Confirm
                        </motion.button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
