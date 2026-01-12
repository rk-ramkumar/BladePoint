import { Enemy, EnemyState, EnemyType } from "./EnemyTypes";
import { createEnemy } from "./EnemyFactory";
import { DamageShape, gameEvents } from "@/game/GameEvents";
import { moveTowards, Vec2 } from "@/utils/math";
import { lineCircleHit } from "@/utils/geometry";

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
const ENEMY_RADIUS = 40;

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
    const distance = Math.hypot(dx, dy);

    if (distance < PROXIMITY_RADIUS) {
      eventsToEmit.push({
        type: "ENEMY_NEAR_RELIC",
        intensity: 1 - distance / PROXIMITY_RADIUS,
      });
    }

    if (distance < RELIC_RADIUS) {
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

//Helper
function getDistance(from: Vec2, to: Vec2) {
  return Math.hypot(from.x - to.x, from.y - to.y);
}

export function applyDamage(
  enemies: Enemy[],
  shape: DamageShape,
  damage: number
): Enemy[] {
  return enemies.map((enemy) => {
    if (enemy.state !== EnemyState.Moving) return enemy;

    let hit = false;

    switch (shape.type) {
      case "LINE":
        hit = lineCircleHit(
          shape.start,
          shape.end,
          enemy.position,
          enemy.width / 2
        );
        break;

      case "POINT":
        hit =
          getDistance(
            { x: enemy.position.x, y: enemy.position.y },
            { x: shape.position.x, y: shape.position.y }
          ) < shape.radius;
        break;

      case "CIRCLE":
        hit =
          getDistance(
            { x: enemy.position.x, y: enemy.position.y },
            { x: shape.center.x, y: shape.center.y }
          ) < shape.radius;
        break;
    }

    if (!hit) return enemy;
    const next = enemy.hp - damage;

    return {
      ...enemy,
      hp: next,
      state: next <= 0 ? EnemyState.Dying : enemy.state,
    };
  });
}
