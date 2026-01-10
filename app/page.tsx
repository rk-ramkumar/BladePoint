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
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <GameWorld />
        {/* HUD layer */}
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="fixed w-32 top-1 left-1">
            <HandRecognizer {...{ setHandResults, pause, canvasRef }} />
            {pause && (<div className="text-center"> Resume To Play</div>)}
          </div>
          <PauseButton paused={pause} onToggle={HandleOnPause} />
          <canvas ref={canvasRef} className="w-full pointer-events-none transform scale-x-[-1]"></canvas>
        </div>
        {/* End Of HUD layer*/}

        <WeaponRenderer handLandmarks={handLandmarks} />
      </main>
    </div>
  );
}
