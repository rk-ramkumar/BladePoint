'use client';

import { gameEvents } from "@/game/GameEvents";
import { useEffect, useState } from "react";

export default function Relic() {
    const [hp, setHp] = useState(100);

    useEffect(() => {
        gameEvents.on("ENEMY_ATTACK", e => {
            setHp(h => {
                const next = Math.max(0, h - e.damage);
                console.log("relic stat:", { h, next, damage: e.damage })
                if (next === 0) {
                    gameEvents.emit({ type: "GAME_OVER" });
                }
                return next;
            });
        });
    }, []);

    return (
        <div
            className="animate-bounce"
            style={{
                position: "fixed",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: 120,
                height: 120,
                borderRadius: "50%",
                background: "radial-gradient(circle, #7af, #235)",
                boxShadow: "0 0 40px rgba(120,180,255,0.8)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: "bold",
                fontSize: 20
            }}
        >
            {hp}
        </div>
    );
}
