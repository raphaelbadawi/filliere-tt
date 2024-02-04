export default function Title({ text }: { text: string }) {
    return (
        <>
            <h1 data-text={text} style={{ "--text-length": text.length } as React.CSSProperties} className="relative w-[max-content] before:absolute before:inset-0 before:animate-typewriter before:bg-background after:absolute after:inset-0 after:w-[0.05em] after:animate-caret after:bg-primary my-4 text-5xl font-mono font-thin m-auto text-primary">{text}</h1>
        </>
    );
}   