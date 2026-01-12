const defaultProps = {
  sprite: "/assets/demons/ground_demon_1.png",
  hp: 1,
  speed: 60,
  damage: 5,
  width: 80,
  deathTimer: 0.5,
};

export const ENEMY_CONFIG = {
  ground: [
    { ...defaultProps },
    {
      ...defaultProps,
      sprite: "/assets/demons/ground_demon_2.png",
      hp: 3,
      speed: 20,
      damage: 15,
      width: 140,
    },
  ],
  flying: [
    {
      ...defaultProps,
      sprite: "/assets/demons/fly_demon_1.png",
      width: 140,
    },
    {
      ...defaultProps,
      sprite: "/assets/demons/fly_demon_2.png",
      speed: 90,
      damage: 1,
      width: 140,
    },
  ],
};
