'use client';
import { useEffect } from "react";

export default function CursorHand() {
    useEffect(() => {
        document.body.style.cursor = "url(/assets/ui/hand-cursor.png), auto";
        return () => {
            document.body.style.cursor = "auto";
        };
    }, []);

    return null;
}
