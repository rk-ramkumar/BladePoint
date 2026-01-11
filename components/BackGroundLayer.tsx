'use client';
export const BACKGROUNDS = [
    "/assets/bg/green-park.jpg",
    "/assets/bg/architecture-ruin.jpg",
    "/assets/bg/mountain-range.jpg"
];

type Props = {
    stage: number;
};

export default function BackgroundLayer({ stage }: Props) {
    const image = BACKGROUNDS[Math.min(stage, BACKGROUNDS.length - 1)];

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                zIndex: -100
            }}
        />
    );
}
