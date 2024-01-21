import { remark } from 'remark';
import html from 'remark-html';
import getSingle from "@/services/getSingle";

export default async function Pratical() {
    const { data: practicalObject } = await getSingle("practical");
    const processedContent = await remark()
        .use(html)
        .process(practicalObject.attributes.content || "")
    const contentHtml = processedContent.toString().replaceAll("<a href", "<a target=\"_blank\" href");
    return (
        <section id="practical" className="w-full">
            <div dangerouslySetInnerHTML={{__html: contentHtml}} className="prose prose-invert flex flex-col gap-3 w-full mt-4 mx-auto px-10 py-6 rounded bg-gradient-to-r from-black to-white">
            </div>
        </section>

    )
}
