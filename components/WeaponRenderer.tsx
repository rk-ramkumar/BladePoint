'use client'
import { WeaponSkin } from "@/weapons/WeaponSkin";
import { Vec2 } from "@/weapons/Weapon";

type Props = {
    position: Vec2; // world grip position
    delta: Vec2;    // movement delta
    skin: WeaponSkin;
};

export function WeaponRenderer({ position, delta, skin }: Props) {
    const angle =
        Math.atan2(delta.y, delta.x) * (180 / Math.PI);

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

                // transform: `rotate(${angle}deg)`,
                transformOrigin: `${skin.pivot.x}px ${skin.pivot.y}px`,

                pointerEvents: "none",
                userSelect: "none"
            }}
        />
    );
}
