"use client";

import { gameStore } from "@/game/GameStore";

export type SoundType = "bgm" | "sfx" | "master";

export type SoundKey =
  | "KATANA_SWING"
  | "ENEMY_SCREAM"
  | "ENEMY_HIT"
  | "ENEMY_DEATH"
  | "RELIC_HIT"
  | "ENEMY_BURN"
  | "HOME_BG";

type SoundPool = HTMLAudioElement[];

class AudioManager {
  private sounds: Record<SoundKey, SoundPool> = {} as any;
  private poolIndex: Record<SoundKey, number> = {} as any;
  private bgSounds: Record<SoundKey, HTMLAudioElement> = {} as any;

  masterVolume = 1;
  sfxVolume = 1;
  bgmVolume = 1;

  private initialized = false;

  init() {
    if (this.initialized) return;
    this.initialized = true;

    this.load("KATANA_SWING", "/assets/audio/katana-swing.mp3");
    this.load("ENEMY_SCREAM", "/assets/audio/enemy-scream.mp3");
    this.load("ENEMY_HIT", "/assets/audio/enemy-hit.mp3");
    this.load("ENEMY_DEATH", "/assets/audio/enemy-death.mp3");
    this.load("ENEMY_BURN", "/assets/audio/burn-flesh.mp3");
    this.load("RELIC_HIT", "/assets/audio/relic-hit.mp3");
    this.load("HOME_BG", "/assets/audio/mystery-music.mp3", "bgm", true);
  }

  private load(
    key: SoundKey,
    src: string,
    type: SoundType = "master",
    loop: boolean = false,
    poolSize = 5
  ) {
    if (type === "bgm") {
      const a = new Audio(src);
      a.loop = loop;
      a.preload = "auto";
      this.bgSounds[key] = a;
      return;
    }
    this.sounds[key] = Array.from({ length: poolSize }, () => {
      const a = new Audio(src);
      a.loop = loop;
      a.preload = "auto";
      return a;
    });
    this.poolIndex[key] = 0;
  }

  play(key: SoundKey, type: "bgm" | "sfx" | "master" = "master") {
    if (type === "bgm") {
      const audio = this.bgSounds[key];
      if (!audio) return;

      audio.volume = this.masterVolume * this.bgmVolume;
      audio.play().catch((e) => {
        console.log("Audio Error", e);
      });

      return;
    }

    const pool = this.sounds[key];
    if (!pool) return;

    const index = this.poolIndex[key];
    const audio = pool[index];

    audio.volume = this.masterVolume * this.sfxVolume;
    audio.currentTime = 0;
    audio.play().catch((e) => {
      console.log("Audio Error", e);
    });

    this.poolIndex[key] = (index + 1) % pool.length;
  }

  setMaster(v: number) {
    this.masterVolume = v;
    gameStore.set("masterVolume", v);

    Object.keys(this.sounds).map((key) => {
      this.reset(key as SoundKey, v);
    });
    Object.keys(this.bgSounds).map((key) => {
      this.reset(key as SoundKey, this.bgmVolume, "bgm");
    });
  }

  reset(key: SoundKey, volume: number, type: SoundType = "master") {
    switch (type) {
      case "bgm":
        const audio = this.bgSounds[key];
        if (!audio) break;

        audio.volume = volume * this.masterVolume;
        this.bgSounds[key] = audio;
        break;

      default:
        const pool = this.sounds[key];
        if (!pool) break;

        this.sounds[key] = pool.map((a) => {
          a.volume =
            volume * (type === "master" ? this.sfxVolume : this.masterVolume);
          return a;
        });
    }
  }

  setSfx(v: number) {
    this.sfxVolume = v;
    gameStore.set("sfxVolume", v);
  }

  setBgm(v: number) {
    this.bgmVolume = v;
    gameStore.set("bgmVolume", v);

    Object.keys(this.bgSounds).map((key) => {
      this.reset(key as SoundKey, v, "bgm");
    });
  }

  getVolume() {
    return {
      sfx: this.sfxVolume,
      master: this.masterVolume,
      bgm: this.bgmVolume,
    };
  }
}

export const audioManager = new AudioManager();
