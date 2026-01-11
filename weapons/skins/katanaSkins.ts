import { isHandClosed } from "@/utils/gestures";
import { slashObject, WeaponSkin } from "../WeaponSkin";

const defaultSlashProp: slashObject = {
  sprite: null,
  spriteSrc: "/assets/effects/red-slash.png",
  FWidth: 128,
  FHeight: 128,
  FCount: 9,
  speed: 24,
};

export const KatanaClean: WeaponSkin = {
  id: "katana_clean",
  image: "/assets/katana/KatanaClean.png",
  size: { width: 388, height: 232 },
  pivot: { x: 288, y: 45 },
  getRotation(hand: any) {
    if (!isHandClosed(hand)) {
      return 90;
    } else {
      return 0;
    }
  },
  slashProp: {
    ...defaultSlashProp,
    FCount: 7,
  },
  getSlashCoordinate: getTwoRowCoordinate,
};

export const KatanaBloody: WeaponSkin = {
  id: "katana_bloody",
  image: "/assets/katana/KatanaBloody.png",
  size: { width: 321, height: 184 },
  pivot: { x: 221, y: 144 },
  getRotation: getDefaultRotation,
  slashProp: defaultSlashProp,
  getSlashCoordinate: getTwoRowCoordinate,
};

export function initSlashImage(skin: WeaponSkin) {
  const image = new Image();
  image.src = skin.slashProp.spriteSrc;
  skin.slashProp.sprite = image;
}

// Helpers
function getDefaultRotation(hand: any) {
  if (!isHandClosed(hand)) {
    return 70;
  } else {
    return 0;
  }
}

function getTwoRowCoordinate(
  frameIndex: number,
  props: slashObject
): { x: number; y: number } {
  return {
    x: (frameIndex % 5) * props.FWidth,
    y: frameIndex < 5 ? 0 : props.FHeight,
  };
}
