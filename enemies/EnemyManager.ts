import { Enemy, EnemyType } from "./EnemyTypes";
import { createEnemy } from "./EnemyFactory";

export function spawnEnemy(
  stage: number,
  screen: { w: number; h: number }
): Enemy {
  const flyingChance = Math.min(0.2 + stage * 0.1, 0.6);

  const type =
    Math.random() < flyingChance ? EnemyType.Flying : EnemyType.Ground;

  return createEnemy(type, screen);
}
