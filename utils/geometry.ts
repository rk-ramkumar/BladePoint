import { Vec2 } from "@/utils/math";

export function lineIntersectsCircle(
  p1: Vec2,
  p2: Vec2,
  center: Vec2,
  radius: number
): boolean {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;

  const fx = p1.x - center.x;
  const fy = p1.y - center.y;

  const a = dx * dx + dy * dy;
  const b = 2 * (fx * dx + fy * dy);
  const c = fx * fx + fy * fy - radius * radius;

  let discriminant = b * b - 4 * a * c;
  if (discriminant < 0) return false;

  discriminant = Math.sqrt(discriminant);
  const t1 = (-b - discriminant) / (2 * a);
  const t2 = (-b + discriminant) / (2 * a);

  return (t1 >= 0 && t1 <= 1) || (t2 >= 0 && t2 <= 1);
}
