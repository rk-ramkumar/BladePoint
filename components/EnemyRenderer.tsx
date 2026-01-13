'use client';
import { Enemy, EnemyState } from "@/enemies/EnemyTypes";
import { motion } from "framer-motion";

export default function EnemyRenderer({ enemy }: { enemy: Enemy }) {
    const facingRight = enemy.velocity.x > 0;
    const isHit = !!enemy.hitFlashTimer;

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
                animate={{
                    opacity: enemy.state === EnemyState.Dying ? 0 : 1,
                    scale: enemy.state === EnemyState.Dying ? 1.2 : 1,
                    filter: isHit
                        ? "brightness(2) contrast(1.4)"
                        : enemy.state === EnemyState.Dying
                            ? "blur(8px)"
                            : "brightness(1)",
                    transform: facingRight ? "scaleX(1)" : "scaleX(-1)",
                }}
                transition={{
                    duration: isHit ? 0.05 : enemy.deathTimer ?? 0.4
                }}
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
                {enemy.state !== EnemyState.Dying && enemy.hp || ""}
            </div>
        </div>
    );
}
