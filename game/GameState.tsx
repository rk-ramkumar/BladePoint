"use client";

import { createContext, useContext, useRef, useState } from "react";

const GameContext = createContext<any>(null);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [paused, setPaused] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const pausedRef = useRef(paused);

  function setPause(val: boolean) {
    setPaused(val);
    pausedRef.current = val;
  }

  return (
    <GameContext.Provider value={{ paused, pausedRef, setPause, showSettings, setShowSettings }}>
      {children}
    </GameContext.Provider>
  );
}

export const useGame = () => useContext(GameContext);
