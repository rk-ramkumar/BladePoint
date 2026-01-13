"use client";

import { createContext, useContext, useRef, useState } from "react";
import { Background, BACKGROUNDS } from "./backgrounds";

type GameContextType = {
  paused: boolean;
  pausedRef: React.MutableRefObject<boolean>;
  setPause: (v: boolean) => void;

  showSettings: boolean;
  setShowSettings: (v: boolean) => void;

  background: Background;
  setBackground: (bg: Background) => void;
};

const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(paused);

  const [showSettings, setShowSettings] = useState(false);

  const [background, setBackground] = useState<Background>(
    BACKGROUNDS.find(b => !b.locked)!
  );

  function setPause(val: boolean) {
    setPaused(val);
    pausedRef.current = val;
  }

  return (
    <GameContext.Provider
      value={{
        paused,
        pausedRef,
        setPause,
        showSettings,
        setShowSettings,
        background,
        setBackground
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export const useGame = () => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used inside GameProvider");
  return ctx;
};
