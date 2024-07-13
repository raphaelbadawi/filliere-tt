"use client";

import { useState } from "react";
import Face from "./FlipCardFace";
import ImageOverlay from "./ImageOverlay";

export default function FlipCard({ title, caption, image, text, width, height }: { title: string, caption: string, image: string, text: string, width: string, height: string }) {
    const [flipped, setFlipped] = useState(false);
    const toggleFlip = () => {
        if (document.querySelector(".flip-card .open")) {
            return;
        }
        setFlipped(!flipped)
    };

    return (
        <div className="flip-card relative flex-grow transition-all max-w-full lg:max-w-1/2" data-original-height={height} style={{minWidth: width, minHeight: height }} onClick={toggleFlip}>
            <Face flipped={flipped} reverse={false}>
                <div className="z-10 w-full face-content">
                    <ImageOverlay reverse={false} image={image} color="bg-darkPrimary" />
                    <h2 className="relative backdrop-blur-sm overflow-hidden text font-bold text-5xl text-center text-white p-4">{title}</h2>
                    <hr className="relative border-white border-t-4" />
                    <p style={{ textShadow: "black 10px 10px 10px" }} className="relative overflow-hidden text font-semibold text-3xl text-white opacity-75 p-4 whitespace-pre-wrap">{caption}</p>
                </div>
            </Face>
            <Face flipped={!flipped} reverse={true}><ImageOverlay reverse={true} image={image} color="bg-darkAccent" /><p style={{ textShadow: "black 10px 10px 10px" }} className="relative face-content overflow-hidden text-3xl text-white opacity-75 p-4 whitespace-pre-wrap">{text}</p></Face>
        </div>
    );
}
