'use client'
import GameWorld from "@/components/GameWorld";
import HandRecognizer from "@/components/HandRecognizer";
import { PauseButton } from "@/components/PauseButton";
import { WeaponRenderer } from "@/components/WeaponRenderer";
import { HandLandmarkerResult, NormalizedLandmark } from "@mediapipe/tasks-vision";
import { useRef, useState } from "react";


export default function Home() {
  const [pause, setPause] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [handLandmarks, setHandLandmarks] =
    useState<NormalizedLandmark[] | null>(null);
  const [res, setRes] = useState<HandLandmarkerResult | null>(null)

  const setHandResults = (result: HandLandmarkerResult) => {
    setRes(result);
    setHandLandmarks(result.landmarks[0] ?? null)
  }

  function HandleOnPause(): void {
    setPause(prev => !prev);
  }

  return (
    <>
      {/* GAME WORLD (background + enemies) */}
      <GameWorld />

      {/* HUD + weapon */}
      <div className="fixed inset-0 pointer-events-none z-50">
        <div className="fixed w-32 top-1 left-1">
          <HandRecognizer {...{ pause, setHandResults, canvasRef }} />
          {pause && <div className="text-center text-white">Resume To Play</div>}
        </div>

        <PauseButton paused={pause} onToggle={HandleOnPause} />
        <canvas
          ref={canvasRef}
          className="w-full pointer-events-none transform scale-x-[-1]"
        />
      </div>

      <WeaponRenderer handLandmarks={handLandmarks} />
    </>
  );
}
