export type Background = {
  id: string;
  name: string;
  image: string;
  locked?: boolean;
};

export const BACKGROUNDS: Background[] = [
  {
    id: "park",
    name: "Green Park",
    image: "/assets/bg/green-park.jpg",
  },
  {
    id: "ruins",
    name: "Ancient Ruins",
    image: "/assets/bg/architecture-ruin.jpg",
  },
  {
    id: "mountain",
    name: "Frozen Peaks",
    image: "/assets/bg/mountain-range.jpg",
    locked: true,
  },
];
