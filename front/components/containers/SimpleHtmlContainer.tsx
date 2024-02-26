export default function SimpleHtmlContainer({ color = "primary", contentHtml = "" }: { color?: string, contentHtml: string }) {
    return <div dangerouslySetInnerHTML={{ __html: contentHtml }} className={
        `prose dark:prose-invert prose-xl flex flex-col gap-3 w-full mt-4 mx-auto px-10 py-6 rounded bg-gradient-to-r from-transparent via-${color} to-transparent`}>
    </div>
}