'use client'
import { useEffect, useRef, useState } from "react";
import BackgroundLayer from "./BackGroundLayer";
import { spawnEnemy } from "@/enemies/EnemyManager";
import { Enemy } from "@/enemies/EnemyTypes";
import EnemyRenderer from "./EnemyRenderer";

export default function GameWorld() {
    const [enemies, setEnemies] = useState<Enemy[]>([]);
    const [stage, setStage] = useState(0);
    const screenRef = useRef<{ w: number; h: number } | null>(null);


    useEffect(() => {
        screenRef.current = {
            w: window.innerWidth,
            h: window.innerHeight
        };

        const id = setInterval(() => {
            setStage(s => s + 1);
        }, 20000);

        return () => clearInterval(id);
    }, []);

    useEffect(() => {
        const spawnInterval = Math.max(1400 - stage * 150, 400);

        const id = setInterval(() => {
            const screen = screenRef.current;
            if (!screen) return;
            setEnemies(e => [...e, spawnEnemy(stage, screen)]);
        }, spawnInterval);

        return () => clearInterval(id);
    }, [stage]);


    useEffect(() => {
        let animationId: number;

        const update = () => {
            const screen = screenRef.current;
            if (!screen) return;
            setEnemies(prev =>
                prev
                    .map(e => ({
                        ...e,
                        position: {
                            x: e.position.x + e.velocity.x * 0.016,
                            y: e.position.y + e.velocity.y * 0.016
                        }
                    }))
                    .filter(e => e.position.y < screen.h + 200)
            );
            animationId = requestAnimationFrame(update);
        }

        animationId = requestAnimationFrame(update);

        return () => cancelAnimationFrame(animationId);
    }, [])

    return (
        <>
            <BackgroundLayer {...{ stage }} />
            {enemies.map(e => (
                <EnemyRenderer key={e.id} enemy={e} />
            ))}
        </>
    );
}
