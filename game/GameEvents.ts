import { Vec2 } from "@/utils/math";

export type DamageShape =
  | { type: "LINE"; start: Vec2; end: Vec2; radius: number }
  | { type: "POINT"; position: Vec2; radius: number }
  | { type: "CIRCLE"; center: Vec2; radius: number };

export type CollectibleKind = "SOUL";

export type GameEvent =
  | { type: "DAMAGE"; shape: DamageShape; damage: number; source: "PLAYER" }
  | { type: "ENEMY_ATTACK"; damage: number; sourceId: string }
  | { type: "PLAYER_HIT"; damage: number; hp: number }
  | { type: "ENEMY_KILLED"; enemyId: string }
  | { type: "SPAWN_COLLECTIBLE"; kind: CollectibleKind; value: any }
  | { type: "COLLECTIBLE_COLLECTED"; kind: CollectibleKind; value: any }
  | { type: "GAME_OVER" }
  | { type: "ENEMY_NEAR_RELIC"; intensity: number }
  | { type: "PLAY_SOUND"; sound: "KATANA_SWING"; volume?: number };

type Listener<T extends GameEvent["type"]> = (
  event: Extract<GameEvent, { type: T }>
) => void;

class GameEventBus {
  private listeners: {
    [K in GameEvent["type"]]?: Listener<K>[];
  } = {};

  on<T extends GameEvent["type"]>(type: T, listener: Listener<T>) {
    this.listeners[type] ??= [];
    this.listeners[type]!.push(listener);

    return () => {
      this.listeners[type] = this.listeners[type]?.filter(
        (l) => l !== listener
      ) as any;
    };
  }

  emit(event: GameEvent) {
    this.listeners[event.type]?.forEach((l) => l(event as any));
  }
}

export const gameEvents = new GameEventBus();
