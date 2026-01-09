'use client'
import HandRecognizer from "@/components/HandRecognizer";
import { PauseButton } from "@/components/PauseButton";
import { useRef, useState } from "react";


export default function Home() {
  const [pause, setPause] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const setHandResults = () => {

  }

  function HandleOnPause(): void {
    setPause(prev => !prev);
  }


  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        {/* HUD layer */}
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="fixed w-32 top-1 left-1 border-4 border-blue-500 rounded-md">
            <HandRecognizer {...{ setHandResults, pause, canvasRef }} />
            {pause && (<div className="text-center"> Resume To Play</div>)}
          </div>
          <PauseButton paused={pause} onToggle={HandleOnPause} />
          <canvas ref={canvasRef} className="w-full pointer-events-none transform scale-x-[-1]"></canvas>
        </div>
        {/* End Of HUD layer*/}

      </main>
    </div>
  );
}
