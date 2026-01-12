import { NormalizedLandmark } from "@mediapipe/tasks-vision";
import { Vec2 } from "@/utils/math";

const PINCH_THRESHOLD = 0.04;

function dist(a: any, b: any) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}

export type GestureIntent = {
  aimPosition: Vec2;
  triggerDown: boolean;
  triggerPressed: boolean;
  triggerReleased: boolean;
  handedness: "left" | "right";
  hand: NormalizedLandmark[];
};

export function getGestureIntent(
  hand: NormalizedLandmark[],
  prevPinch: boolean,
  handedness: any
): GestureIntent {
  const pinch = dist(hand[4], hand[8]) < PINCH_THRESHOLD;

  return {
    aimPosition: {
      x: (1 - hand[8].x) * window.innerWidth,
      y: hand[8].y * window.innerHeight,
    },
    triggerDown: pinch,
    triggerPressed: pinch && !prevPinch,
    triggerReleased: !pinch && prevPinch,
    handedness,
    hand,
  };
}

export function isHandClosed(landmarks: any[]) {
  return landmarks[8].y > landmarks[6].y && landmarks[12].y > landmarks[10].y;
}
