import { BaseWeapon } from "./Weapon";
import { Katana } from "./Katana";
import { KatanaBloody, KatanaClean } from "./skins/katanaSkins";
import { WeaponSkin } from "./WeaponSkin";

export interface WeaponConfig {
    id: string;
    name: string;
    description: string;
    weaponClass: typeof BaseWeapon;
    damage: number;
    speed: number;
    range: number;
    unlocked: boolean;
    skins: WeaponSkinConfig[];
}

export interface WeaponSkinConfig {
    id: string;
    name: string;
    description: string;
    rarity: "Common" | "Rare" | "Epic" | "Legendary";
    skin: WeaponSkin;
    unlocked: boolean;
}

export const WEAPONS_CONFIG: WeaponConfig[] = [
    {
        id: "katana",
        name: "Katana",
        description: "A swift and precise Japanese sword",
        weaponClass: Katana,
        damage: 2,
        speed: 95,
        range: 10,
        unlocked: true,
        skins: [
            {
                id: "katana_bloody",
                name: "Bloody Katana",
                description: "A battle-worn katana stained with the blood of fallen foes",
                rarity: "Common",
                skin: KatanaBloody,
                unlocked: true,
            },
            {
                id: "katana_clean",
                name: "Clean Katana",
                description: "A pristine katana polished to perfection",
                rarity: "Rare",
                skin: KatanaClean,
                unlocked: true,
            },
        ],
    },
    // Example: Add a pistol 
    {
        id: "pistol",
        name: "Pistol",
        description: "A compact one-handed pistol for clener shots",
        weaponClass: Katana, // Replace with Pistol when created
        damage: 5,
        speed: 40,
        range: 90,
        unlocked: false,
        skins: [
            {
                id: "pistol_default",
                name: "Steel pistol",
                description: "A standard great pistol made of hardened steel",
                rarity: "Common",
                skin: KatanaBloody, // Replace with pistolDefault when created
                unlocked: false,
            },
            {
                id: "gold_pistol ",
                name: "Gold pistol",
                description: "A great pistol imbued with fiery magic",
                rarity: "Epic",
                skin: KatanaClean, // Replace with pistolGold  when created
                unlocked: false,
            },
        ],
    },
];

export function getWeaponById(id: string): WeaponConfig | undefined {
    return WEAPONS_CONFIG.find(weapon => weapon.id === id);
}

export function getSkinById(weaponId: string, skinId: string): WeaponSkinConfig | undefined {
    const weapon = getWeaponById(weaponId);
    return weapon?.skins.find(skin => skin.id === skinId);
}

export function getAvailableWeapons() {
    return WEAPONS_CONFIG.filter(weapon => weapon.unlocked);
}

export function getAvailableSkins(weaponId: string) {
    const weapon = getWeaponById(weaponId);
    return weapon?.skins.filter(skin => skin.unlocked) || [];
}