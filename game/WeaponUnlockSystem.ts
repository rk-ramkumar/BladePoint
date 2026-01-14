import { WEAPONS_CONFIG } from "@/weapons/WeaponConfig";

export class WeaponUnlockSystem {
  static unlockWeapon(weaponId: string) {
    const weapon = WEAPONS_CONFIG.find((w) => w.id === weaponId);
    if (weapon) {
      weapon.unlocked = true;
      this.saveUnlockedWeapons();
    }
  }

  static unlockSkin(weaponId: string, skinId: string) {
    const weapon = WEAPONS_CONFIG.find((w) => w.id === weaponId);
    const skin = weapon?.skins.find((s) => s.id === skinId);
    if (skin) {
      skin.unlocked = true;
      this.saveUnlockedSkins();
    }
  }

  static isWeaponUnlocked(weaponId: string): boolean {
    const weapon = WEAPONS_CONFIG.find((w) => w.id === weaponId);
    return weapon?.unlocked || false;
  }

  static isSkinUnlocked(weaponId: string, skinId: string): boolean {
    const weapon = WEAPONS_CONFIG.find((w) => w.id === weaponId);
    const skin = weapon?.skins.find((s) => s.id === skinId);
    return skin?.unlocked || false;
  }

  private static saveUnlockedWeapons() {
    const unlockedWeapons = WEAPONS_CONFIG.filter((w) => w.unlocked).map(
      (w) => w.id
    );
    localStorage.setItem("unlockedWeapons", JSON.stringify(unlockedWeapons));
  }

  private static saveUnlockedSkins() {
    const unlockedSkins: Record<string, string[]> = {};
    WEAPONS_CONFIG.forEach((weapon) => {
      unlockedSkins[weapon.id] = weapon.skins
        .filter((s) => s.unlocked)
        .map((s) => s.id);
    });
    localStorage.setItem("unlockedSkins", JSON.stringify(unlockedSkins));
  }

  static loadUnlockedItems() {
    // Load weapons
    const savedWeapons = localStorage.getItem("unlockedWeapons");
    if (savedWeapons) {
      const unlockedWeapons: string[] = JSON.parse(savedWeapons);
      WEAPONS_CONFIG.forEach((weapon) => {
        weapon.unlocked = unlockedWeapons.includes(weapon.id);
      });
    }

    const savedSkins = localStorage.getItem("unlockedSkins");
    if (savedSkins) {
      const unlockedSkins: Record<string, string[]> = JSON.parse(savedSkins);
      WEAPONS_CONFIG.forEach((weapon) => {
        weapon.skins.forEach((skin) => {
          skin.unlocked = unlockedSkins[weapon.id]?.includes(skin.id) || false;
        });
      });
    }
  }
}
