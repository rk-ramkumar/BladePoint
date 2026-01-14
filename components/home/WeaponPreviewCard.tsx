'use client';

import { motion } from "framer-motion";
import { SelectedWeapon } from "@/app/page";

interface WeaponPreviewCardProps {
    selectedWeapon: SelectedWeapon | null;
    onClick: () => void;
}

export default function WeaponPreviewCard({ selectedWeapon, onClick }: WeaponPreviewCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="relative group cursor-pointer"
            onClick={onClick}
        >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-cyan-600 
                    rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500" />

            <div className="relative bg-gradient-to-br from-gray-900/90 to-black/90 
                    rounded-2xl p-6 border border-purple-500/30 overflow-hidden
                    group-hover:border-purple-500/50 transition-all duration-300">

                <div className="relative z-10 flex items-center justify-between">
                    <div className="flex-1">
                        {selectedWeapon ? (
                            <div className="mt-4 space-y-2">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-gradient-to-br from-purple-900/30 to-cyan-900/30 
                                rounded-lg flex items-center justify-center border border-purple-500/30">
                                        <img
                                            src={selectedWeapon.skin.image}
                                            alt="Selected Weapon"
                                            className="w-8 h-8 object-contain"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-lg font-semibold text-white truncate">
                                            {selectedWeapon.skin.id.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                        </div>
                                        <div className="text-sm text-gray-400">
                                            Equipped • Tap to change
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="mt-4">
                                <div className="text-gray-400 italic">No weapon selected</div>
                            </div>
                        )}
                    </div>

                    <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-purple-400 ml-4"
                    >
                        <div className="p-2 rounded-full bg-gradient-to-r from-purple-500/10 to-cyan-500/10">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </motion.div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 
                      transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </div>

            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 opacity-0 
                    group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="bg-gray-900 text-white text-sm px-3 py-1.5 rounded-lg whitespace-nowrap 
                      border border-purple-500/30 shadow-lg">
                    Choose your weapon
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 
                        border-4 border-transparent border-t-gray-900" />
                </div>
            </div>
        </motion.div>
    );
}