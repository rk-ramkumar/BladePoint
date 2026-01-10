import { Weapon, Vec2 } from "./Weapon";

export class Katana implements Weapon {
  name = "Katana";

  onEquip() {
    console.log("🗡 Katana equipped");
  }

  onUnequip() {}

  onMove(position: Vec2, delta: Vec2) {
    const speed = Math.hypot(delta.x, delta.y);
    if (speed > 15) {
      console.log("Slice", position, delta);
    }
  }

  onAttackStart() {}
  onAttackEnd() {}
}
