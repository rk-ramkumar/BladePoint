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

    useEffect(() => {
        const difference = souls - prevSoulsRef.current;
        if (difference !== 0) {
            setChange(difference);
            prevSoulsRef.current = souls;
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => setChange(0), 1000);
        }
    }, [souls]);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative group"
        >
            <div className="flex items-center gap-3 bg-gradient-to-r from-gray-900/90 to-purple-900/50 
                          px-5 py-3 rounded-2xl border border-purple-500/40 
                          shadow-2xl shadow-purple-900/30 backdrop-blur-md 
                          hover:border-purple-400/60 transition-colors">
                {/* Animated soul icon */}
                <motion.div
                    animate={{
                        y: [0, -3, 0],
                        rotate: [0, 5, 0, -5, 0],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="relative"
                >
                    <Image
                        src="/assets/soul/purple-orb.png"
                        alt="Souls"
                        width={32}
                        height={32}
                        className="drop-shadow-[0_0_15px_rgba(168,85,247,0.8)]"
                    />
                    {/* Pulsing glow */}
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 w-full h-full bg-purple-500 rounded-full blur-md -z-10"
                    />
                </motion.div>

                {/* Counter */}
                <div className="relative">
                    <motion.span
                        key={displayCount}
                        initial={{ y: change > 0 ? -8 : 8 }}
                        animate={{ y: 0 }}
                        className="text-2xl font-black bg-gradient-to-b from-purple-200 to-pink-200 
                                 bg-clip-text text-transparent tracking-tight font-mono"
                    >
                        {displayCount.toLocaleString()}
                    </motion.span>

                    {/* Change indicator */}
                    {change !== 0 && (
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            className={`absolute -top-6 right-0 px-3 py-1 rounded-full text-sm font-bold 
                                     ${change > 0
                                    ? 'bg-gradient-to-r from-emerald-500/20 to-green-500/20 text-emerald-300 border border-emerald-500/30'
                                    : 'bg-gradient-to-r from-rose-500/20 to-red-500/20 text-rose-300 border border-rose-500/30'
                                }`}
                        >
                            {change > 0 ? '↑ +' : '↓ '}{Math.abs(change)}
                        </motion.div>
                    )}
                </div>
            </div>

            <div className="absolute left-full top-1/2 -translate-x-1/2 mb-2 px-3 py-2 
                          bg-gray-900/90 backdrop-blur-md rounded-lg border border-purple-500/30 
                          text-xs text-purple-200 opacity-0 group-hover:opacity-100 transition-opacity 
                          whitespace-nowrap pointer-events-none">
                Collected souls
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 
                              border-transparent border-t-gray-900/90" />
            </div>
        </motion.div>
    );
}