export type GameData = {
  souls: number;
  masterVolume: number;
  sfxVolume: number;
  playerName: string;
};

const DEFAULT_DATA: GameData = {
  souls: 0,
  masterVolume: 0.8,
  sfxVolume: 0.8,
  playerName: "Player",
};

const KEY = "HAND_RITUAL_SAVE";

class GameStore {
  private data: GameData;

  constructor() {
    if (typeof window === "undefined") {
      this.data = DEFAULT_DATA;
      return;
    }

    const raw = localStorage.getItem(KEY);
    this.data = raw ? JSON.parse(raw) : DEFAULT_DATA;
  }

  private save() {
    localStorage.setItem(KEY, JSON.stringify(this.data));
  }

  get<K extends keyof GameData>(key: K) {
    return this.data[key];
  }

  set<K extends keyof GameData>(key: K, value: GameData[K]) {
    this.data[key] = value;
    this.save();
  }

  addSouls(amount: number) {
    this.data.souls += amount;
    this.save();
  }
}

export const gameStore = new GameStore();
