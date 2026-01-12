import { spawnSlash } from "@/utils/drawSlices";
import { BaseWeapon } from "./Weapon";
import { GestureIntent } from "@/utils/gestures";
import { lerpAngle, Vec2 } from "@/utils/math";

function bladeTip(grip: Vec2, angleDeg: number, bladeLength: number): Vec2 {
  const rad = (angleDeg * Math.PI) / 180;

  return {
    x: grip.x + Math.cos(rad) * bladeLength,
    y: grip.y + Math.sin(rad) * bladeLength,
  };
}
export class Katana extends BaseWeapon {
  name = "Katana";
  private _intent: GestureIntent | null = null;
  private rotationRef: number = 0;
  private deltaTime: number = 0;

  onEquip() {
    console.log("🗡 Katana equipped");
  }

  onAttackStart() {
    super.onAttackStart();
    if (!this.skin) return;

    const multiplier = this.handedness === "left" ? -1 : 1;
    spawnSlash(
      this.position.x + 64 * multiplier,
      this.position.y,
      90 * multiplier,
      this.handedness === "left"
    );
  }

  onMove(intent: GestureIntent) {
    super.onMove(intent);
    this._intent = intent;
  }

  getVisualState(): {
    flipX: boolean;
    rotationSpeed: number;
    rotationDeg: number;
  } {
    const ret = {
      flipX: this.handedness === "left",
      rotationSpeed: this.rotationSpeed,
      rotationDeg: 0,
    };

    if (!this.skin || !this._intent) return ret;

    if (this._intent.triggerPressed) {
      this.deltaTime = 0.5;
    }

    const props =
      this.deltaTime > 0.02
        ? { ...this._intent, triggerPressed: true }
        : this._intent;

    if (this.deltaTime > 0.01) {
      this.deltaTime -= 0.08;
    }

    this.rotationRef = lerpAngle(
      this.rotationRef,
      this.skin?.getRotation(props),
      this.rotationSpeed
    );
    ret.rotationDeg = this.rotationRef;

    return ret;
  }
}
