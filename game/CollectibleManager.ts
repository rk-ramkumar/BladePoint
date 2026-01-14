import { CollectibleKind, DamageShape, gameEvents } from "@/game/GameEvents";
import { resolveHit, Vec2 } from "@/utils/math";

export type CollectibleState = "ALIVE" | "HIT" | "COLLECTED";

export type Collectible = {
  id: string;
  position: Vec2;
  radius: number;
  kind: CollectibleKind;
  state: CollectibleState;
  velocity: Vec2;
  life: number; // Total lifetime in seconds
  hitTimer?: number; // Timer for hit animation (seconds)
  deathTimer?: number;
};

let eventsToEmit: any[] = [];

const onHit: any = {
  SOUL: onSoulHit,
};

function onSoulHit(c: Collectible) {
  return 1;
}

export function createCollectible(
  kind: CollectibleKind,
  position: { x: number; y: number },
  radius: number = 18,
  life: number = 5
): Collectible {
  const velocity = {
    x: ((Math.random() - 0.5) * 440) / 5.0,
    y: (-80 - Math.random() * 180) / 5.0,
  };
  return {
    id: crypto.randomUUID(),
    position,
    velocity,
    radius,
    kind,
    state: "ALIVE",
    life,
    deathTimer: life,
  };
}

export function spawnCollectibles(
  kind: CollectibleKind,
  value: any
): Collectible[] {
  switch (kind) {
    case "SOUL":
      return Array.from({ length: value.amount }).map(() =>
        createCollectible(
          "SOUL",
          { x: window.innerWidth / 2, y: window.innerHeight / 2 },
          30,
          5
        )
      );
    default:
      return [];
  }
}

export function updateCollectibles(
  list: Collectible[],
  dt: number
): Collectible[] {
  const remaining: Collectible[] = [];

  list.forEach((c) => {
    let newCollectible = { ...c };

    switch (c.state) {
      case "HIT":
        if (c.hitTimer !== undefined) {
          newCollectible.hitTimer = c.hitTimer - dt;
          if (newCollectible.hitTimer <= 0) {
            newCollectible.state = "COLLECTED";
          } else {
            remaining.push(newCollectible);
          }
        }
        break;

      case "ALIVE":
        if (c.deathTimer !== undefined) {
          newCollectible.deathTimer = c.deathTimer - dt;

          newCollectible.position = {
            x: c.position.x + c.velocity.x * dt,
            y: c.position.y + c.velocity.y * dt,
          };

          if (newCollectible.deathTimer <= 0) {
            newCollectible.state = "COLLECTED";
          } else {
            remaining.push(newCollectible);
          }
        }
        break;

      case "COLLECTED":
        break;
    }
  });

  return remaining;
}

export function applyCollectibleHit(list: Collectible[], shape: DamageShape) {
  const collected: string[] = [];
  const remaining: Collectible[] = [];

  list.forEach((c) => {
    if (c.state === "COLLECTED") {
      return;
    }

    const hit = resolveHit(shape, c);

    if (hit && c.state === "ALIVE") {
      const hitCollectible = {
        ...c,
        state: "HIT" as CollectibleState,
        hitTimer: 0.3,
      };

      eventsToEmit.push({
        type: "COLLECTIBLE_COLLECTED",
        kind: c.kind,
        value: onHit[c.kind](c),
      });

      collected.push(c.id);
      remaining.push(hitCollectible);
    } else {
      remaining.push(c);
    }
  });

  return { remaining, collected };
}

export function emitQueuedCollectibleEvents() {
  if (eventsToEmit.length > 0) {
    eventsToEmit.map((e) => gameEvents.emit(e));
    eventsToEmit = [];
  }
}

export function getRenderableCollectibles(list: Collectible[]) {
  return list.filter((c) => c.state !== "COLLECTED");
}

export function shouldRemoveCollectible(c: Collectible) {
  return c.state === "COLLECTED";
}
