'use client';

import { useEffect, useState } from "react";
import HomeScreen from "@/screens/HomeScreen";
import LoadingScreen from "@/screens/LoadingScreen";
import PlayGroundScreen from "@/screens/PlayGroundScreen";
import WorldLayer from "@/components/WorldLayer";
import { audioManager } from "@/sound/AudioManager";
import { gameStore } from "@/game/GameStore";
import { BaseWeapon } from "@/weapons/Weapon";
import { WeaponSkin } from "@/weapons/WeaponSkin";
import { WeaponUnlockSystem } from "@/game/WeaponUnlockSystem";

type Screen = "HOME" | "LOADING" | "GAME";

export type SelectedWeapon = {
  weaponType: typeof BaseWeapon;
  skin: WeaponSkin;
  weaponId: string;
  skinId: string;
};

export default function Home() {
  const [screen, setScreen] = useState<Screen>("HOME");
  const [selectedWeapon, setSelectedWeapon] = useState<SelectedWeapon | null>(null);

  useEffect(() => {
    gameStore.load()
    audioManager.init()
    const { masterVolume, bgmVolume, sfxVolume } = gameStore.getData();
    audioManager.setMaster(masterVolume);
    audioManager.setBgm(bgmVolume);
    audioManager.setSfx(sfxVolume);

    WeaponUnlockSystem.loadUnlockedItems();

    // Try to load saved weapon selection
    const savedWeapon = localStorage.getItem("selectedWeapon");
    if (savedWeapon) {
      try {
        setSelectedWeapon(JSON.parse(savedWeapon));
      } catch (e) {
        console.error("Failed to load saved weapon:", e);
      }
    }

    function playOnFirstClick() {
      audioManager.play("HOME_BG", "bgm")
    }

    window.addEventListener("pointerdown", playOnFirstClick, { once: true });

    return () => {
      window.removeEventListener("pointerdown", playOnFirstClick);
    };
  }, [])

  const handleStartGame = (weaponSelection: SelectedWeapon) => {
    localStorage.setItem("selectedWeapon", JSON.stringify(weaponSelection));
    setSelectedWeapon(weaponSelection);
    setScreen("LOADING");
  };

  return (
    <>
      <WorldLayer visible={screen === "GAME"} />
      {screen === "HOME" && (
        <HomeScreen
          onPlay={handleStartGame}
          initialSelection={selectedWeapon}
        />
      )}

      {screen === "LOADING" && (
        <LoadingScreen
          onDone={() => setScreen("GAME")}
          selectedWeapon={selectedWeapon}
        />
      )}

      {screen === "GAME" && selectedWeapon && (
        <PlayGroundScreen
          selectedWeapon={selectedWeapon}
        />
      )}
    </>
  );
}