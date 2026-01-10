'use client'
import { WeaponSkin } from "@/weapons/WeaponSkin";
import { Vec2 } from "@/weapons/Weapon";

type Props = {
    position: Vec2; // world grip position
    delta: Vec2;    // movement delta
    skin: WeaponSkin;
};

const EPS = 0.5;
export function WeaponRenderer({ position, delta, skin }: Props) {
    const effectiveDelta =
        Math.hypot(delta.x, delta.y) < EPS
            ? { x: 1, y: 0 } // keep last direction
            : delta;

    const angle =
        Math.atan2(effectiveDelta.y, effectiveDelta.x) * (180 / Math.PI);

    return (
        <img
            src={skin.image}
            draggable={false}
            className="border-2"
            style={{
                position: "fixed",

                left: position.x - skin.pivot.x,
                top: position.y - skin.pivot.y,


                width: skin.size.width,
                height: skin.size.height,

                transform: `rotate(${angle}deg)`,
                transformOrigin: `${skin.pivot.x}px ${skin.pivot.y}px`,

                pointerEvents: "none",
                userSelect: "none"
            }}
        />
    );
}
