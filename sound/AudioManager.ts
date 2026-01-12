"use client";

export type SoundKey =
  | "KATANA_SWING"
  | "ENEMY_SCREAM"
  | "ENEMY_HIT"
  | "ENEMY_DEATH";

type SoundPool = HTMLAudioElement[];

class AudioManager {
  private sounds: Record<SoundKey, SoundPool> = {} as any;
  private poolIndex: Record<SoundKey, number> = {} as any;

  masterVolume = 1;
  sfxVolume = 1;

  private initialized = false;

  init() {
    if (this.initialized) return;
    this.initialized = true;

    this.load("KATANA_SWING", "/assets/audio/katana-swing.mp3");
    this.load("ENEMY_SCREAM", "/assets/audio/enemy-scream.mp3");
    this.load("ENEMY_HIT", "/assets/audio/enemy-hit.mp3");
    this.load("ENEMY_DEATH", "/assets/audio/enemy-death.mp3");
  }

  private load(key: SoundKey, src: string, poolSize = 5) {
    this.sounds[key] = Array.from({ length: poolSize }, () => {
      const a = new Audio(src);
      a.preload = "auto";
      return a;
    });
    this.poolIndex[key] = 0;
  }

  play(key: SoundKey) {
    const pool = this.sounds[key];
    if (!pool) return;

    const index = this.poolIndex[key];
    const audio = pool[index];

    audio.volume = this.masterVolume * this.sfxVolume;
    audio.currentTime = 0;
    audio.play().catch(() => {});

    this.poolIndex[key] = (index + 1) % pool.length;
  }

  setMaster(v: number) {
    this.masterVolume = v;
  }

  setSfx(v: number) {
    this.sfxVolume = v;
  }
}

export const audioManager = new AudioManager();
