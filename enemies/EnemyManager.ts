import { Enemy, EnemyState, EnemyType } from "./EnemyTypes";
import { createEnemy } from "./EnemyFactory";
import { gameEvents } from "@/game/GameEvents";
import { moveTowards } from "@/utils/math";

export type EnemyUpdateResult = {
  enemies: Enemy[];
  events: {
    type: "ENEMY_ATTACK";
    damage: number;
    sourceId: string;
  }[];
};

const RELIC_RADIUS = 60;
const PROXIMITY_RADIUS = 220;

let eventsToEmit: any[] = [];

export function spawnEnemy(
  stage: number,
  screen: { w: number; h: number }
): Enemy {
  const flyingChance = Math.min(0.2 + stage * 0.1, 0.6);

  const type =
    Math.random() < flyingChance ? EnemyType.Flying : EnemyType.Ground;

  return createEnemy(type, screen);
}

export function updateEnemies(
  enemies: Enemy[],
  dt: number,
  relicPos: { x: number; y: number }
): Enemy[] {
  const next: Enemy[] = [];

  for (const enemy of enemies) {
    if (enemy.state !== EnemyState.Moving) continue;

    const pos = moveTowards(enemy.position, relicPos, enemy.speed, dt);

    const dx = pos.x - relicPos.x;
    const dy = pos.y - relicPos.y;

    if (Math.hypot(dx, dy) < PROXIMITY_RADIUS) {
      eventsToEmit.push({
        type: "ENEMY_NEAR_RELIC",
        intensity: 1 - Math.hypot(dx, dy) / PROXIMITY_RADIUS,
      });
    }

    if (Math.hypot(dx, dy) < RELIC_RADIUS) {
      eventsToEmit.push({
        type: "ENEMY_ATTACK",
        damage: enemy.damage,
        sourceId: enemy.id,
      });
      enemy.state = EnemyState.Attacking;
      continue;
    }

    next.push({ ...enemy, position: pos });
  }

  return next;
}

export function emitQueueEvents() {
  if (eventsToEmit.length > 0) {
    eventsToEmit.map((e) => gameEvents.emit(e));
    eventsToEmit = [];
  }
}
