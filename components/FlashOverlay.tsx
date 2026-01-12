'use client';
import { motion } from "framer-motion";

export default function FlashOverlay({ trigger }: { trigger: number }) {
    return (
        <motion.div
            key={trigger}
            initial={{ opacity: 0.6 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
                position: "fixed",
                inset: 0,
                background: "white",
                pointerEvents: "none",
                zIndex: 20
            }}
        />
    );
}
