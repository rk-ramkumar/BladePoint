"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { gameStore, DEFAULT_DATA } from "./GameStore";
import { Background, BACKGROUNDS } from "./backgrounds";

type GameContextType = {
  paused: boolean;
  pausedRef: React.MutableRefObject<boolean>;
  setPause: (v: boolean) => void;

  background: Background;
  setBackground: (bg: Background) => void;

  souls: number;
  addSouls: (n: number) => void;

  playerName: string;
  setPlayerName: (name: string) => void;
};

const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(paused);
  const [background, setBackground] = useState<Background>(
    BACKGROUNDS.find(b => !b.locked)!
  );
  const [souls, setSouls] = useState(DEFAULT_DATA.souls);
  const [playerName, setPlayerNameState] = useState(DEFAULT_DATA.playerName);

  const [hasLoadedFromStorage, setHasLoadedFromStorage] = useState(false);

  function setPause(v: boolean) {
    setPaused(v);
    pausedRef.current = v;
  }

  function addSouls(n: number) {
    setSouls(s => s + n);
  }

  function setPlayerName(name: string) {
    setPlayerNameState(name);
  }

  useEffect(() => {
    const saved = gameStore.load();
    if (saved) {
      setSouls(saved.souls);
      setPlayerNameState(saved.playerName);
    }
    setHasLoadedFromStorage(true);
  }, []);

  useEffect(() => {
    if (!hasLoadedFromStorage) return;

    gameStore.save({
      ...gameStore.getData(),
      souls,

      playerName,
    });
  }, [souls, playerName, hasLoadedFromStorage]);

  return (
    <GameContext.Provider
      value={{
        paused,
        pausedRef,
        setPause,
        background,
        setBackground,
        souls,
        addSouls,
        playerName,
        setPlayerName,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used inside GameProvider");
  return ctx;
}