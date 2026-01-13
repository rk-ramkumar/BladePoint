import { useGame } from "@/game/GameState";
import { Settings } from "lucide-react";
import SettingsPanel from "./SettingsPanel";

export function SettingsButton() {
  const { showSettings, setPause, setShowSettings } = useGame();

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
