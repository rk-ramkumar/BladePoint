'use client'
import { drawSlashes } from "@/utils/drawSlices";
import { initSlashImage } from "@/weapons/skins/katanaSkins";
import { WeaponSkin } from "@/weapons/WeaponSkin";
import { useEffect, useRef } from "react";

export default function SliceCanvas({ weaponSkin }: { weaponSkin: WeaponSkin }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rafRef = useRef<number | null>(null);
    const skinRef = useRef(weaponSkin);

    useEffect(() => {
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext("2d")!;

        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        resize();
        window.addEventListener("resize", resize);

        let lastTime = performance.now()

        function loop(now: number) {
            const deltaTime = (now - lastTime) / 1000
            lastTime = now

            ctx.clearRect(0, 0, canvas.width, canvas.height)
            drawSlashes(ctx, deltaTime, skinRef.current);

            rafRef.current = requestAnimationFrame(loop);
        }

        rafRef.current = requestAnimationFrame(loop);

        return () => {
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
                rafRef.current = null;
            }
            window.removeEventListener("resize", resize);
        }
    }, []);

    useEffect(() => {
        skinRef.current = weaponSkin;
        initSlashImage(weaponSkin);
    }, [weaponSkin]);


    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-40"
        />
    );
}
