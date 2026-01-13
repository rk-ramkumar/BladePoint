'use client';

import SoulDisplay from "./SoulDisplay";
import { SettingsButton } from "../SettingsButton";


export default function HomeHeader() {
    return (
        <div className="absolute top-0 left-0 w-full flex items-center justify-between px-8 py-6">
            <div className="flex items-center gap-6">
                <SoulDisplay />
                <SettingsButton />
            </div>
        </div>
    );
}
