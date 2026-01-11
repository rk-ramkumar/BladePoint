'use client'
import GameWorld from "@/components/GameWorld";
import HandRecognizer from "@/components/HandRecognizer";
import { PauseButton } from "@/components/PauseButton";
import { WeaponRenderer } from "@/components/WeaponRenderer";
import { GestureIntent, getGestureIntent } from "@/utils/gestures";
import { HandLandmarkerResult, NormalizedLandmark } from "@mediapipe/tasks-vision";
import { useRef, useState } from "react";


export default function Home() {
  const [pause, setPause] = useState(false)
  const [intent, setIntent] = useState<GestureIntent | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const prevPinchRef = useRef(false);

  const setHandResults = (result: HandLandmarkerResult) => {
    if (result.landmarks.length > 0) {
      const hand = result.landmarks[0];
      const handedness = result.handedness[0][0].displayName.toLowerCase()
      const gestureIntent = getGestureIntent(
        hand,
        prevPinchRef.current,
        handedness
      );
      prevPinchRef.current = gestureIntent.triggerDown;
      setIntent(gestureIntent);
    }
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

      <WeaponRenderer {...{ intent }} />
    </>
  );
}
