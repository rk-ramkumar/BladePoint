'use client'
import { WeaponSkin } from "@/weapons/WeaponSkin";
import { Vec2 } from "@/weapons/Weapon";
import { useRef } from "react";

type Props = {
    position: Vec2; // world grip position
    delta: Vec2;    // movement delta
    skin: WeaponSkin;
    handLandmarks: any | null;
};
const ROTATION_SMOOTH = 0.15; // 0.1 slow, 0.2 fast

function lerpAngle(current: number, target: number, t: number) {
    let diff = target - current;
    diff = ((diff + 180) % 360) - 180;
    return current + diff * t;
}

export function WeaponModel({ position, skin, handLandmarks }: Props) {
    const rotationRef = useRef(0);

    const targetRotation = handLandmarks
        ? skin.getRotation(handLandmarks)
        : rotationRef.current;

    rotationRef.current = lerpAngle(
        rotationRef.current,
        targetRotation,
        ROTATION_SMOOTH
    );

    return (
        <img
            src={skin.image}
            draggable={false}
            // className="border-2"
            style={{
                position: "fixed",
                left: position.x - skin.pivot.x,
                top: position.y - skin.pivot.y,
                width: skin.size.width,
                height: skin.size.height,
                transform: `rotate(${rotationRef.current}deg)`,
                transformOrigin: `${skin.pivot.x}px ${skin.pivot.y}px`,
                pointerEvents: "none",
                userSelect: "none"
            }}
        />
    );
}
