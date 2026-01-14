import { SelectedWeapon } from "@/app/page";
import { WEAPONS_CONFIG } from "@/weapons/WeaponConfig";

export function saveWeaponSelection(selection: SelectedWeapon) {
  try {
    localStorage.setItem(
      "selectedWeapon",
      JSON.stringify({
        weaponId: selection.weaponId,
        skinId: selection.skinId,
      })
    );
  } catch (error) {
    console.error("Failed to save weapon selection:", error);
  }
}

export function loadWeaponSelection(): SelectedWeapon | null {
  try {
    const saved = localStorage.getItem("selectedWeapon");
    if (!saved) return null;

    const { weaponId, skinId } = JSON.parse(saved);

    const weaponConfig = WEAPONS_CONFIG.find((w) => w.id === weaponId);
    if (!weaponConfig) return null;

    const skinConfig = weaponConfig.skins.find((s) => s.id === skinId);
    if (!skinConfig) return null;

    return {
      weaponType: weaponConfig.weaponClass,
      skin: skinConfig.skin,
      weaponId: weaponConfig.id,
      skinId: skinConfig.id,
    };
  } catch (error) {
    console.error("Failed to load weapon selection:", error);
    return null;
  }
}

export function getDefaultWeapon(): SelectedWeapon {
  const firstWeapon = WEAPONS_CONFIG.find((w) => w.unlocked);
  if (!firstWeapon) throw new Error("No unlocked weapons available");

  const firstSkin = firstWeapon.skins.find((s) => s.unlocked);
  if (!firstSkin) throw new Error("No unlocked skins available");

  return {
    weaponType: firstWeapon.weaponClass,
    skin: firstSkin.skin,
    weaponId: firstWeapon.id,
    skinId: firstSkin.id,
  };
}
