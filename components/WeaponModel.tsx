'use client'
import { WeaponSkin } from "@/weapons/WeaponSkin";
import { Weapon } from "@/weapons/Weapon";

type Props = {
    skin: WeaponSkin;
    weapon: Weapon;
};

export function WeaponModel({ skin, weapon }: Props) {
    const visual = weapon.getVisualState();

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
                transform: `scaleX(${visual.flipX ? -1 : 1}) rotate(${visual.rotationDeg}deg)`,
                transformOrigin: `${skin.pivot.x}px ${skin.pivot.y}px`,
                pointerEvents: "none",
                userSelect: "none"
            }}
        />
    );
}
