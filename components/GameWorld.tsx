'use client'
import { useEffect, useRef, useState } from "react";
import BackgroundLayer from "./BackGroundLayer";
import { spawnEnemy } from "@/enemies/EnemyManager";
import { Enemy, EnemyState } from "@/enemies/EnemyTypes";
import EnemyRenderer from "./EnemyRenderer";
import { moveTowards } from "@/utils/math";
import Relic from "./Relic";


const RELIC_RADIUS = 60;
const SPAWN_INTERVAL = 5 * 1000

export default function GameWorld() {
    const [enemies, setEnemies] = useState<Enemy[]>([]);
    const [stage, setStage] = useState(0);
    const screenRef = useRef<{ w: number; h: number } | null>(null);
    const [relicHp, setRelicHp] = useState(100);

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

    // Controlled spawning (NOT spam)
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
        let animationId: number;
        let last = performance.now();
        const update = (now: number) => {
            const dt = (now - last) / 1000;
            last = now;
            const screen = screenRef.current;
            if (!screen) return;

            setEnemies(prev => prev.flatMap(enemy => {
                switch (enemy.state) {
                    case EnemyState.Moving:
                        return OnEnemyMove(enemy, dt, screen);
                    case EnemyState.Attacking:
                        return OnEnemyAttack(enemy)
                    default:
                        return [];
                }
            }))

            animationId = requestAnimationFrame(update);
        }

        animationId = requestAnimationFrame(update);

        return () => cancelAnimationFrame(animationId);
    }, [])

    function OnEnemyMove(enemy: Enemy, dt: number, screen: { w: number; h: number }) {
        const RELIC_POS = { x: screen.w / 2, y: screen.h / 2 }
        const nextPos = moveTowards(
            enemy.position,
            RELIC_POS,
            enemy.speed,
            dt
        );
        // Reached relic
        const dx = nextPos.x - RELIC_POS.x;
        const dy = nextPos.y - RELIC_POS.y;

        if (Math.hypot(dx, dy) < RELIC_RADIUS) {
            return [{
                ...enemy,
                state: EnemyState.Attacking
            }];
        }
        return [{ ...enemy, position: nextPos }];
    }

    function OnEnemyAttack(enemy: Enemy) {
        console.log(`${enemy.id} enemy attacked relic with ${enemy.damage} damage`)
        setRelicHp(hp =>
            Math.max(0, hp - enemy.damage)
        );
        return [{ ...enemy, state: EnemyState.Dead }];
    }

    if (relicHp <= 0) {
        return (
            <div className="fixed inset-0 bg-black text-red-500 flex items-center justify-center text-4xl">
                GAME OVER
            </div>
        );
    }

    return (
        <>
            <BackgroundLayer {...{ stage }} />
            <Relic hp={relicHp} />
            {enemies.map(e => (
                <EnemyRenderer key={e.id} enemy={e} />
            ))}
        </>
    );
}
