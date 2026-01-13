import { CollectibleKind, DamageShape, gameEvents } from "@/game/GameEvents";
import { resolveHit } from "@/utils/math";

export type Collectible = {
  id: string;
  position: { x: number; y: number };
  radius: number;
  kind: CollectibleKind;
  life: number;
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
  life: number = 1
): Collectible {
  return {
    id: crypto.randomUUID(),
    position,
    radius,
    kind,
    life,
  };
}

export function spawnCollectibles(
  kind: CollectibleKind,
  value: any
): Collectible[] {
  switch (kind) {
    case "SOUL":
      console.log(value);
      return Array.from({ length: value.amount }).map(() =>
        createCollectible(
          "SOUL",
          { x: window.innerWidth / 2, y: window.innerHeight / 2 },
          30,
          5
        )
      );
  }
}

export function updateCollectibles(list: Collectible[], dt: number) {
  const remaining: Collectible[] = [];
  list.map((c) => {
    const rt = c.life - dt;
    c.life = rt;
    if (rt <= 0) {
      return;
    }

    remaining.push(c);
  });

  return remaining;
}

export function applyCollectibleHit(list: Collectible[], shape: DamageShape) {
  const collected: string[] = [];

  const remaining = list.filter((c) => {
    const hit = resolveHit(shape, c);

    if (hit) {
      eventsToEmit.push({
        type: "COLLECTIBLE_COLLECTED",
        kind: c.kind,
        value: onHit[c.kind](c),
      });
      collected.push(c.id);
    }
    return !hit;
  });

  return { remaining, collected };
}

export function emitQueuedCollectibleEvents() {
  if (eventsToEmit.length > 0) {
    eventsToEmit.map((e) => gameEvents.emit(e));
    eventsToEmit = [];
  }
}
