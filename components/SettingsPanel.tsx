'use client';
import { motion } from "framer-motion";
import { audioManager } from "@/sound/AudioManager";
import { useState, useEffect } from "react";
import { Volume2, Music2, Zap, ChevronLeft } from "lucide-react";
import { gameStore } from "@/game/GameStore";

const data = [
    {
        key: 'master' as const,
        icon: <Volume2 className="w-5 h-5 text-purple-400" />,
        label: 'Master Volume',
        desc: 'Controls all audio levels',
        color: 'from-purple-500 to-pink-500'
    },
    {
        key: 'bgm' as const,
        icon: <Music2 className="w-5 h-5 text-blue-400" />,
        label: 'Background Music',
        desc: 'Game soundtrack volume',
        color: 'from-blue-500 to-cyan-500'
    },
    {
        key: 'sfx' as const,
        icon: <Zap className="w-5 h-5 text-amber-400" />,
        label: 'Sound Effects',
        desc: 'Weapons & environment sounds',
        color: 'from-amber-500 to-orange-500'
    }
]

export default function SettingsPanel({ onClose }: { onClose: () => void }) {
    const [volumes, setVolumes] = useState(audioManager.getVolume());

    useEffect(() => {
        const { masterVolume, bgmVolume, sfxVolume } = gameStore.getData();
        setVolumes({
            master: masterVolume,
            bgm: bgmVolume,
            sfx: sfxVolume
        });
    }, []);

    const handleVolumeChange = (type: keyof typeof volumes, value: number) => {
        setVolumes(prev => ({ ...prev, [type]: value }));
        if (type === 'master') audioManager.setMaster(value);
        if (type === 'bgm') audioManager.setBgm(value);
        if (type === 'sfx') audioManager.setSfx(value);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]"
            onClick={onClose}
        >
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                className="relative bg-gray-900 border border-gray-800 rounded-xl w-full max-w-sm mx-4 
                         overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="p-5 border-b border-gray-800">
                    <div className="flex items-center gap-3">
                        <motion.button
                            whileHover={{ x: -2 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={onClose}
                            className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
                        >
                            <ChevronLeft className="w-5 h-5 text-gray-400" />
                        </motion.button>
                        <div>
                            <h2 className="text-xl font-bold text-white">Audio Settings</h2>
                            <p className="text-sm text-gray-400">Customize your sound experience</p>
                        </div>
                    </div>
                </div>

                {/* Controls */}
                <div className="p-5 space-y-6">
                    {data.map(({ key, icon, label, desc, color }) => (
                        <div key={key} className="space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-lg bg-gradient-to-br ${color}/20`}>
                                        {icon}
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-white">{label}</h3>
                                        <p className="text-xs text-gray-500">{desc}</p>
                                    </div>
                                </div>
                                <span className="font-bold text-gray-300">
                                    {Math.round(volumes[key] * 100)}%
                                </span>
                            </div>

                            <div className="relative h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                <motion.div
                                    className={`absolute inset-y-0 left-0 bg-gradient-to-r ${color}`}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${volumes[key] * 100}%` }}
                                    transition={{ type: "spring", stiffness: 200 }}
                                />
                            </div>

                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={volumes[key]}
                                onChange={(e) => handleVolumeChange(key, parseFloat(e.target.value))}
                                className="w-full h-1 bg-transparent [&::-webkit-slider-thumb]:appearance-none 
                                         [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 
                                         [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white 
                                         [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-gray-800 
                                         [&::-webkit-slider-thumb]:shadow-lg cursor-pointer"
                            />
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="p-5 border-t border-gray-800">
                    <div className="flex gap-3">
                        <button
                            onClick={() => {
                                setVolumes({ master: 0.8, bgm: 0.7, sfx: 0.8 });
                                audioManager.setMaster(0.8);
                                audioManager.setBgm(0.7);
                                audioManager.setSfx(0.8);
                            }}
                            className="flex-1 px-4 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 
                                     font-medium rounded-lg transition-colors"
                        >
                            Reset
                        </button>
                        <button
                            onClick={onClose}
                            className="flex-1 px-4 py-3 bg-gradient-to-r from-gray-700 to-gray-800 
                                     hover:from-gray-600 hover:to-gray-700 text-white font-medium 
                                     rounded-lg transition-all shadow-lg"
                        >
                            Done
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}