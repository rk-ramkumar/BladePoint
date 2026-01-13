'use client';

import BackgroundLayer from "./BackGroundLayer";
import Relic from "./Relic";

export default function WorldLayer({ visible }: { visible: boolean }) {

    return (
        <div
            style={{
                opacity: visible ? 1 : 0,
                transition: "opacity 0.4s ease",
                pointerEvents: visible ? "auto" : "none"
            }}
        >
            <BackgroundLayer />
            <Relic />
        </div>
    );
}
