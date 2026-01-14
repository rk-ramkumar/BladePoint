'use client';

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import PlayButton from "@/components/home/PlayButton";
import RealmPreviewCard from "@/components/home/RealmPreviewCard";
import HomeNavBar from "@/components/home/HomeNavBar";
import BackgrounSelect from "@/components/BackgrounSelect";
import HomeHeader from "@/components/home/HomeHeader";
import HomeSpecter from "@/components/home/HomeSpecter";
import RenameModal from "@/components/home/RenameModal";

export default function HomeScreen({ onPlay }: { onPlay: () => void }) {
  const [showRealmSelect, setShowRealmSelect] = useState(false);
  const [onEdit, setOnEdit] = useState(false);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-950 via-black to-purple-950/30 text-white overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 80%, rgba(120, 80, 255, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(220, 120, 255, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(0, 0, 0, 0.8) 0%, transparent 50%)
            `,
            backgroundSize: "400% 400%",
          }}
        />
      </div>



      <div className="relative flex flex-col items-center justify-center h-full gap-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center"
        >
          <h1 className="text-7xl md:text-8xl font-black tracking-tighter mb-4">
            <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-cyan-300 
                           bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(168,85,247,0.5)]">
              HAND OF RUIN
            </span>
          </h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "200px" }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto"
          />
        </motion.div>

        <div className="flex flex-col items-center gap-8 w-full max-w-4xl">
          <RealmPreviewCard onClick={() => setShowRealmSelect(true)} />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/30 to-pink-600/30 
                          rounded-full blur-xl animate-pulse" />

            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute -top-12 left-1/2 -translate-x-1/2 text-purple-300 text-sm font-semibold 
                       bg-gradient-to-b from-purple-900/50 to-transparent px-4 py-2 rounded-full 
                       border border-purple-500/30 w-8/12 text-center"
            >
              ▼ BEGIN YOUR JOURNEY ▼
            </motion.div>

            <PlayButton onClick={onPlay} />
          </motion.div>
        </div>
      </div>
      <HomeSpecter setOnEdit={setOnEdit} />
      <HomeHeader />
      <HomeNavBar />

      <AnimatePresence>
        {showRealmSelect && (
          <BackgrounSelect onSelect={() => setShowRealmSelect(false)} />
        )}
        {onEdit && <RenameModal onClose={() => setOnEdit(false)} />}
      </AnimatePresence>
    </div>
  );
}