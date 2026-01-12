import { GestureIntent } from "@/utils/gestures";
import { Weapon } from "./Weapon";

export class WeaponController {
  private weapon: Weapon | null = null;

  equip(weapon: Weapon) {
    this.weapon?.onUnequip();
    this.weapon = weapon;
    this.weapon.onEquip();
  }

  update(intent: GestureIntent) {
    if (!this.weapon) return;

    this.weapon.onMove(intent);

    if (intent.triggerPressed) {
      this.weapon.onAttackStart();
    }

    if (intent.triggerReleased) {
      this.weapon.onAttackEnd();
    }

    this.weapon.onHandedness?.(intent.handedness);
  }
}
