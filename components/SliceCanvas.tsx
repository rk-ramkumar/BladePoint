'use client'
import { drawSlices } from "@/utils/drawSlices";
import { useEffect, useRef } from "react";

export default function SliceCanvas() {
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

        function loop() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawSlices(ctx);
            requestAnimationFrame(loop);
        }

        loop();
        return () => window.removeEventListener("resize", resize);
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-40"
        />
    );
}
