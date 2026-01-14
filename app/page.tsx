'use client';

import { useEffect, useState } from "react";
import HomeScreen from "@/screens/HomeScreen";
import LoadingScreen from "@/screens/LoadingScreen";
import PlayGroundScreen from "@/screens/PlayGroundScreen";
import WorldLayer from "@/components/WorldLayer";
import { audioManager } from "@/sound/AudioManager";
import { gameStore } from "@/game/GameStore";

type Screen = "HOME" | "LOADING" | "GAME";

export default function Home() {
  const [screen, setScreen] = useState<Screen>("HOME");

  useEffect(() => {
    gameStore.load()
    audioManager.init()
    const { masterVolume, bgmVolume, sfxVolume } = gameStore.getData();
    audioManager.setMaster(masterVolume);
    audioManager.setBgm(bgmVolume);
    audioManager.setSfx(sfxVolume);

    function playOnFirstClick() {
      audioManager.play("HOME_BG", "bgm")
    }

    window.addEventListener("pointerdown", playOnFirstClick, { once: true });
  }, [])

  return (
    <>
      <WorldLayer visible={screen === "GAME"} />
      {screen === "HOME" && (
        <HomeScreen onPlay={() => setScreen("LOADING")} />
      )}

      {screen === "LOADING" && (
        <LoadingScreen onDone={() => setScreen("GAME")} />
      )}

      {screen === "GAME" && <PlayGroundScreen />}
    </>
  );
}
