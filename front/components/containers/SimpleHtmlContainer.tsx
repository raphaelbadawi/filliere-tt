export default function SimpleHtmlContainer({ color = "white", contentHtml = "" }: { color?: string, contentHtml: string }) {
    return <div dangerouslySetInnerHTML={{ __html: contentHtml }} className={
        `prose prose-invert flex flex-col gap-3 w-full mt-4 mx-auto px-10 py-6 rounded bg-gradient-to-r from-black to-${color}`}>
    </div>
}