export default function SimpleHtmlContainer({ color = "primary", contentHtml = "" }: { color?: string, contentHtml: string }) {

    // We have to explicit the class name otherwise Tailwind will not add it to the bundle
    let borderColor = "border-primary";
    if (color == "accent") {
        borderColor = "border-accent";
    }

    return <div dangerouslySetInnerHTML={{ __html: contentHtml }} className={
        `prose dark:prose-invert prose-xl flex flex-col gap-2 w-full mx-auto p-4 my-4 rounded-3xl border-solid border-2 ${borderColor}`}>
    </div>
}