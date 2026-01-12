import { Vec2 } from "@/utils/math";

export enum EnemyType {
  Ground,
  Flying,
}

export type Enemy = {
  id: string;
  type: EnemyType;
  position: Vec2;
  velocity: Vec2;
  hp: number;
  sprite: string;
};
