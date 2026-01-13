'use client';

import { motion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

type Props = {
    origin: { x: number; y: number };
};

export default function SoulPickup({ origin }: Props) {
    const dir = useRef({
        x: (Math.random() - 0.5) * 440,
        y: -80 - Math.random() * 180
    });

    return (
        <motion.div
            initial={{ x: origin.x, y: origin.y, scale: 0.6 }}
            animate={{
                x: origin.x + dir.current.x,
                y: origin.y + dir.current.y,
                scale: 1,
                filter: ["brightness(2) contrast(1.4)", "brightness(1) contrast(0.4)"],
            }}
            transition={{ duration: 5.0, ease: "easeOut" }}
            style={{ position: "fixed", pointerEvents: "none", zIndex: 50 }}
        >
            <Image
                src="/assets/soul/purple-orb.png"
                width={62}
                height={62}
                alt="Soul"
            />
        </motion.div>
    );
}
