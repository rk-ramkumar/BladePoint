'use client';

import { useGame } from "@/game/GameState";
import Image from "next/image";

export default function SoulDisplay() {
    const { souls } = useGame();
    return (

        <div className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-lg border border-white/20">
            <Image
                src="/assets/soul/purple-orb.png"
                alt="Souls"
                width={26}
                height={26}
            />
            <span className="text-lg font-semibold text-purple-300">
                {souls}
            </span>
        </div>
    );
}
