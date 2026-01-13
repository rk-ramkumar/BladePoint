'use client';

import { useState } from "react";
import { motion } from "framer-motion";

import PlayButton from "@/components/home/PlayButton";
import RealmPreviewCard from "@/components/home/RealmPreviewCard";
import HomeNavBar from "@/components/home/HomeNavBar";
import CursorHand from "@/components/home/CursorHand";
import BackgrounSelect from "@/components/BackgrounSelect";
import HomeHeader from "@/components/home/HomeHeader";
import HomeSpecter from "@/components/home/HomeSpecter";

export default function HomeScreen({ onPlay }: { onPlay: () => void }) {
  const [showRealmSelect, setShowRealmSelect] = useState(false);

  return (
    <div className="fixed inset-0 bg-black text-white overflow-hidden">
      <HomeSpecter />

      {/* <CursorHand /> */}
      <HomeHeader />

      <div className="flex flex-col items-center justify-center h-full gap-8">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl font-extrabold tracking-widest"
        >
          HAND OF RUIN
        </motion.h1>
        <RealmPreviewCard onClick={() => setShowRealmSelect(true)} />
        <PlayButton onClick={onPlay} />
      </div>

      <HomeNavBar />

      {showRealmSelect && (
        <BackgrounSelect onSelect={() => setShowRealmSelect(false)} />
      )}
    </div>
  );
}
