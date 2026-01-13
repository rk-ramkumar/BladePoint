import { FilesetResolver, HandLandmarker } from "@mediapipe/tasks-vision";

let handLandmarker: HandLandmarker | null = null;

export async function loadGameAssets(onProgress: (p: number) => void) {
  let progress = 0;
  const step = (v: number) => {
    progress = Math.min(1, progress + v);
    onProgress(progress);
  };

  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
  );
  step(0.3);

  handLandmarker = await HandLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath:
        "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
      delegate: "GPU",
    },
    numHands: 1,
    runningMode: "VIDEO",
  });
  step(0.3);

  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  stream.getTracks().forEach((t) => t.stop());
  step(0.2);

  const ctx = new AudioContext();
  await ctx.resume();
  step(0.2);

  onProgress(1);
}

export function getHandLandmarker() {
  if (!handLandmarker) {
    throw new Error(
      "HandLandmarker not initialized. Call loadGameAssets first."
    );
  }
  return handLandmarker;
}
