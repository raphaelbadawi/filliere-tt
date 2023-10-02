import { ReactNode, useEffect, useRef, useState } from "react";

export default function Face({ children, reverse, flipped }: { children: ReactNode, reverse: boolean, flipped: boolean }) {
    const [overflow, setOverflow] = useState(false);
    const [toggled, setToggled] = useState(false);
    let originalHeight = useRef(0);
    let totalHeight = useRef(0);
    const faceRef = useRef(null);
    const isOverflowActive = (element: HTMLElement) => {
        const targetElement: HTMLElement|null = element.querySelector(".face-content");
        if (targetElement) {
            originalHeight.current = targetElement.offsetHeight;
            totalHeight.current = targetElement.scrollHeight;
            return targetElement.offsetHeight < targetElement.scrollHeight;
        }
        return false;
    };
    useEffect(() => {
        if (faceRef.current !== null && isOverflowActive(faceRef.current)) {
            setOverflow(true);
            return;
        }
        setOverflow(false);
    }, []);

    const togglerHandler = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        if (faceRef.current === null) {
            return;
        }
        const element: HTMLElement = faceRef.current;
        const targetElement: HTMLElement|null = element.closest(".flip-card");
        if (!targetElement) {
            return;
        }
        let targetHeight = toggled ? originalHeight.current : totalHeight.current + 24;
        targetElement.style.minHeight = targetHeight + "px";
        setToggled(!toggled);
    };

    return (<div
        ref={faceRef}
        className={`absolute w-full h-full flex cursor-pointer rounded-xl overflow-hidden ${reverse ? "shadow-accent" : "shadow-primary"} shadow-2xl transition-all duration-1000`}
        style={{
            transform: `rotateY(${flipped ? "180deg" : "0deg"})`,
            backfaceVisibility: "hidden",
        }}>
            {children}
            {overflow && <a onClick={togglerHandler} className={`z-10 bg-background text-foreground p-2 rounded absolute bottom-2 left-1/2 -translate-x-1/2`}>{toggled ? "Moins" : "Plus"}</a>}
        </div>);
}