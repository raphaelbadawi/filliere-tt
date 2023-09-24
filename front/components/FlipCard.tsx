"use client";

import { useState } from "react";
import Face from "./FlipCardFace";

export default function FlipCard({ text, width, height }: { text: string, width: string, height: string }) {
    const [flipped, setFlipped] = useState(false);
    const toggleFlip = () => setFlipped(!flipped);

    return (
        <div className="relative flex-grow" style={{ minWidth: width, minHeight: height }} onClick={toggleFlip}>
            <Face flipped={flipped}><p className="text text-background p-4">{text}</p></Face>
            <Face flipped={!flipped}><p className="text text-background p-4">Image</p></Face>
        </div>
    );
}
