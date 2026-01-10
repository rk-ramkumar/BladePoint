import { isHandClosed } from "@/utils/gestures";
import { WeaponSkin } from "../WeaponSkin";

export const KatanaClean: WeaponSkin = {
  id: "katana_clean",
  image: "/assets/katana/KatanaClean.png",
  size: { width: 388, height: 232 },
  pivot: { x: 288, y: 45 },
  getRotation: getDefaultRotation,
};

export const KatanaBloody: WeaponSkin = {
  id: "katana_bloody",
  image: "/assets/katana/KatanaBloody.png",
  size: { width: 321, height: 184 },
  pivot: { x: 221, y: 144 },
  getRotation: getDefaultRotation,
};

function getDefaultRotation(hand: any) {
  if (!isHandClosed(hand)) {
    return 70;
  } else {
    return 0;
  }
}
