'use client';

import { useState } from "react";
import HomeScreen from "@/screens/HomeScreen";
import LoadingScreen from "@/screens/LoadingScreen";
import PlayGroundScreen from "@/screens/PlayGroundScreen";
import WorldLayer from "@/components/WorldLayer";

type Screen = "HOME" | "LOADING" | "GAME";

export default function Home() {
  const [screen, setScreen] = useState<Screen>("HOME");

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
