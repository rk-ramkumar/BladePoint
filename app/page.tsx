'use client'
import GameWorld from "@/components/GameWorld";
import HandRecognizer from "@/components/HandRecognizer";
import { PauseButton } from "@/components/PauseButton";
import { WeaponRenderer } from "@/components/WeaponRenderer";
import { KatanaBloody } from "@/weapons/skins/katanaSkins";
import { Vec2 } from "@/weapons/Weapon";
import { HandLandmarker, HandLandmarkerResult } from "@mediapipe/tasks-vision";
import { useRef, useState } from "react";

const SMOOTH_FACTOR = 0.35;
const MAX_DELTA = 40; // pixels per frame (tune this)

function clampDelta(delta: Vec2): Vec2 {
  const len = Math.hypot(delta.x, delta.y);
  if (len <= MAX_DELTA) return delta;

  const scale = MAX_DELTA / len;
  return {
    x: delta.x * scale,
    y: delta.y * scale
  };
}


export default function Home() {
  const [pause, setPause] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [pos, setPos] = useState<Vec2>({ x: 300, y: 300 });
  const [delta, setDelta] = useState<Vec2>({ x: 1, y: 0 });
  const lastRef = useRef<Vec2 | null>(null);

  function onMouseMove(e: React.MouseEvent) { // For testing
    const next = { x: e.clientX, y: e.clientY };

    if (lastRef.current) {
      setDelta({
        x: next.x - lastRef.current.x,
        y: next.y - lastRef.current.y
      });
    }

    setPos(next);
    lastRef.current = next;
  }


  const setHandResults = (result: HandLandmarkerResult) => {
    if (result.landmarks.length > 0) {

    }
  }
  function handleHandMove(next: Vec2) {
    setPos(prev => {
      // First frame safeguard
      if (!lastRef.current) {
        lastRef.current = next;
        setDelta({ x: 0, y: 0 });
        return next;
      }
      // Low-pass filter (smoothing)
      const smoothed = {
        x: prev.x + (next.x - prev.x) * SMOOTH_FACTOR,
        y: prev.y + (next.y - prev.y) * SMOOTH_FACTOR
      };
      // Delta MUST be based on smoothed motion
      const rawDelta = {
        x: smoothed.x - prev.x,
        y: smoothed.y - prev.y
      };
      const clampedDelta = clampDelta(rawDelta);

      setDelta(clampedDelta);

      lastRef.current = smoothed;
      return smoothed;
    });
  }

  function HandleOnPause(): void {
    setPause(prev => !prev);
  }


  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <GameWorld />
        {/* HUD layer */}
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="fixed w-32 top-1 left-1">
            <HandRecognizer {...{ setHandResults, pause, canvasRef, onHandMove: handleHandMove }} />
            {pause && (<div className="text-center"> Resume To Play</div>)}
          </div>
          <PauseButton paused={pause} onToggle={HandleOnPause} />
          <canvas ref={canvasRef} className="w-full pointer-events-none transform scale-x-[-1]"></canvas>
        </div>
        {/* End Of HUD layer*/}
        <div
          className="fixed inset-0 bg-black"
        // onMouseMove={onMouseMove}
        >
          {/* Swap skin here – logic stays SAME */}
          <WeaponRenderer
            position={pos}
            delta={delta}
            skin={KatanaBloody}
          />
        </div>
      </main>
    </div>
  );
}
