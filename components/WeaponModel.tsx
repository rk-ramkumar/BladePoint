'use client'
import { WeaponSkin } from "@/weapons/WeaponSkin";
import { Weapon } from "@/weapons/Weapon";
import { useRef } from "react";
import { GestureIntent } from "@/utils/gestures";

type Props = {
    skin: WeaponSkin;
    weapon: Weapon;
    intent: GestureIntent | null;
};

function lerpAngle(current: number, target: number, t: number) {
    let diff = target - current;
    diff = ((diff + 180) % 360) - 180;
    return current + diff * t;
}

export function WeaponModel({ skin, weapon, intent }: Props) {
    const rotationRef = useRef(0);
    const visual = weapon.getVisualState();

    const targetRotation = intent
        ? skin.getRotation(intent)
        : rotationRef.current;

    rotationRef.current = lerpAngle(
        rotationRef.current,
        targetRotation,
        visual.rotationSpeed
    );

    return (
        <img
            src={skin.image}
            draggable={false}
            // className="border-2"
            style={{
                position: "fixed",
                left: weapon.position.x - skin.pivot.x,
                top: weapon.position.y - skin.pivot.y,
                width: skin.size.width,
                height: skin.size.height,
                transform: `scaleX(${visual.flipX ? -1 : 1}) rotate(${rotationRef.current}deg)`,
                transformOrigin: `${skin.pivot.x}px ${skin.pivot.y}px`,
                pointerEvents: "none",
                userSelect: "none"
            }}
        />
    );
}
