export function lerpAngle(current: number, target: number, t: number) {
  let diff = target - current;
  diff = ((diff + 180) % 360) - 180;
  return current + diff * t;
}
