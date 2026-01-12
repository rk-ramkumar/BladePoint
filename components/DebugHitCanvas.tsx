'use client';
import { useEffect, useRef } from "react";

export default function DebugHitCanvas({
    slices
}: {
    slices: { start: any; end: any, life: number }[];
}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext("2d")!;

        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resize();
        window.addEventListener("resize", resize);

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.strokeStyle = "rgba(0,255,0,0.8)";
            ctx.lineWidth = 3;

            for (let i = slices.length - 1; i >= 0; i--) {
                const s = slices[i];
                ctx.beginPath();
                ctx.moveTo(s.start.x, s.start.y);
                ctx.lineTo(s.end.x, s.end.y);
                ctx.stroke();
                s.life -= 0.08;
                if (s.life <= 0) slices.splice(i, 1);
            }

            requestAnimationFrame(draw);
        }

        draw();
        return () => window.removeEventListener("resize", resize);
    }, [slices]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "fixed",
                inset: 0,
                pointerEvents: "none",
                zIndex: 9999
            }}
        />
    );
}
