'use client';
import { Enemy } from "@/enemies/EnemyTypes";

export default function EnemyRenderer({ enemy }: { enemy: Enemy }) {
    const facingRight = enemy.velocity.x > 0;

    return (
        <img
            src={enemy.sprite}
            draggable={false}
            style={{
                position: "fixed",
                left: enemy.position.x,
                top: enemy.position.y,
                width: 140,
                pointerEvents: "none",
                transform: facingRight ? "scaleX(1)" : "scaleX(-1)"
            }}
        />
    );
}
