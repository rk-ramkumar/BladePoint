'use client';
import { useGame } from "@/game/GameState";
import { useState } from "react";
import { motion } from "framer-motion";

export default function RenameModal({ onClose }: { onClose: () => void }) {
    const { playerName, setPlayerName } = useGame();
    const [name, setName] = useState(playerName);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center pointer-events-auto"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-purple-500/30 
                shadow-2xl shadow-purple-500/20 max-w-md w-full mx-4"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-2xl font-bold text-green-300 mb-4">
                    Rename Your Character
                </h2>

                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            setPlayerName(name.trim());
                            onClose();
                        }
                    }}
                    className="w-full px-4 py-3 bg-black/50 border border-blue-500/50 
                    rounded-lg text-white text-lg focus:outline-none focus:ring-2 
                    focus:ring-purple-200 focus:border-transparent"
                    placeholder="Enter your name"
                    autoFocus
                />

                <div className="flex gap-3 mt-6">
                    <button
                        onClick={() => {
                            setPlayerName(name.trim());
                            onClose();
                        }}
                        className="flex-1 px-4 py-3 bg-gradient-to-r from-green-400 to-green-500/80 
                        text-white font-semibold rounded-lg hover:opacity-90 transition"
                    >
                        Save Name
                    </button>
                    <button
                        onClick={onClose}
                        className="px-6 py-3 bg-gray-800 text-gray-300 font-semibold 
                        rounded-lg hover:bg-gray-700 transition"
                    >
                        Cancel
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}