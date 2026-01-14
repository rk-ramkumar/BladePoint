'use client'

import { useEffect, useRef } from "react";
import { WeaponModel } from "./WeaponModel";
import { WeaponController } from "@/weapons/WeaponController";
import { GestureIntent } from "@/utils/gestures";
import SliceCanvas from "./SliceCanvas";
import { SelectedWeapon } from "@/app/page";

type Props = {
    intent: GestureIntent | null;
    selectedWeapon: SelectedWeapon;
};

export function WeaponRenderer({ intent, selectedWeapon }: Props) {
    const controllerRef = useRef(new WeaponController());

    const weaponRef = useRef(
        new selectedWeapon.weaponType({ skin: selectedWeapon.skin })
    );

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
                skin={selectedWeapon.skin}
                weapon={weaponRef.current}
            />
            <SliceCanvas {...{ weaponSkin: selectedWeapon.skin }} />
        </div>
    );
}