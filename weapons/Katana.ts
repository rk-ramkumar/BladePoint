import { spawnSlash } from "@/utils/drawSlices";
import { BaseWeapon } from "./Weapon";
import { GestureIntent } from "@/utils/gestures";
import { lerpAngle } from "@/utils/math";
import { gameEvents } from "@/game/GameEvents";

export class Katana extends BaseWeapon {
  name = "Katana";
  damage = 2;
  private swordLength = 100;
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
    const angle = 180 * multiplier;
    const angleRad = (angle * Math.PI) / 180;
    const endX = this.position.x + this.swordLength * Math.cos(angleRad);
    const endY = this.position.y + this.swordLength * Math.sin(angleRad);
    const end = { x: endX, y: endY };

    gameEvents.emit({
      type: "DAMAGE",
      source: "PLAYER",
      damage: this.damage,
      shape: {
        type: "LINE",
        start: this.position,
        end: end,
        radius: 35,
      },
    });
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
