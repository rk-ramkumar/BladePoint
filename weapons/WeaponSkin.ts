export type WeaponSkin = {
  id: string;
  image: string;
  size: { width: number; height: number };
  pivot: {
    x: number; // grip position inside the image
    y: number;
  };
   getRotation: (hand: any) => number;
};
