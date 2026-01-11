import { GestureIntent } from "@/utils/gestures";
import { WeaponSkin } from "./WeaponSkin";

export type Vec2 = { x: number; y: number };

export interface Weapon {
  name: string;
  skin: WeaponSkin | null;
  position: Vec2;
  handedness: "left" | "right";

  onEquip(): void;
  onUnequip(): void;

  onMove(intent: GestureIntent): void;
  onAttackStart(): void;
  onAttackEnd(): void;
  onHandedness(h: "left" | "right"): void;
  getVisualState(): {
    flipX: boolean;
    rotationSpeed: number;
    rotationDeg: number;
  };
}

export class BaseWeapon implements Weapon {
  name = "Base Weapon";
  skin: WeaponSkin | null = null;
  position: Vec2 = { x: 300, y: 300 };
  handedness: "left" | "right" = "right";

  protected isAttacking = false;
  protected rotationSpeed = 0.15;
  private SMOOTH_FACTOR = 0.35;

  constructor(prop?: any) {
    this.skin = prop?.skin;
  }

  onEquip() {
    console.log("🗡 Weapon equipped");
  }

  onUnequip() {}

  onAttackStart() {
    this.isAttacking = true;
    console.log("Attack Start");
  }

  onAttackEnd() {
    this.isAttacking = false;
    console.log("Attack End");
  }

  onHandedness(h: "left" | "right") {
    this.handedness = h;
  }

  onMove(intent: GestureIntent) {
    const next = intent.aimPosition;
    if (!this.position) {
      this.position = next;
      return;
    }
    const smoothed = {
      y: this.position.y + (next.y - this.position.y) * this.SMOOTH_FACTOR,
      x: this.position.x + (next.x - this.position.x) * this.SMOOTH_FACTOR,
    };

    this.position = smoothed;
  }

  getVisualState() {
    return {
      flipX: this.handedness === "left",
      rotationSpeed: this.rotationSpeed,
      rotationDeg: 0,
    };
  }
}
