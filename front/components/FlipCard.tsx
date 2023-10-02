"use client";

import { useState } from "react";
import Face from "./FlipCardFace";
import useMediaQuery from "@/utils/useMediaQuery";
import ImageOverlay from "./ImageOverlay";

export default function FlipCard({ title, caption, image, text, width, height }: { title: string, caption: string, image: string, text: string, width: string, height: string }) {
    const isDesktop = useMediaQuery('(min-width: 960px)');
    const [flipped, setFlipped] = useState(false);
    const toggleFlip = () => setFlipped(!flipped);

    return (
        <div className="flip-card relative flex-grow transition-all" style={{ opacity: isDesktop === null ? 0 : 100, maxWidth: isDesktop ? "50%" : "100%", minWidth: width, minHeight: height }} onClick={toggleFlip}>
            <Face flipped={flipped} reverse={false}>
                <div className="z-10 w-full face-content">
                    <p className="z-10 backdrop-blur-xl overflow-hidden text font-semibold text-5xl text-center text-foreground p-4">{title}</p>
                    <hr className="border-t-4" />
                    <p className="z-10 overflow-hidden text font-semibold text-3xl text-foreground p-4">{caption}</p>
                </div>
                <ImageOverlay reverse={false} image={image} color="bg-primary" />
            </Face>
            <Face flipped={!flipped} reverse={true}><p className="z-10 face-content overflow-hidden text text-foreground p-4">{text}</p><ImageOverlay reverse={true} image={image} color="bg-accent" /></Face>
        </div>
    );
}
