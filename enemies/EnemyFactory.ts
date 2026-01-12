import { Enemy, EnemyType } from "./EnemyTypes";
import { ENEMY_CONFIG } from "./EnemyConfig";

const bulidEnemy = {
  [EnemyType.Ground]: createGroundEnemy,
  [EnemyType.Flying]: createFlyEnemy,
};

export function createEnemy(
  type: EnemyType,
  screen: { w: number; h: number }
): Enemy {
  const id = crypto.randomUUID();

  return bulidEnemy[type]({ id, type, screen });
}

type EnemyProps = {
  id: string;
  type: EnemyType;
  screen: { w: number; h: number };
};

function createGroundEnemy({ id, type, screen }: EnemyProps): Enemy {
  const data =
    ENEMY_CONFIG.ground[Math.floor(Math.random() * ENEMY_CONFIG.ground.length)];

  const fromLeft = Math.random() > 0.5;

  return {
    id,
    type,
    sprite: data.sprite,
    hp: data.hp,
    position: {
      x: fromLeft ? -120 : screen.w + 120,
      y: screen.h - 160,
    },
    velocity: {
      x: fromLeft ? data.speed : -data.speed,
      y: 0,
    },
  };
}

function createFlyEnemy({ id, type, screen }: EnemyProps): Enemy {
  const data =
    ENEMY_CONFIG.flying[Math.floor(Math.random() * ENEMY_CONFIG.flying.length)];

  const targetX = screen.w / 2;
  const positionX = Math.random() * screen.w;

  return {
    id,
    type,
    sprite: data.sprite,
    hp: data.hp,
    position: {
      x: positionX,
      y: -120,
    },
    velocity: {
      x: (targetX - positionX) * 0.05,
      y: data.speed,
    },
  };
}
