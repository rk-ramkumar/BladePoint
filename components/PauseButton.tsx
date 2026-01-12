import { Pause, Play } from "lucide-react";

type Props = {
    paused: boolean;
    onToggle: () => void;
};

export function PauseButton({ paused, onToggle }: Props) {
    return (
        <button type="button" onClick={onToggle} className="pointer-events-auto absolute top-4 left-6">
            <div className="hover:scale-110 transition">
                {paused
                    ? <Play size={42} className=" text-green-500 animate-bounce" />
                    : <Pause size={42} />
                }
            </div>
        </button>
    );
}
