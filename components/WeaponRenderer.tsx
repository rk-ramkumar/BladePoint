'use client'
import { useEffect, useRef } from "react";
import { WeaponModel } from "./WeaponModel";
import { WeaponController } from "@/weapons/WeaponController";
import { Katana } from "@/weapons/Katana";
import { KatanaBloody, KatanaClean } from "@/weapons/skins/katanaSkins";
import { GestureIntent } from "@/utils/gestures";
import { WeaponSkin } from "@/weapons/WeaponSkin";
import SliceCanvas from "./SliceCanvas";

type Props = {
    intent: GestureIntent | null;
};

let weaponSkin: WeaponSkin = KatanaBloody;

export function WeaponRenderer({ intent }: Props) {
    const controllerRef = useRef(new WeaponController());
    const weaponRef = useRef(new Katana({ skin: weaponSkin }))

    useEffect(() => {
        controllerRef.current.equip(weaponRef.current);
    }, [])

    useEffect(() => {
        if (!intent) return;

        controllerRef.current.update(intent);
    }, [intent]);

    return (
        <div className="fixed inset-0">
            <WeaponModel
                skin={weaponSkin}
                weapon={weaponRef.current}
                intent={intent}
            />
            <SliceCanvas {...{ weaponSkin }} />
        </div>
    );
}
