import { ReactNode, useEffect, useRef, useState } from "react";

export default function Face({ children, reverse, flipped }: { children: ReactNode, reverse: boolean, flipped: boolean }) {
    const [overflow, setOverflow] = useState(false);
    const [open, setOpen] = useState(false);
    let originalHeight = useRef(0);
    let totalHeight = useRef(0);
    const togglerOffset = useRef(0);
    const faceRef = useRef(null);
    const togglerRef = useRef(null);

    const isOverflowActive = (element: HTMLElement | null) => {
        if (!element) {
            return false;
        }
        const targetElement: HTMLElement | null = element.querySelector(".face-content");
        if (!targetElement) {
            return false;
        }
        totalHeight.current = targetElement.scrollHeight;
        return originalHeight.current < targetElement.scrollHeight;
    };

    const computeFixedHeights = () => {
        if (!faceRef.current) {
            return;
        }
        const faceElement: HTMLElement = faceRef.current;
        const cardElement: HTMLElement | null = faceElement.closest(".flip-card");
        if (!cardElement) {
            return;
        }
        const heightAttribute = cardElement.dataset.originalHeight;
        if (!heightAttribute) {
            return;
        }
        const cardStyle = getComputedStyle(cardElement);
        const cardFontSize = cardStyle.getPropertyValue("font-size");
        originalHeight.current = parseInt(heightAttribute) * parseInt(cardFontSize);
        const togglerElement: HTMLElement | null = togglerRef.current;
        if (!togglerElement) {
            return;
        }
        const togglerStyle = getComputedStyle(togglerElement);
        const togglerFontSize = togglerStyle.getPropertyValue("font-size");
        togglerOffset.current = parseInt(togglerFontSize) * 2;
    }

    useEffect(() => {
        computeFixedHeights();
    }, []);

    useEffect(() => {
        if (!faceRef.current) {
            return;
        };
        setOverflow(isOverflowActive(faceRef.current));
        const listener = () => setOverflow(isOverflowActive(faceRef.current));
        window.addEventListener("resize", listener);
        return () => window.removeEventListener("resize", listener);
    }, [flipped]);

    const showMore = (more: boolean = true) => {
        if (!faceRef.current) {
            return;
        }
        const faceElement: HTMLElement = faceRef.current;
        const cardElement: HTMLElement | null = faceElement.closest(".flip-card");
        if (!cardElement) {
            return;
        }
        let targetHeight = more ? totalHeight.current + togglerOffset.current : originalHeight.current;
        cardElement.style.minHeight = targetHeight + "px";
        setOpen(more);
        setTimeout(() => setOverflow(isOverflowActive(faceRef.current)), 300);
    }

    const togglerHandler = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        showMore(!open);
    };

    return (<div
        ref={faceRef}
        className={`${open ? "open" : "closed"} absolute w-full h-full flex ${open ? "cursor-not-allowed" : "cursor-pointer"} rounded-xl overflow-hidden ${reverse ? "shadow-accent" : "shadow-primary"} shadow-2xl transition-all duration-1000`}
        style={{
            transform: `rotateY(${flipped ? "180deg" : "0deg"})`,
            backfaceVisibility: "hidden",
        }}>
        {children}
        {<a onClick={togglerHandler} ref={togglerRef} className={`${overflow || open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"} cursor-pointer z-10 bg-background hover:bg-backlight transition-all text-foreground p-2 rounded absolute bottom-2 left-1/2 -translate-x-1/2`}>{open ? "Moins" : "Plus"}</a>}
    </div>);
}