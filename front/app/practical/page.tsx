import { remark } from 'remark';
import html from 'remark-html';
import getSingle from "@/services/getSingle";
import SimpleHtmlContainer from '@/components/containers/SimpleHtmlContainer';

export default async function Practical() {
    const { data: practicalObject } = await getSingle("practical");
    const processedContent = await remark()
        .use(html)
        .process(practicalObject.attributes.content || "")
    const contentHtml = processedContent.toString().replaceAll("<a href", "<a target=\"_blank\" href");
    return (
        <section id="practical" className="w-full">
            <SimpleHtmlContainer contentHtml={contentHtml} />
        </section>

    )
}
