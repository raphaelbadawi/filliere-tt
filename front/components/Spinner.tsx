export default function Spinnner() {
    return (
        <div
            style={{ minHeight: "2rem" }}
            className="inline-block h-8 w-8 animate-spin m-auto rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-accent motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status">
            <span
                className="!absolute !m-h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
            ></span>
        </div>
    );
}
