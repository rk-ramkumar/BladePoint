export type Vec2 = { x: number; y: number };

export interface Weapon {
  name: string;

  onEquip(): void;
  onUnequip(): void;

  onMove(position: Vec2, delta: Vec2): void;
  onAttackStart(position: Vec2): void;
  onAttackEnd(position: Vec2): void;
}
