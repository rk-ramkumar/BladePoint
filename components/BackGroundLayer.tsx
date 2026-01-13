'use client';
import { useGame } from "@/game/GameState";

export default function BackgroundLayer() {
    const { background } = useGame();

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                backgroundImage: `url(${background.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                zIndex: -100
            }}
        />
    );
}
