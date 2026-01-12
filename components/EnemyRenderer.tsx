'use client';
import { Enemy, EnemyState } from "@/enemies/EnemyTypes";
import { gameEvents } from "@/game/GameEvents";
import { useEffect } from "react";
import { motion } from "framer-motion";

export default function EnemyRenderer({ enemy }: { enemy: Enemy }) {
    const facingRight = enemy.velocity.x > 0;

    useEffect(() => {
        if (enemy.state === EnemyState.Dying) {
            const id = setTimeout(() => {
                gameEvents.emit({
                    type: "ENEMY_KILLED",
                    enemyId: enemy.id
                });
            }, 500);

            return () => clearTimeout(id);
        }
    }, [enemy.state, enemy.id]);

    return (
        <div
            // className="border-2"
            style={{
                position: "fixed",
                left: enemy.position.x,
                top: enemy.position.y,
                transform: "translate(-50%, -50%)",
                pointerEvents: "none"
            }}
        >
            {/* ENEMY SPRITE */}
            <motion.img
                src={enemy.sprite}
                initial={false}
                animate={
                    enemy.state === EnemyState.Dying
                        ? {
                            opacity: 0,
                            scale: 1.2,
                            filter: "blur(8px)"
                        }
                        : { opacity: 1 }
                }
                transition={{ duration: 0.4 }}
                style={{
                    width: `${enemy.width}px`,
                    transform: facingRight ? "scaleX(1)" : "scaleX(-1)"
                }}
            />

            {/* HP TEXT */}
            <div
                style={{
                    position: "absolute",
                    top: -40,
                    left: "50%",
                    transform: "translateX(-50%)",
                    color: "#fff",
                    fontSize: 22,
                    fontWeight: "bold",
                    textShadow: "0 0 12px red",
                    pointerEvents: "none"
                }}
            >
                {enemy.hp}
            </div>
        </div>
    );
}
