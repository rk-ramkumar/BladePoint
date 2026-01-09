import { FilesetResolver, HandLandmarker, HandLandmarkerResult } from "@mediapipe/tasks-vision"
import { useEffect, useRef } from "react"

type Props = {
    setHandResults: () => void
    pause: boolean
    canvasRef: any
}
const HAND_CONNECTIONS: Array<[number, number]> = [
    // Thumb
    [0, 1], [1, 2], [2, 3], [3, 4],

    // Index
    [0, 5], [5, 6], [6, 7], [7, 8],

    // Middle
    [0, 9], [9, 10], [10, 11], [11, 12],

    // Ring
    [0, 13], [13, 14], [14, 15], [15, 16],

    // Pinky
    [0, 17], [17, 18], [18, 19], [19, 20],

    // Palm connections
    [5, 9], [9, 13], [13, 17]
];

const HandRecognizer = ({ setHandResults, pause, canvasRef }: Props) => {
    const videoRef = useRef<HTMLVideoElement>(null)
    const streamRef = useRef<MediaStream | null>(null);
    const rafRef = useRef<number | null>(null);

    useEffect(() => {
        initialization()

        return () => {
            stopCamera()

            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        }
    }, [])

    useEffect(() => {
        if (pause) {
            stopCamera();
        } else {
            startCamera();
        }
    }, [pause])

    const initialization = async () => {
        if (!videoRef.current) return;

        await startCamera();
        const video = videoRef.current;
        await new Promise<void>((res) => {
            video.onloadedmetadata = () => res();
        });
        syncCanvasWithVideo(video)
        const handLandmarker = await initModel()
        startDetection(handLandmarker, video);
    }

    function startDetection(handLandmarker: HandLandmarker, video: HTMLVideoElement) {
        const loop = () => {
            if (!pause && video.readyState >= 2) {
                const result = handLandmarker.detectForVideo(video, Date.now());
                drawHands(result)
                processDetection(result);
            }
            rafRef.current = requestAnimationFrame(loop);
        };

        loop();
    }

    async function startCamera() {
        if (streamRef.current) return;

        const stream = await navigator.mediaDevices.getUserMedia({ video: true })
        streamRef.current = stream;

        if (videoRef.current) {
            const video = videoRef.current;
            video.srcObject = stream;
            video.addEventListener("loadeddata", () => {
                video.play();
            })
        }
    }

    function stopCamera() {
        streamRef.current?.getTracks().forEach(track => track.stop());
        streamRef.current = null;

        if (videoRef.current) {
            videoRef.current.srcObject = null;
        }
    }

    function syncCanvasWithVideo(video: HTMLVideoElement) {
        const canvas = canvasRef.current;
        if (!canvas) return;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        console.log(canvas.width, canvas.height)
    }

    function drawHands(result: HandLandmarkerResult) {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (const landmarks of result.landmarks) {
            // Draw connections
            for (const [start, end] of HAND_CONNECTIONS) {
                const a = landmarks[start];
                const b = landmarks[end];

                ctx.beginPath();
                ctx.moveTo(a.x * canvas.width, a.y * canvas.height);
                ctx.lineTo(b.x * canvas.width, b.y * canvas.height);
                ctx.strokeStyle = "lime";
                ctx.lineWidth = 2;
                ctx.stroke();
            }

            // Draw points
            for (const point of landmarks) {
                ctx.beginPath();
                ctx.arc(
                    point.x * canvas.width,
                    point.y * canvas.height,
                    4,
                    0,
                    Math.PI * 2
                );
                ctx.fillStyle = "red";
                ctx.fill();
            }
        }
    }

    return <video
        ref={videoRef}
        className={`relative rounded-md overflow-hidden border border-white/20 shadow-[0_0_20px_rgba(0,255,0,0.3)] transform scale-x-[-1] ${pause ? "hidden" : "block"}`}
        playsInline
        muted
    />


}

export default HandRecognizer

async function initModel() {
    const vision = await FilesetResolver.forVisionTasks(
        // path/to/wasm/root
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
    );
    const handLandmarker = await HandLandmarker.createFromOptions(
        vision,
        {
            baseOptions: {
                modelAssetPath: "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
                delegate: "GPU"
            },
            numHands: 2,
            runningMode: "VIDEO"
        });

    return handLandmarker
}



function processDetection(detection: HandLandmarkerResult) {
    console.log(detection);
}

