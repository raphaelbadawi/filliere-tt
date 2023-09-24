import { ReactNode } from "react";

export default function Face({ children, flipped }: { children: ReactNode, flipped: boolean }) {
    return <div
        className="absolute w-full h-full bg-foreground flex cursor-pointer rounded-xl shadow-primary shadow-2xl transition-all duration-1000"
        style={{
            transform: `rotateY(${flipped ? "180deg" : "0deg"})`,
            backfaceVisibility: "hidden",
        }}>{children}</div>
}