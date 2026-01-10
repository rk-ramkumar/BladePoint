import { Vec2 } from "@/weapons/Weapon";

export type Slice = {
  start: Vec2;
  end: Vec2;
  life: number; // 1 → 0
};

export const slices: Slice[] = [];

export function spawnSlice(start: Vec2, end: Vec2) {
  slices.push({
    start,
    end,
    life: 1,
  });
}

export function drawSlices(ctx: CanvasRenderingContext2D) {
  for (let i = slices.length - 1; i >= 0; i--) {
    const s = slices[i];

    ctx.strokeStyle = `rgba(255,255,255,${s.life})`;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(s.start.x, s.start.y);
    ctx.lineTo(s.end.x, s.end.y);
    ctx.stroke();

    s.life -= 0.08;

    if (s.life <= 0) {
      slices.splice(i, 1);
    }
  }
}
