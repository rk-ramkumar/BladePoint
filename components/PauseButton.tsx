import { useGame } from "@/game/GameState";
import { Pause, Play } from "lucide-react";



export function PauseButton() {
    const { paused, setPause } = useGame();

    return (
        <button type="button" onClick={() => setPause(!paused)} className="pointer-events-auto absolute top-4 right-16">
            <div className="hover:scale-110 transition">
                {paused
                    ? <Play size={42} className=" text-green-500 animate-bounce" />
                    : <Pause size={42} />
                }
            </div>
        </button>
    );
}
