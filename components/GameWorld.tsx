'use client'
import { useEffect, useState } from "react";

type Fruit = {
    id: string;
    x: number;
    y: number;
    speed: number
};
const FRUITSPAWNINTERVEL = 1200;

export default function GameWorld() {
    const [fruits, setFruits] = useState<Fruit[]>([]);

    useEffect(() => {
        const id = setInterval(() => {
            setFruits(prev => [
                ...prev,
                {
                    id: crypto.randomUUID(),
                    x: Math.random() * window.innerWidth,
                    y: 0,
                    speed: 2 + Math.random() * 3
                }
            ]);
        }, FRUITSPAWNINTERVEL);

        return () => clearInterval(id);
    }, []);

    useEffect(() => {
        let animationId: number;

        const update = () => {
            setFruits(prev =>
                prev
                    .map(fruit => ({ ...fruit, y: fruit.y + fruit.speed }))
                    .filter(fruit => fruit.y < window.innerHeight - 50)
            )

            animationId = requestAnimationFrame(update);
        }
        animationId = requestAnimationFrame(update);

        return () => cancelAnimationFrame(animationId);
    }, [])

    return (
        <>
            {fruits.map(f => (
                <div
                    key={f.id}
                    className="absolute w-12 h-12 bg-orange-500 rounded-full"
                    style={{ left: f.x, top: f.y }}
                />
            ))}
        </>
    );
}
