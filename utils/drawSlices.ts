import { Vec2 } from "@/utils/math";
import { WeaponSkin } from "@/weapons/WeaponSkin";

export type Slash = {
  x: number;
  y: number;
  angle: number;
  frame: number;
  life: number;
  flipX: boolean;
};

export const slashes: Slash[] = [];

export function spawnSlash(
  x: number,
  y: number,
  angle: number,
  flipX: boolean
) {
  slashes.push({
    x,
    y,
    angle,
    frame: 0,
    life: 1,
    flipX,
  });
}
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
  ctx.globalCompositeOperation = "lighter";

  for (let i = slices.length - 1; i >= 0; i--) {
    const s = slices[i];

    ctx.strokeStyle = `rgba(180,220,255,${s.life})`;
    ctx.shadowColor = "rgba(180,220,255,0.8)";
    ctx.shadowBlur = 20;
    ctx.lineWidth = 8 * s.life;

    ctx.beginPath();
    ctx.moveTo(s.start.x, s.start.y);
    ctx.lineTo(s.end.x, s.end.y);
    ctx.stroke();

    s.life -= 0.08;
    if (s.life <= 0) slices.splice(i, 1);
  }

  ctx.globalCompositeOperation = "source-over";
}

export function drawSlashes(
  ctx: CanvasRenderingContext2D,
  deltaTime: number,
  weaponSkin: WeaponSkin
) {
  const { slashProp } = weaponSkin;
  const img = slashProp.sprite;
  if (!img || !img.complete) return;

  for (let i = slashes.length - 1; i >= 0; i--) {
    const s = slashes[i];
    const frameIndex = Math.floor(s.frame);

    if (frameIndex >= slashProp.FCount) {
      slashes.splice(i, 1);
      continue;
    }

    ctx.save();
    ctx.translate(s.x, s.y);
    ctx.rotate(s.angle);
    if (s.flipX) {
      ctx.scale(-1, 1);
    }
    ctx.imageSmoothingEnabled = false;
    const { x, y } = weaponSkin.getSlashCoordinate(frameIndex, slashProp);

    ctx.drawImage(
      img,
      x,
      y,
      slashProp.FWidth,
      slashProp.FHeight,
      -slashProp.FWidth / 2,
      -slashProp.FHeight / 2,
      slashProp.FWidth * 2,
      slashProp.FHeight * 2
    );

    ctx.restore();
    s.frame += slashProp.speed * deltaTime;
  }
}
