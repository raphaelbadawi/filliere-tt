
import getSingle from "@/services/getSingle";
import SimpleHtmlContainer from '@/components/containers/SimpleHtmlContainer';
import parseMarkdown from "@/utils/parseMarkdown";

export default async function Practical() {
    const { data: practicalObject } = await getSingle("practical");
    const contentHtml = await parseMarkdown(practicalObject.attributes.content);
    return (
        <section id="practical" className="w-screen">
            <SimpleHtmlContainer contentHtml={contentHtml} />
            <iframe src={process.env.NEXT_PUBLIC_MAPS_SRC} width="600" height="450" className="max-w-full border-0 mx-auto" allowFullScreen loading="lazy"></iframe>
        </section>

    )
}
