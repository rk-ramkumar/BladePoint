export function isHandClosed(landmarks: any[]) {
  return (
    landmarks[8].y > landmarks[6].y &&
    landmarks[12].y > landmarks[10].y
  );
}
