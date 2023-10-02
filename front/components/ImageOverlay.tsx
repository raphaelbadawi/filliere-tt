export default function ImageOverlay({ image, color, reverse }: { image: string, color: string, reverse: boolean }) {
    return (<div style={{ backgroundImage: `url(${image})` }} className={`absolute w-full h-full ${color} dark:bg-blend-color-burn grayscale invert dark:grayscale-0 dark:invert-0 brightness-50 dark:brightness-150 bg-cover ${reverse ? "-scale-x-100" : ""}`}></div>);
}