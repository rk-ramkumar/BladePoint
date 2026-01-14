'use client';

import Image from "next/image";
import { motion, MotionConfigProps, MotionNodeOptions } from "framer-motion";

type Props = {
    position: { x: number; y: number };
    state: "ALIVE" | "HIT" | "COLLECTED";
    hitTimer?: number;
    deathTimer?: number;
    life: number;
    onComplete?: () => void;
};

export default function SoulPickup({
    position,
    state,
    hitTimer,
    deathTimer,
    life,
    onComplete
}: Props) {
    if (state === "COLLECTED") return null;

    const getOpacity = () => {
        if (state === "HIT" && hitTimer !== undefined) {
            // During hit: fade out from 1 to 0 over hitTimer duration
            return Math.max(0, hitTimer / 0.3);
        }

        if (state === "ALIVE" && deathTimer !== undefined) {
            const fadeStart = life * 0.2;
            if (deathTimer <= fadeStart) {
                return deathTimer / fadeStart;
            }
            return 1;
        }

        return 1;
    };

    const getScale = () => {
        if (state === "HIT" && hitTimer !== undefined) {
            const progress = 1 - (hitTimer / 0.3);
            return 1 + progress * 0.5; // 1 to 1.5
        }
        return 1;
    };

    const floatOffset = {
        x: (Math.random() - 0.5) * 80,
        y: (Math.random() - 0.5) * 40
    };

    const animationProps: MotionNodeOptions = state === "HIT" ? {
        initial: { scale: 1, opacity: 1 },
        animate: {
            scale: [1, 1.5, 0],
            opacity: [1, 0.8, 0],
            rotate: [0, 180, 360]
        },
        transition: {
            duration: 0.3,
            ease: "easeOut",
            times: [0, 0.5, 1]
        },
        onAnimationComplete: onComplete
    } : {
        animate: {
            x: [0, floatOffset.x, 0],
            y: [0, floatOffset.y, 0],
            scale: [0.9, 1, 0.9],
            rotate: [0, 360]
        },
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
        }
    };

    return (
        <motion.div
            {...animationProps}
            style={{
                position: "fixed",
                left: position.x,
                top: position.y,
                transform: "translate(-50%, -50%)",
                pointerEvents: "none",
                opacity: getOpacity(),
                scale: getScale(),
                filter: state === "HIT"
                    ? "drop-shadow(0 0 12px #ff00ff) brightness(1.5)"
                    : "drop-shadow(0 0 6px rgba(180, 120, 255, 0.8))"
            }}
        >
            <Image
                src="/assets/soul/purple-orb.png"
                width={state === "HIT" ? 70 : 62}
                height={state === "HIT" ? 70 : 62}
                alt="Soul"
                style={{
                    filter: state === "HIT" ? "contrast(1.8) saturate(2)" : "none"
                }}
            />

            {/* Glow effect for hit state */}
            {state === "HIT" && (
                <motion.div
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: 2, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        width: "100px",
                        height: "100px",
                        borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(255,100,255,0.6) 0%, transparent 70%)",
                        transform: "translate(-50%, -50%)"
                    }}
                />
            )}

            {/* Floating particles for alive state */}
            {state === "ALIVE" && (
                <>
                    <motion.div
                        animate={{
                            x: [0, 8, 0],
                            y: [0, -8, 0],
                            opacity: [0.5, 1, 0.5]
                        }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        style={{
                            position: "absolute",
                            top: "10px",
                            left: "10px",
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            background: "rgba(255, 100, 255, 0.6)",
                            filter: "blur(1px)"
                        }}
                    />
                    <motion.div
                        animate={{
                            x: [0, -6, 0],
                            y: [0, 6, 0],
                            opacity: [0.5, 1, 0.5]
                        }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                        style={{
                            position: "absolute",
                            bottom: "10px",
                            right: "10px",
                            width: "4px",
                            height: "4px",
                            borderRadius: "50%",
                            background: "rgba(180, 120, 255, 0.6)",
                            filter: "blur(1px)"
                        }}
                    />
                </>
            )}
        </motion.div>
    );
}