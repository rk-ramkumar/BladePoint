import { spawnSlash } from "@/utils/drawSlices";
import { Weapon, Vec2 } from "./Weapon";
import { WeaponSkin } from "./WeaponSkin";

const MIN_SLICE_SPEED = 15;
function bladeTip(grip: Vec2, angleDeg: number, bladeLength: number): Vec2 {
  const rad = (angleDeg * Math.PI) / 180;

  return {
    x: grip.x + Math.cos(rad) * bladeLength,
    y: grip.y + Math.sin(rad) * bladeLength,
  };
}
export class Katana implements Weapon {
  name = "Katana";

  private isAttacking = false;
  private lastPos: Vec2 | null = null;
  skin: WeaponSkin | null = null;
  public handLandmarks: any;

  constructor(prop: any) {
    this.skin = prop?.skin;
  }

  onEquip() {
    console.log("🗡 Katana equipped");
  }

  onUnequip() {}

  onAttackStart() {
    this.isAttacking = true;
    this.lastPos = null;
  }

  onAttackEnd() {
    this.isAttacking = false;
    this.lastPos = null;
  }

  onMove(position: Vec2, delta: Vec2) {
    if (!this.isAttacking || !this.skin) return;

    const speed = Math.hypot(delta.x, delta.y);
    if (speed < MIN_SLICE_SPEED) return;
    const angle = this.skin.getRotation(this.handLandmarks);

    const currTip = bladeTip(position, angle, -this.skin.pivot.x);
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
