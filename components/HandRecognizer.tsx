import { useEffect, useRef } from "react"

type Props = {
    setHandResults: () => void
    pause: boolean
}
const HandRecognizer = ({ setHandResults, pause }: Props) => {
    const videoRef = useRef<HTMLVideoElement>(null)
    const streamRef = useRef<MediaStream | null>(null);


    useEffect(() => {
        initialization()

        return stopCamera
    }, [])

    useEffect(() => {
        if (pause) {
            stopCamera();
        } else {
            startCamera();
        }
    }, [pause])

    const initialization = async () => {
        await startCamera();
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


    return (

        pause
            ? (<div className="text-center"> Resume To Play</div>)
            : <video ref={videoRef} playsInline muted />
    )
}

export default HandRecognizer
