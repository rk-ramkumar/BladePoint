import { Weapon, Vec2 } from "./Weapon";

export class WeaponController {
  private weapon: Weapon | null = null;
  private lastPosition: Vec2 | null = null;
  private attacking = false;

  equip(weapon: Weapon) {
    this.weapon?.onUnequip();
    this.weapon = weapon;
    this.weapon.onEquip();
  }

  update(position: Vec2, isClosed: boolean) {
    if (!this.weapon) return;

    if (this.lastPosition) {
      const delta = {
        x: position.x - this.lastPosition.x,
        y: position.y - this.lastPosition.y
      };
      this.weapon.onMove(position, delta);
    }

    if (isClosed && !this.attacking) {
      this.attacking = true;
      this.weapon.onAttackStart(position);
    }

    if (!isClosed && this.attacking) {
      this.attacking = false;
      this.weapon.onAttackEnd(position);
    }

    this.lastPosition = position;
  }
}
