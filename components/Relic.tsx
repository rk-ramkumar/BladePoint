'use client';

import { gameEvents } from "@/game/GameEvents";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import RelicParticles from "./RelicParticles";

function getCorruption(hp: number) {
    if (hp > 70) return 0;
    if (hp > 40) return 1;
    if (hp > 15) return 2;
    return 3;
}

export default function Relic() {
    const [hp, setHp] = useState(100);
    const [hitFlash, setHitFlash] = useState(false);
    const proximityRef = useRef(0);

    useEffect(() => {
        const off1 = gameEvents.on("ENEMY_ATTACK", e => {
            setHitFlash(true);
            setTimeout(() => setHitFlash(false), 250);
            setHp(h => Math.max(0, h - e.damage));
        });

        const off2 = gameEvents.on("ENEMY_NEAR_RELIC", e => {
            proximityRef.current = Math.max(proximityRef.current, e.intensity);
        });

        return () => {
            off1();
            off2();
        };
    }, []);

    useEffect(() => {
        if (hp === 0) gameEvents.emit({ type: "GAME_OVER" });
    }, [hp])

    const corruption = getCorruption(hp);
    const glow = 0.6 + proximityRef.current * 0.8;

    proximityRef.current *= 0.9;

    return (
        <>
            <RelicParticles />

            <motion.div
                animate={{
                    filter: hitFlash
                        ? "brightness(10.6)"
                        : `drop-shadow(0 0 ${30 * glow}px rgba(225,215,120,${glow}))`
                }}
                style={{
                    position: "fixed",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%,-50%)",
                    pointerEvents: "none"
                }}
            >
                <motion.img
                    src="/assets/relic/magic-book.png"
                    animate={{ y: [0, -12, 0], rotate: [-1, 1, -1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    style={{
                        width: 160,
                        filter: `saturate(${1 - corruption * 0.15})`
                    }}
                />

                {/* HP */}
                <div
                    style={{
                        position: "absolute",
                        bottom: 130,
                        left: "50%",
                        transform: "translateX(-50%)",
                        color: "#fff",
                        fontSize: 28,
                        textShadow: "0 0 12px gold"
                    }}
                >
                    {hp}
                </div>
            </motion.div>
        </>
    );
}

