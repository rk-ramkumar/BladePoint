export type GameData = {
  souls: number;
  masterVolume: number;
  sfxVolume: number;
  playerName: string;
};

export const DEFAULT_DATA: GameData = {
  souls: 0,
  masterVolume: 0.8,
  sfxVolume: 0.8,
  playerName: "Player",
};

const KEY = "HAND_OF_RUIN_SAVE";

class GameStore {
  private data: GameData = DEFAULT_DATA;

  load(): GameData {
    if (typeof window === "undefined") return DEFAULT_DATA;

    const raw = localStorage.getItem(KEY);
    this.data = raw ? JSON.parse(raw) : DEFAULT_DATA;
    return this.data;
  }

  save(data: GameData) {
    this.data = data;
    localStorage.setItem(KEY, JSON.stringify(this.data));
  }

  get<K extends keyof GameData>(key: K) {
    return this.data[key];
  }

  set<K extends keyof GameData>(key: K, value: GameData[K]) {
    this.data[key] = value;
    this.save(this.data);
  }
  getData() {
    return this.data;
  }
}

export const gameStore = new GameStore();
