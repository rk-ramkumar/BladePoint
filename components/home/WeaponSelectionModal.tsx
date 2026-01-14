'use client';

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Lock } from "lucide-react";
import { SelectedWeapon } from "@/app/page";
import { WEAPONS_CONFIG } from "@/weapons/WeaponConfig";
import { toast, ToastContainer } from "react-toastify";

interface WeaponSelectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (selection: SelectedWeapon) => void;
    currentSelection: SelectedWeapon | null;
}


const getRarityColor = (rarity: string) => {
    switch (rarity.toLowerCase()) {
        case 'common': return 'text-gray-300 border-gray-500 bg-gray-500/20';
        case 'rare': return 'text-blue-300 border-blue-500 bg-blue-500/20';
        case 'epic': return 'text-purple-300 border-purple-500 bg-purple-500/20';
        case 'legendary': return 'text-yellow-300 border-yellow-500 bg-yellow-500/20';
        default: return 'text-gray-300 border-gray-500 bg-gray-500/20';
    }
};

export default function WeaponSelectionModal({
    isOpen,
    onClose,
    onSelect,
    currentSelection
}: WeaponSelectionModalProps) {
    const [selectedWeaponId, setSelectedWeaponId] = useState("katana");
    const [selectedSkinId, setSelectedSkinId] = useState("katana_bloody");

    useEffect(() => {
        if (currentSelection) {
            setSelectedWeaponId(currentSelection.weaponId || "katana");
            setSelectedSkinId(currentSelection.skinId || "katana_bloody");
        } else {
            const firstWeapon = WEAPONS_CONFIG.find(w => w.unlocked);
            if (firstWeapon) {
                setSelectedWeaponId(firstWeapon.id);
                const firstSkin = firstWeapon.skins.find(s => s.unlocked);
                if (firstSkin) {
                    setSelectedSkinId(firstSkin.id);
                }
            }
        }
    }, [currentSelection, isOpen]);

    const selectedWeapon = WEAPONS_CONFIG.find(w => w.id === selectedWeaponId);
    const selectedSkin = selectedWeapon?.skins.find(s => s.id === selectedSkinId);

    const handleConfirm = () => {
        if (selectedWeapon && selectedSkin && selectedWeapon.unlocked && selectedSkin.unlocked) {
            onSelect({
                weaponType: selectedWeapon.weaponClass,
                skin: selectedSkin.skin,
                weaponId: selectedWeapon.id,
                skinId: selectedSkin.id,
            });
            toast(`${selectedWeapon.name} (${selectedSkin.name}) Equipped`)
        }
    };

    const handleSkinChange = (direction: 'prev' | 'next') => {
        if (!selectedWeapon) return;

        const unlockedSkins = selectedWeapon.skins.filter(s => s.unlocked);
        if (unlockedSkins.length === 0) return;

        const currentIndex = unlockedSkins.findIndex(s => s.id === selectedSkinId);
        let newIndex;

        if (direction === 'next') {
            newIndex = (currentIndex + 1) % unlockedSkins.length;
        } else {
            newIndex = (currentIndex - 1 + unlockedSkins.length) % unlockedSkins.length;
        }

        setSelectedSkinId(unlockedSkins[newIndex].id);
    };

    const unlockedWeapons = WEAPONS_CONFIG.filter(w => w.unlocked);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    onClick={(e) => e.target === e.currentTarget && onClose()}
                >
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ scale: 0.9, y: 20, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.9, y: 20, opacity: 0 }}
                        transition={{ type: "spring", damping: 25 }}
                        className="relative w-full max-w-4xl max-h-[90vh] bg-gradient-to-br from-gray-900/95 to-black/95 
                      border border-purple-500/30 rounded-2xl shadow-2xl overflow-hidden z-10
                      flex flex-col"
                    >
                        <div className="p-6 border-b border-purple-500/20 bg-gradient-to-r from-purple-900/20 to-transparent shrink-0">
                            <div className="flex items-center justify-between">
                                <div className="flex-1 min-w-0">
                                    <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-300 to-cyan-300 
                               bg-clip-text text-transparent truncate">
                                        ARMORY
                                    </h2>
                                    <p className="text-gray-400 mt-1 text-sm md:text-base truncate">
                                        {unlockedWeapons.length} weapon{unlockedWeapons.length !== 1 ? 's' : ''} available
                                    </p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="ml-4 p-2 hover:bg-purple-500/20 rounded-xl transition-colors shrink-0"
                                    aria-label="Close"
                                >
                                    <X className="w-5 h-5 md:w-6 md:h-6 text-gray-400 hover:text-white" />
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 md:p-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                                <div className="space-y-4 md:space-y-6">
                                    <div>
                                        <h3 className="text-lg md:text-xl font-semibold text-white mb-3 md:mb-4">Weapon Preview</h3>
                                        <div className="relative bg-gradient-to-b from-gray-800/50 to-gray-900/50 
                                  rounded-xl p-4 md:p-8 border border-purple-500/20 min-h-[300px] md:min-h-[400px]">
                                            {selectedSkin && selectedWeapon ? (
                                                <>
                                                    {/* Lock overlay if not unlocked */}
                                                    {(!selectedWeapon.unlocked || !selectedSkin.unlocked) && (
                                                        <div className="absolute inset-0 bg-black/80 z-20 rounded-xl flex flex-col items-center justify-center gap-4">
                                                            <Lock className="w-16 h-16 text-gray-400" />
                                                            <div className="text-center">
                                                                <div className="text-xl font-bold text-white mb-2">
                                                                    {!selectedWeapon.unlocked ? "Weapon Locked" : "Skin Locked"}
                                                                </div>
                                                                <p className="text-gray-300 max-w-sm">
                                                                    {!selectedWeapon.unlocked
                                                                        ? "Complete level 5 to unlock this weapon"
                                                                        : "Reach 1000 souls to unlock this skin"}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    )}

                                                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10" />

                                                    {/* Weapon Image */}
                                                    <div className="relative z-10 flex flex-col items-center justify-center h-full">
                                                        <div className="w-48 h-48 md:w-64 md:h-64 flex items-center justify-center mb-4 md:mb-6">
                                                            <img
                                                                src={selectedSkin.skin.image}
                                                                alt={selectedSkin.name}
                                                                className={`max-w-full max-h-full object-contain drop-shadow-[0_0_30px_rgba(168,85,247,0.5)] ${!selectedWeapon.unlocked || !selectedSkin.unlocked ? "grayscale" : ""
                                                                    }`}
                                                            />
                                                        </div>

                                                        <div className="text-center">
                                                            <h4 className="text-xl md:text-2xl font-bold text-white mb-2">
                                                                {selectedWeapon.name}
                                                                {!selectedWeapon.unlocked && (
                                                                    <span className="ml-2 text-sm text-gray-400">(Locked)</span>
                                                                )}
                                                            </h4>
                                                            <div className={`inline-flex flex-wrap items-center gap-2 px-3 py-1 rounded-full border 
                                            ${getRarityColor(selectedSkin.rarity)} bg-black/40 text-sm`}>
                                                                <span className="font-medium">{selectedSkin.rarity}</span>
                                                                <div className="w-1 h-1 rounded-full bg-current opacity-60" />
                                                                <span>{selectedSkin.name}</span>
                                                                {!selectedSkin.unlocked && (
                                                                    <Lock className="w-3 h-3 ml-1" />
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="flex items-center justify-center h-full">
                                                    <div className="text-gray-400">No weapon selected</div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Weapon Stats */}
                                    {selectedWeapon && (
                                        <div className="bg-gray-800/30 rounded-xl p-3 md:p-4 border border-gray-700/50">
                                            <h4 className="font-semibold text-white mb-2 md:mb-3">Weapon Stats</h4>
                                            <div className="space-y-3">
                                                {/* Damage */}
                                                <div>
                                                    <div className="flex justify-between mb-1">
                                                        <span className="text-sm text-gray-400">Damage</span>
                                                        <span className="text-sm font-bold text-red-300">{selectedWeapon.damage}</span>
                                                    </div>
                                                    <div className="w-full bg-gray-700 rounded-full h-2">
                                                        <div
                                                            className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full"
                                                            style={{ width: `${selectedWeapon.damage}%` }}
                                                        />
                                                    </div>
                                                </div>
                                                {/* Speed */}
                                                <div>
                                                    <div className="flex justify-between mb-1">
                                                        <span className="text-sm text-gray-400">Speed</span>
                                                        <span className="text-sm font-bold text-blue-300">{selectedWeapon.speed}</span>
                                                    </div>
                                                    <div className="w-full bg-gray-700 rounded-full h-2">
                                                        <div
                                                            className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full"
                                                            style={{ width: `${selectedWeapon.speed}%` }}
                                                        />
                                                    </div>
                                                </div>
                                                {/* Range */}
                                                <div>
                                                    <div className="flex justify-between mb-1">
                                                        <span className="text-sm text-gray-400">Range</span>
                                                        <span className="text-sm font-bold text-green-300">{selectedWeapon.range}</span>
                                                    </div>
                                                    <div className="w-full bg-gray-700 rounded-full h-2">
                                                        <div
                                                            className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                                                            style={{ width: `${selectedWeapon.range}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Right Column - Selection */}
                                <div className="space-y-6 md:space-y-8">
                                    {/* Weapon Selection */}
                                    <div>
                                        <h3 className="text-lg md:text-xl font-semibold text-white mb-3 md:mb-4">
                                            Select Weapon ({unlockedWeapons.length}/{WEAPONS_CONFIG.length})
                                        </h3>
                                        <div className="space-y-2 md:space-y-3">
                                            {WEAPONS_CONFIG.map((weapon) => (
                                                <button
                                                    key={weapon.id}
                                                    onClick={() => {
                                                        if (weapon.unlocked) {
                                                            setSelectedWeaponId(weapon.id);
                                                            const firstUnlockedSkin = weapon.skins.find(s => s.unlocked);
                                                            if (firstUnlockedSkin) {
                                                                setSelectedSkinId(firstUnlockedSkin.id);
                                                            }
                                                        }
                                                    }}
                                                    className={`relative w-full p-3 md:p-4 rounded-xl text-left transition-all duration-300
                                    ${selectedWeaponId === weapon.id
                                                            ? "bg-gradient-to-r from-purple-600/30 to-purple-800/30 border-2 border-purple-500"
                                                            : weapon.unlocked
                                                                ? "bg-gray-800/30 border border-gray-700 hover:bg-gray-700/30"
                                                                : "bg-gray-900/50 border border-gray-800 cursor-not-allowed opacity-60"
                                                        }`}
                                                    disabled={!weapon.unlocked}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-center gap-2">
                                                                <h4 className="text-base md:text-lg font-bold text-white truncate">
                                                                    {weapon.name}
                                                                </h4>
                                                                {!weapon.unlocked && (
                                                                    <Lock className="w-3 h-3 text-gray-400 flex-shrink-0" />
                                                                )}
                                                            </div>
                                                            <p className="text-xs md:text-sm text-gray-400 mt-1 truncate">
                                                                {weapon.description}
                                                            </p>
                                                        </div>
                                                        {selectedWeaponId === weapon.id && (
                                                            <div className="ml-2 w-2 h-2 rounded-full bg-purple-400 animate-pulse shrink-0" />
                                                        )}
                                                    </div>
                                                    {selectedWeaponId === weapon.id && (
                                                        <motion.div
                                                            layoutId="weapon-indicator"
                                                            className="absolute bottom-0 left-0 right-0 h-0.5 md:h-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"
                                                        />
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Skin Selection */}
                                    {selectedWeapon && (
                                        <div>
                                            <div className="flex items-center justify-between mb-3 md:mb-4">
                                                <div>
                                                    <h3 className="text-lg md:text-xl font-semibold text-white">Select Variant</h3>
                                                    <p className="text-sm text-gray-400">
                                                        {selectedWeapon.skins.filter(s => s.unlocked).length}/{selectedWeapon.skins.length} unlocked
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => handleSkinChange('prev')}
                                                        className="p-1.5 md:p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                        aria-label="Previous skin"
                                                        disabled={selectedWeapon.skins.filter(s => s.unlocked).length <= 1}
                                                    >
                                                        <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleSkinChange('next')}
                                                        className="p-1.5 md:p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                        aria-label="Next skin"
                                                        disabled={selectedWeapon.skins.filter(s => s.unlocked).length <= 1}
                                                    >
                                                        <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="space-y-2 md:space-y-3">
                                                {selectedWeapon.skins.map((skin) => (
                                                    <button
                                                        key={skin.id}
                                                        onClick={() => {
                                                            if (skin.unlocked) {
                                                                setSelectedSkinId(skin.id);
                                                            }
                                                        }}
                                                        disabled={!skin.unlocked}
                                                        className={`relative w-full p-3 md:p-4 rounded-xl text-left transition-all duration-300
                                      ${selectedSkinId === skin.id
                                                                ? "bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border-2 border-blue-500/50"
                                                                : skin.unlocked
                                                                    ? "bg-gray-800/30 border border-gray-700 hover:bg-gray-700/30"
                                                                    : "bg-gray-900/50 border border-gray-800 cursor-not-allowed opacity-60"
                                                            }`}
                                                    >
                                                        <div className="flex items-center gap-3 md:gap-4">
                                                            {/* Skin Preview */}
                                                            <div className={`w-12 h-12 md:w-16 md:h-16 rounded-lg flex items-center justify-center shrink-0 relative
                                            ${selectedSkinId === skin.id
                                                                    ? "bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border border-blue-500/50"
                                                                    : "bg-gray-900 border border-gray-700"
                                                                } ${!skin.unlocked ? "grayscale" : ""}`}>
                                                                <img
                                                                    src={skin.skin.image}
                                                                    alt={skin.name}
                                                                    className="w-8 h-8 md:w-12 md:h-12 object-contain"
                                                                />
                                                                {!skin.unlocked && (
                                                                    <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                                                                        <Lock className="w-5 h-5 text-gray-400" />
                                                                    </div>
                                                                )}
                                                            </div>

                                                            <div className="flex-1 min-w-0">
                                                                <div className="flex items-center gap-2 flex-wrap">
                                                                    <h4 className="text-base md:text-lg font-bold text-white truncate">
                                                                        {skin.name}
                                                                    </h4>
                                                                    <span className={`text-xs px-1.5 py-0.5 md:px-2 md:py-1 rounded-full ${getRarityColor(skin.rarity)} shrink-0`}>
                                                                        {skin.rarity}
                                                                    </span>
                                                                </div>
                                                                <p className="text-xs md:text-sm text-gray-400 mt-1 line-clamp-2">
                                                                    {skin.description}
                                                                </p>
                                                            </div>

                                                            {skin.unlocked ? (
                                                                <div className="text-xs md:text-sm px-2 py-1 md:px-3 md:py-1 bg-green-500/20 text-green-300 rounded-full shrink-0">
                                                                    Unlocked
                                                                </div>
                                                            ) : (
                                                                <div className="text-xs md:text-sm px-2 py-1 md:px-3 md:py-1 bg-gray-700 text-gray-400 rounded-full shrink-0">
                                                                    Locked
                                                                </div>
                                                            )}
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Skin Description */}
                                    {selectedSkin && (
                                        <div className="bg-gradient-to-br from-gray-800/50 to-black/50 rounded-xl p-3 md:p-4 border border-gray-700/50">
                                            <h4 className="font-semibold text-white mb-2">Variant Details</h4>
                                            <p className="text-xs md:text-sm text-gray-300 mb-2 md:mb-3">{selectedSkin.description}</p>
                                            <div className="pt-2 md:pt-3 border-t border-gray-700/50">
                                                <div className="text-xs md:text-sm text-gray-400">Special Effect</div>
                                                <div className="text-sm md:text-base text-purple-300 font-medium">
                                                    {selectedSkin.skin.slashProp.spriteSrc.includes("red")
                                                        ? "Blood Red Slash Trail"
                                                        : selectedSkin.skin.slashProp.spriteSrc.includes("blue")
                                                            ? "Azure Blue Slash Trail"
                                                            : "Custom Slash Effect"}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-4 md:p-6 border-t border-purple-500/20 bg-gradient-to-r from-transparent to-purple-900/10 shrink-0">
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                <button
                                    onClick={onClose}
                                    className="w-full sm:w-auto px-4 py-2 md:px-6 md:py-3 rounded-xl bg-gray-800 hover:bg-gray-700 
                           text-white font-medium transition-colors order-2 sm:order-1"
                                >
                                    Cancel
                                </button>

                                <div className="text-center order-1 sm:order-2">
                                    <div className="text-xs md:text-sm text-gray-400">Ready to wield</div>
                                    <div className="text-lg md:text-xl font-bold text-white truncate max-w-[200px] md:max-w-none">
                                        {selectedWeapon?.name} - {selectedSkin?.name}
                                    </div>
                                </div>

                                <button
                                    onClick={handleConfirm}
                                    disabled={!selectedWeapon || !selectedSkin || !selectedWeapon.unlocked || !selectedSkin.unlocked}
                                    className={`w-full sm:w-auto px-6 py-3 rounded-xl font-bold 
                           transition-all transform hover:scale-105 active:scale-95 order-3
                           ${selectedWeapon && selectedSkin && selectedWeapon.unlocked && selectedSkin.unlocked
                                            ? "bg-gradient-to-r from-purple-600 to-cyan-600 text-white hover:from-purple-700 hover:to-cyan-700"
                                            : "bg-gray-700 text-gray-400 cursor-not-allowed"
                                        }`}
                                >
                                    {selectedWeapon && selectedSkin && selectedWeapon.unlocked && selectedSkin.unlocked
                                        ? "Equip Weapon"
                                        : "Locked"}
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    <ToastContainer theme="dark" />
                </motion.div>
            )}
        </AnimatePresence>
    );
}