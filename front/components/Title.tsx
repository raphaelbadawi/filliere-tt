import "./Title.css";

export default function Title({ text }: { text: string }) {
    return (
        <>
            <h1 data-text={text} className="my-4 text-3xl lg:text-4xl xl:text-5xl text-center text-title">{text}</h1>
        </>
    );
}   