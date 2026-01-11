import { GestureIntent } from "@/utils/gestures";
import { slashObject, WeaponSkin } from "../WeaponSkin";

const defaultSlashProp: slashObject = {
  sprite: null,
  spriteSrc: "/assets/effects/slash-hit/red-slash.png",
  FWidth: 128,
  FHeight: 128,
  FCount: 9,
  speed: 24,
};

export const KatanaClean: WeaponSkin = {
  id: "katana_clean",
  image: "/assets/katana/KatanaClean.png",
  size: { width: 194, height: 116 },
  pivot: { x: 94, y: 45 },
  getRotation(intent: GestureIntent) {
    if (intent.triggerPressed) {
      return 0;
    } else {
      return 90;
    }
  },
  slashProp: {
    ...defaultSlashProp,
    spriteSrc: "/assets/effects/slash-hit/blue-slash.png",
    FCount: 7,
  },
  getSlashCoordinate: getTwoRowCoordinate,
};

export const KatanaBloody: WeaponSkin = {
  id: "katana_bloody",
  image: "/assets/katana/KatanaBloody.png",
  size: { width: 161, height: 92 },
  pivot: { x: 61, y: 64 },
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
function getDefaultRotation(intent: GestureIntent) {
  if (intent.triggerPressed) {
    return -120;
  } else {
    return 70;
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
