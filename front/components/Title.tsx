export default function Title({ text }: { text: string }) {
    return (
        <h1 data-text={text} className="relative text-center max-w-[max-content] animate-gradient-text bg-gradient-to-r from-primary to-primary via-accent bg-clip-text text-transparent mb-6 text-6xl font-light m-auto">{text}</h1>
    );
}
