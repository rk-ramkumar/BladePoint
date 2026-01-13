'use client';
import { useGame } from "@/game/GameState";
import { useState } from "react";

export default function RenameModal({ onClose }: { onClose: () => void }) {
    const { playerName, setPlayerName } = useGame();
    const [name, setName] = useState(playerName);

    return (
        <div className="fixed pointer-events-auto inset-0 bg-black/70 h-full flex items-center justify-center">
            <div className="bg-zinc-900 p-6 rounded-xl">
                <input
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="px-4 py-2 bg-black text-white border border-white/30"
                />
                <button
                    onClick={() => {
                        setPlayerName(name);
                        onClose();
                    }}
                    className="ml-4 px-4 py-2 bg-purple-600"
                >
                    Save
                </button>
            </div>
        </div>
    );
}
