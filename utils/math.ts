import { DamageShape } from "@/game/GameEvents";
import { lineCircleHit } from "./geometry";

export type Vec2 = { x: number; y: number };

export function lerpAngle(current: number, target: number, t: number) {
  let diff = target - current;
  diff = ((diff + 180) % 360) - 180;
  return current + diff * t;
}

export function moveTowards(
  from: Vec2,
  to: Vec2,
  speed: number,
  dt: number
): Vec2 {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const len = Math.hypot(dx, dy) || 1;

  return {
    x: from.x + (dx / len) * speed * dt,
    y: from.y + (dy / len) * speed * dt,
  };
}

function getDistance(from: Vec2, to: Vec2) {
  return Math.hypot(from.x - to.x, from.y - to.y);
}

export function resolveHit(shape: DamageShape, prop: any): boolean {
  let hit = false;

  switch (shape.type) {
    case "LINE":
      hit = lineCircleHit(
        shape.start,
        shape.end,
        prop.position,
        prop.radius || prop?.width / 2
      );
      break;

    case "POINT":
      hit =
        getDistance(
          { x: prop.position.x, y: prop.position.y },
          { x: shape.position.x, y: shape.position.y }
        ) < shape.radius;
      break;

    case "CIRCLE":
      hit =
        getDistance(
          { x: prop.position.x, y: prop.position.y },
          { x: shape.center.x, y: shape.center.y }
        ) < shape.radius;
      break;
  }

  return hit;
}
