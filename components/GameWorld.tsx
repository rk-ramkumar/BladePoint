'use client'
import { useEffect, useRef, useState } from "react";
import BackgroundLayer from "./BackGroundLayer";
import { applyDamage, emitQueueEvents, spawnEnemy, updateEnemies } from "@/enemies/EnemyManager";
import { Enemy } from "@/enemies/EnemyTypes";
import EnemyRenderer from "./EnemyRenderer";
import Relic from "./Relic";
import { gameEvents } from "@/game/GameEvents";
import FlashOverlay from "./FlashOverlay";
import DebugHitCanvas from "./DebugHitCanvas";


const SPAWN_INTERVAL = 5 * 1000
const DEBUG_MODE = false;

export default function GameWorld() {
    const [enemies, setEnemies] = useState<Enemy[]>([]);
    const [stage, setStage] = useState(0);
    const screenRef = useRef<{ w: number; h: number } | null>(null);
    const [gameOver, setGameOver] = useState(false);
    const debugSlicesRef = useRef<
        { start: { x: number; y: number }; end: { x: number; y: number }, life: number }[]
    >([]);

    // Events Controller
    useEffect(() => {
        const gameOver = gameEvents.on("GAME_OVER", e => {
            setGameOver(true);
        })
        const enemyKilled = gameEvents.on("ENEMY_KILLED", e => {
            setEnemies(prev => prev.filter(en => en.id !== e.enemyId));
        });
        const damage = gameEvents.on("DAMAGE", e => {
            if (DEBUG_MODE && e.shape.type === "LINE") {
                debugSlicesRef.current.push({
                    start: e.shape.start,
                    end: e.shape.end,
                    life: 20
                });
            }

            setEnemies(prev =>
                applyDamage(prev, e.shape, e.damage)
            );
        });

        return () => {
            gameOver();
            enemyKilled();
            damage()
        }

    }, [])

    // Stage progression
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

    // Controlled spawning
    useEffect(() => {
        const screen = screenRef.current;
        if (!screen) return;

        const spawnInterval = Math.max(SPAWN_INTERVAL - stage * 150, 500);

        const id = setInterval(() => {
            setEnemies(e => [...e, spawnEnemy(stage, screen)]);
        }, spawnInterval);

        setEnemies(e => [...e, spawnEnemy(stage, screen)]);

        return () => clearInterval(id);
    }, [stage]);

    // Game loop
    useEffect(() => {
        let last = performance.now();
        let raf: number;

        function loop(now: number) {
            const dt = (now - last) / 1000;
            last = now;

            const screen = screenRef.current!;
            const relicPos = { x: screen.w / 2, y: screen.h / 2 };

            setEnemies(prev => updateEnemies(prev, dt, relicPos));
            emitQueueEvents();

            raf = requestAnimationFrame(loop);
        }

        raf = requestAnimationFrame(loop);

        return () => cancelAnimationFrame(raf);
    }, []);

    if (gameOver) {
        return (
            <div className="fixed inset-0 bg-black text-red-500 flex items-center justify-center text-4xl">
                GAME OVER
            </div>
        );
    }

    return (
        <>
            <BackgroundLayer {...{ stage }} />
            <Relic />
            {enemies.map(e => (
                <EnemyRenderer key={e.id} enemy={e} />
            ))}

            {/* slice Line Renderer (debug mode) */}
            <DebugHitCanvas slices={debugSlicesRef.current} />

        </>
    );
}
