'use client';

import { useGame } from "@/game/GameState";
import Image from "next/image";
import { useState, useEffect, useRef } from 'react';
import { motion } from "framer-motion";

export function useCounter(target: number, duration = 500) {
    const [count, setCount] = useState(target);
    const prevTargetRef = useRef(target);
    const animationRef = useRef<number>(0);

    useEffect(() => {
        if (target === prevTargetRef.current) return;

        const start = prevTargetRef.current;
        const end = target;
        const difference = end - start;

        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
        }

        let startTime: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const eased = 1 - Math.pow(1 - progress, 4);
            const currentValue = start + (difference * eased);
            setCount(Math.floor(currentValue));

            if (progress < 1) {
                animationRef.current = requestAnimationFrame(animate);
            } else {
                setCount(end);
                prevTargetRef.current = end;
            }
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [target, duration]);

    return count;
}

export default function SoulDisplay() {
    const { souls } = useGame();
    const displayCount = useCounter(souls, 300);
    const prevSoulsRef = useRef(souls);
    const [change, setChange] = useState(0);
    const timeoutRef = useRef<NodeJS.Timeout>(null);

    const formatNumber = (num: number) => {
        return num.toLocaleString();
    };

    useEffect(() => {
        const difference = souls - prevSoulsRef.current;

        if (difference !== 0) {
            setChange(difference);
            prevSoulsRef.current = souls;

            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            timeoutRef.current = setTimeout(() => {
                console.log("Change indicator timeout completed");
                setChange(0);
            }, 1000);
        }
    }, [souls]);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return (
        <div className="relative">
            <div className="flex items-center gap-2 bg-gradient-to-r from-purple-900/30 via-black/40 to-purple-900/30 
                          px-4 py-2 rounded-xl border border-purple-500/30 shadow-lg shadow-purple-500/10 
                          backdrop-blur-sm min-w-[120px]">
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                    }}
                    transition={{ duration: 0.5 }}
                    key={souls}
                >
                    <Image
                        src="/assets/soul/purple-orb.png"
                        alt="Souls"
                        width={28}
                        height={28}
                        className="drop-shadow-[0_0_6px_rgba(168,85,247,0.7)]"
                    />
                </motion.div>

                <div className="relative">
                    <motion.span
                        key={displayCount}
                        initial={{ y: change > 0 ? -10 : 10, opacity: 0.5 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        className="text-xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 
                                 bg-clip-text text-transparent tracking-wider"
                    >
                        {formatNumber(displayCount)}
                    </motion.span>

                    {change !== 0 && (
                        <motion.span
                            initial={{ y: 0, opacity: 0, scale: 0 }}
                            animate={{ y: change > 0 ? -20 : 20, opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            className={`absolute left-full ml-2 px-2 py-1 rounded-md text-xs font-bold ${change > 0
                                ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                                : 'bg-red-500/20 text-red-300 border border-red-500/30'
                                }`}
                        >
                            {change > 0 ? '+' : ''}{change}
                        </motion.span>
                    )}
                </div>
            </div>

            {change > 0 && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0.4, scale: 1.2 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-pink-500/30 
                             rounded-xl blur-lg -z-10"
                />
            )}
        </div>
    );
}