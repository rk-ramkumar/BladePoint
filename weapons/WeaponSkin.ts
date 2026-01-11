export type WeaponSkin = {
  id: string;
  image: string;
  size: { width: number; height: number };
  pivot: {
    x: number; // grip position inside the image
    y: number;
  };
  getRotation: (hand: any) => number;
  getSlashCoordinate: (
    frameIndex: number,
    props: slashObject
  ) => { x: number; y: number };
  slashProp: slashObject;
};

export type slashObject = {
  sprite: HTMLImageElement | null;
  spriteSrc: string;
  FWidth: number;
  FHeight: number;
  FCount: number;
  speed: number;
};
