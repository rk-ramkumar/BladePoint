import { spawnSlash } from "@/utils/drawSlices";
import { Vec2, BaseWeapon } from "./Weapon";
import { GestureIntent } from "@/utils/gestures";

function bladeTip(grip: Vec2, angleDeg: number, bladeLength: number): Vec2 {
  const rad = (angleDeg * Math.PI) / 180;

  return {
    x: grip.x + Math.cos(rad) * bladeLength,
    y: grip.y + Math.sin(rad) * bladeLength,
  };
}
export class Katana extends BaseWeapon {
  name = "Katana";
  private lastPos: Vec2 | null = null;

  onEquip() {
    console.log("🗡 Katana equipped");
  }

  onMove(intent: GestureIntent) {
    super.onMove(intent);
    if (!this.isAttacking || !this.skin) return;

    const angle = this.skin.getRotation(intent);

    const currTip = bladeTip(intent.aimPosition, angle, -this.skin.pivot.x);
    if (this.lastPos) {
      const angleRad = Math.atan2(
        currTip.y - this.lastPos.y,
        currTip.x - this.lastPos.x
      );

      spawnSlash(currTip.x, currTip.y, angleRad);
      // fruit hit detection goes here later
    }

    this.lastPos = currTip;
  }
}
