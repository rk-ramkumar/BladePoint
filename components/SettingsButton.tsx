import { useGame } from "@/game/GameState";
import { Settings } from "lucide-react";
import SettingsPanel from "./SettingsPanel";
import { useState } from "react";

export function SettingsButton() {
  const { setPause, } = useGame();
  const [showSettings, setShowSettings] = useState(false)

  function onClose() {
    setPause(false)
    setShowSettings(false)
  }

  return (
    <div className="pointer-events-auto">
      <button
        type="button"
        onClick={() => {
          setPause(true);
          setShowSettings(true);
        }}
        className="fixed top-4 right-4 hover:scale-110 transition"
      >
        <Settings size={42} />
      </button>
      {showSettings && <SettingsPanel onClose={onClose} />}
    </div>
  )
}
