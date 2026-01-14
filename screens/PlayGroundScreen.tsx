'use client';

import GameWorld from "@/components/GameWorld";
import HandRecognizer from "@/components/HandRecognizer";
import HomeHeader from "@/components/home/HomeHeader";
import { WeaponRenderer } from "@/components/WeaponRenderer";
import { useGame } from "@/game/GameState";
import { GestureIntent, getGestureIntent } from "@/utils/gestures";
import { HandLandmarkerResult } from "@mediapipe/tasks-vision";
import { useRef, useState } from "react";
import { SelectedWeapon } from "@/app/page";

interface PlayGroundScreenProps {
    selectedWeapon: SelectedWeapon;
}

export default function PlayGroundScreen({ selectedWeapon }: PlayGroundScreenProps) {
    const [intent, setIntent] = useState<GestureIntent | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const prevPinchRef = useRef(false);
    const { paused } = useGame();

    const setHandResults = (result: HandLandmarkerResult) => {
        if (result.landmarks.length > 0) {
            const hand = result.landmarks[0];
            const handedness = result.handedness[0][0].displayName.toLowerCase()
            const gestureIntent = getGestureIntent(
                hand,
                prevPinchRef.current,
                handedness
            );
            prevPinchRef.current = gestureIntent.triggerDown;
            setIntent(gestureIntent);
        }
    }


    return (
        <>
            {/* GAME WORLD (background + enemies) */}
            <GameWorld />

            {/* HUD + weapon */}
            <div className="fixed inset-0 pointer-events-none z-50">
                <div className="fixed w-32 bottom-1 right-1">
                    <HandRecognizer {...{ setHandResults, canvasRef }} />
                    {paused && <div className="text-center text-white">Resume To Play</div>}
                </div>

                <HomeHeader />
                <canvas
                    ref={canvasRef}
                    className="w-full pointer-events-none transform scale-x-[-1]"
                />
            </div>

            <WeaponRenderer
                intent={intent}
                selectedWeapon={selectedWeapon}
            />
        </>
    );
}