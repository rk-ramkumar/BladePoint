export type GameEvent =
  | { type: "ENEMY_ATTACK"; damage: number; sourceId: string }
  | { type: "PLAYER_HIT"; damage: number }
  | { type: "ENEMY_KILLED"; enemyId: string }
  | { type: "GAME_OVER" };

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
    console.log("Emiting", event);
    this.listeners[event.type]?.forEach((l) => l(event as any));
  }
}

export const gameEvents = new GameEventBus();
