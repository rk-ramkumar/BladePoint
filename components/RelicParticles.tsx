'use client';
import { useEffect, useRef } from "react";

type Spark = {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
};

const MAX = 20;

export default function RelicParticles() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const sparks = useRef<Spark[]>([]);

    useEffect(() => {
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext("2d")!;

        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resize();
        window.addEventListener("resize", resize);

        function spawn() {
            if (sparks.current.length >= MAX) return;
            sparks.current.push({
                x: canvas.width / 2 + (Math.random() - 0.5) * 40,
                y: canvas.height / 2 + (Math.random() - 0.5) * 40,
                vx: (Math.random() - 0.5) * 100,
                vy: -30 - Math.random() * 20,
                life: 3
            });
        }

        let last = performance.now();
        function loop(now: number) {
            const dt = (now - last) / 1000;
            last = now;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.globalCompositeOperation = "lighter";

            if (Math.random() < 0.2) spawn();

            for (let i = sparks.current.length - 1; i >= 0; i--) {
                const s = sparks.current[i];
                s.x += s.vx * dt;
                s.y += s.vy * dt;
                s.life -= dt;

                ctx.fillStyle = `rgba(255,220,150,${s.life})`;
                ctx.beginPath();
                ctx.arc(s.x, s.y, 2, 0, Math.PI * 2);
                ctx.fill();

                if (s.life <= 0) sparks.current.splice(i, 1);
            }

            ctx.globalCompositeOperation = "source-over";
            requestAnimationFrame(loop);
        }

        requestAnimationFrame(loop);
        return () => window.removeEventListener("resize", resize);
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "fixed",
                inset: 0,
                pointerEvents: "none",
                zIndex: 1
            }}
        />
    );
}
