
import getSingle from "@/services/getSingle";
import SimpleHtmlContainer from '@/components/containers/SimpleHtmlContainer';
import parseMarkdown from "@/utils/parseMarkdown";

export default async function Practical() {
    const { data: practicalObject } = await getSingle("practical");
    const contentHtml = await parseMarkdown(practicalObject.attributes.content);
    return (
        <section id="practical" className="w-full">
            <SimpleHtmlContainer contentHtml={contentHtml} />
        </section>

    )
}
