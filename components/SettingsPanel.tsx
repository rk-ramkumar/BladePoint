'use client';
import { motion } from "framer-motion";
import { audioManager } from "@/sound/AudioManager";

export default function SettingsPanel({ onClose }: { onClose: () => void }) {
    const { sfxVolume, masterVolume } = audioManager.getVolume()

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
        >
            <motion.div
                initial={{ y: 40 }}
                animate={{ y: 0 }}
                className="bg-zinc-900 p-6 rounded-xl w-80 text-white shadow-2xl"
            >
                <h2 className="text-xl mb-4 font-bold">Settings</h2>

                <label className="block mb-3">
                    Master Volume
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        defaultValue={masterVolume}
                        onChange={e => audioManager.setMaster(+e.target.value)}
                    />
                </label>

                <label className="block mb-4">
                    SFX Volume
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        defaultValue={sfxVolume}
                        onChange={e => audioManager.setSfx(+e.target.value)}
                    />
                </label>

                <button
                    onClick={onClose}
                    className="w-full bg-indigo-600 py-2 rounded"
                >
                    Resume
                </button>
            </motion.div>
        </motion.div>
    );
}
