import { Vec2 } from "@/utils/math";

export enum EnemyType {
  Ground,
  Flying,
}
export enum EnemyState {
  Moving,
  Attacking,
  Dead,
  Dying,
}

export type Enemy = {
  id: string;
  type: EnemyType;
  state: EnemyState;
  position: Vec2;
  velocity: Vec2;
  speed: number;
  hp: number;
  sprite: string;
  damage: number;
  width: number;
  deathTimer?: number;
  hitFlashTimer?: number;
};
