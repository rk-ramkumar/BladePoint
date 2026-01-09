import { FilesetResolver, HandLandmarker, HandLandmarkerResult } from "@mediapipe/tasks-vision"
import { useEffect, useRef } from "react"

type Props = {
    setHandResults: () => void
    pause: boolean
}
const HandRecognizer = ({ setHandResults, pause }: Props) => {
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
        const handLandmarker = await initModel()
        startDetection(handLandmarker, video);
    }

    function startDetection(handLandmarker: HandLandmarker, video: HTMLVideoElement) {
        const loop = () => {
            if (!pause && video.readyState >= 2) {
                const result = handLandmarker.detectForVideo(video, Date.now());
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
            videoRef.current.srcObject = stream;
            await videoRef.current.play();
        }
    }

    function stopCamera() {
        streamRef.current?.getTracks().forEach(track => track.stop());
        streamRef.current = null;

        if (videoRef.current) {
            videoRef.current.srcObject = null;
        }
    }


    return <video ref={videoRef} className={`transform scale-x-[-1] ${pause ? "hidden" : "block"}`} playsInline muted />

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

