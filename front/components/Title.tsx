import "./Title.css";

export default function Title({ text }: { text: string }) {
    return (
        <>
            <h1 data-text={text} className="my-4 text-5xl font-bold text-center text-title">{text}</h1>
        </>
    );
}   