'use client'
import { Vec2 } from "@/weapons/Weapon";
import { useEffect, useRef, useState } from "react";
import { WeaponModel } from "./WeaponModel";
import { NormalizedLandmark } from "@mediapipe/tasks-vision";
import { WeaponController } from "@/weapons/WeaponController";
import { Katana } from "@/weapons/Katana";
import { KatanaBloody, KatanaClean } from "@/weapons/skins/katanaSkins";
import { isHandClosed } from "@/utils/gestures";
import { WeaponSkin } from "@/weapons/WeaponSkin";
import SliceCanvas from "./SliceCanvas";

type Props = {
    handLandmarks: NormalizedLandmark[] | null;
};

const SMOOTH_FACTOR = 0.35;
const MAX_DELTA = 40;
let weaponSkin: WeaponSkin = KatanaBloody;

export function WeaponRenderer({ handLandmarks }: Props) {
    const [pos, setPos] = useState<Vec2>({ x: 300, y: 300 });
    const [delta, setDelta] = useState<Vec2>({ x: 1, y: 0 });
    const lastRef = useRef<Vec2 | null>(null);
    const controllerRef = useRef(new WeaponController());
    const weaponRef = useRef(new Katana({ skin: weaponSkin }))

    useEffect(() => {
        controllerRef.current.equip(weaponRef.current);
    }, [])

    useEffect(() => {
        if (!handLandmarks) return;

        const next = {
            x: (1 - handLandmarks[8].x) * window.innerWidth,
            y: handLandmarks[8].y * window.innerHeight
        };

        updateMotion(next);
        weaponRef.current.handLandmarks = handLandmarks;
        controllerRef.current.update(next, isHandClosed(handLandmarks));
    }, [handLandmarks]);

    function updateMotion(next: Vec2) {
        setPos(prev => {
            if (!lastRef.current) {
                lastRef.current = next;
                setDelta({ x: 0, y: 0 });
                return next;
            }

            const smoothed = {
                x: prev.x + (next.x - prev.x) * SMOOTH_FACTOR,
                y: prev.y + (next.y - prev.y) * SMOOTH_FACTOR
            };

            const rawDelta = {
                x: smoothed.x - prev.x,
                y: smoothed.y - prev.y
            };

            const len = Math.hypot(rawDelta.x, rawDelta.y);
            const clamped =
                len > MAX_DELTA
                    ? { x: rawDelta.x * (MAX_DELTA / len), y: rawDelta.y * (MAX_DELTA / len) }
                    : rawDelta;

            setDelta(clamped);
            lastRef.current = smoothed;
            return smoothed;
        });
    }

    return (
        <div className="fixed inset-0">
            <WeaponModel
                position={pos}
                delta={delta}
                skin={weaponSkin}
                handLandmarks={handLandmarks}
            />
            <SliceCanvas {...{ weaponSkin }} />
        </div>
    );
}
