'use client'
import GameWorld from "@/components/GameWorld";
import HandRecognizer from "@/components/HandRecognizer";
import { PauseButton } from "@/components/PauseButton";
import { WeaponRenderer } from "@/components/WeaponRenderer";
import { KatanaBloody } from "@/weapons/skins/katanaSkins";
import { Vec2 } from "@/weapons/Weapon";
import { useRef, useState } from "react";


export default function Home() {
  const [pause, setPause] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [pos, setPos] = useState<Vec2>({ x: 300, y: 300 });
  const [delta, setDelta] = useState<Vec2>({ x: 1, y: 0 });
  const lastRef = useRef<Vec2 | null>(null);

  function onMouseMove(e: React.MouseEvent) {
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


  const setHandResults = () => {

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
        <div
          className="fixed inset-0 bg-black"
          onMouseMove={onMouseMove}
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
