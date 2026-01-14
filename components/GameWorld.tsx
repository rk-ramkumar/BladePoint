'use client'
import { useCallback, useEffect, useRef, useState } from "react";
import { applyDamage, emitQueueEvents, spawnEnemy, updateEnemies } from "@/enemies/EnemyManager";
import { Enemy } from "@/enemies/EnemyTypes";
import EnemyRenderer from "./EnemyRenderer";
import { gameEvents } from "@/game/GameEvents";
import DebugHitCanvas from "./DebugHitCanvas";
import { useGame } from "@/game/GameState";
import { applyCollectibleHit, Collectible, emitQueuedCollectibleEvents, spawnCollectibles, updateCollectibles } from "@/game/CollectibleManager";
import SoulPickup from "./SoulPickup";


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
    const { pausedRef, setPause, addSouls } = useGame();
    const [collectibles, setCollectibles] = useState<Collectible[]>([]);

    // Events Controller
    useEffect(() => {
        const offGameOver = gameEvents.on("GAME_OVER", e => {
            setGameOver(true);
            setPause(true);
        })

        const offEnemyKilled = gameEvents.on("ENEMY_KILLED", e => {
            setEnemies(prev => prev.filter(en => en.id !== e.enemyId));
        });

        const offDamage = gameEvents.on("DAMAGE", e => {
            if (DEBUG_MODE && e.shape.type === "LINE") {
                debugSlicesRef.current.push({
                    start: e.shape.start,
                    end: e.shape.end,
                    life: 20
                });
            }

            setCollectibles(prev => applyCollectibleHit(prev, e.shape).remaining);
            setEnemies(prev => applyDamage(prev, e.shape, e.damage)
            );
        });

        const offCollectibleSpawn = gameEvents.on("SPAWN_COLLECTIBLE", e => {
            setCollectibles(c => [
                ...c,
                ...spawnCollectibles(e.kind, e.value)
            ]);
        });

        const offCollectible = gameEvents.on("COLLECTIBLE_COLLECTED", e => {
            if (e.kind === "SOUL") {
                addSouls(e.value);
            }
        });

        return () => {
            offGameOver();
            offEnemyKilled();
            offDamage()
            offCollectible()
            offCollectibleSpawn();
        }

    }, [])

    // Stage progression
    useEffect(() => {
        screenRef.current = {
            w: window.innerWidth,
            h: window.innerHeight
        };

        const id = setInterval(() => {
            if (pausedRef.current) return;
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
            if (pausedRef.current) return;
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

            if (!pausedRef.current) {
                const screen = screenRef.current!;
                const relicPos = { x: screen.w / 2, y: screen.h / 2 };

                setEnemies(prev => updateEnemies(prev, dt, relicPos));
                setCollectibles(prev => updateCollectibles(prev, dt))
                emitQueueEvents();
                emitQueuedCollectibleEvents();
            };

            raf = requestAnimationFrame(loop);
        }

        raf = requestAnimationFrame(loop);

        return () => cancelAnimationFrame(raf);
    }, []);

    // Clean up collected collectibles periodically
    useEffect(() => {
        const interval = setInterval(() => {
            setCollectibles(prev =>
                prev.filter(c => c.state !== "COLLECTED")
            );
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    if (gameOver) {
        return (
            <div className="fixed inset-0 bg-black text-red-500 flex items-center justify-center text-4xl">
                GAME OVER
            </div>
        );
    }
    const handleCollectibleComplete = useCallback((id: string) => {
        setCollectibles(prev => prev.filter(c => c.id !== id));
    }, []);


    return (
        <>
            {enemies.map(e => (
                <EnemyRenderer key={e.id} enemy={e} />
            ))}
            {collectibles.map(c => (
                <SoulPickup
                    {...c}
                    key={c.id}
                    onComplete={() => handleCollectibleComplete(c.id)}
                />
            ))}

            {/* slice Line Renderer (debug mode) */}
            <DebugHitCanvas slices={debugSlicesRef.current} />

        </>
    );
}
