export default function Spinnner({ height = "2rem", width = "2rem", thickness = "4px", addedClasses = "" }: { height: string, width: string, thickness: string, addedClasses: string }) {
    return (
        <div
            style={{ minHeight: height, height: height, width: width, borderWidth: thickness }}
            className={`inline-block animate-spin m-auto rounded-full border-solid border-current border-r-transparent align-[-0.125em] text-accent motion-reduce:animate-[spin_1.5s_linear_infinite] ${addedClasses}`}
            role="status">
            <span
                className="!absolute !m-h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
            ></span>
        </div>
    );
}
