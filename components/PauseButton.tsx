import { Pause, Play } from "lucide-react";

type Props = {
    paused: boolean;
    onToggle: () => void;
};

export function PauseButton({ paused, onToggle }: Props) {
    return (
        <button type="button" onClick={onToggle} className="pointer-events-auto absolute top-6 right-6">
            <div className="hover:scale-110 transition">
                {paused
                    ? <Play className="w-12 h-12 text-green-500 animate-bounce" />
                    : <Pause className="w-12 h-12" />
                }
            </div>
        </button>
    );
}
