type SoundKey = "KATANA_SWING";

class AudioManager {
  private sounds: Record<SoundKey, HTMLAudioElement[]> = {
    KATANA_SWING: [],
  };

  private poolSize = 5;
  private initialized = false;

  init() {
    if (this.initialized) return;
    this.initialized = true;

    this.load("KATANA_SWING", "/assets/audio/katana-swing.mp3");
  }

  private load(key: SoundKey, src: string) {
    if (typeof window === "undefined") return;

    this.sounds[key] = Array.from({ length: this.poolSize }, () => {
      const a = new window.Audio(src);
      a.preload = "auto";
      return a;
    });
  }

  play(key: SoundKey, volume = 1) {
    const pool = this.sounds[key];
    if (!pool || pool.length === 0) return;

    const audio = pool.find((a) => a.paused) ?? pool[0];
    audio.currentTime = 0;
    audio.volume = volume;
    audio.play().catch(() => {});
  }
}

export const audioManager = new AudioManager();
