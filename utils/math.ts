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
