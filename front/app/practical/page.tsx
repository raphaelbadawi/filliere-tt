
import getSingle from "@/services/getSingle";
import SimpleHtmlContainer from '@/components/containers/SimpleHtmlContainer';
import parseMarkdown from "@/utils/parseMarkdown";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Fillière TT | Informations pratiques",
};

export default async function Practical() {
    const { data: practicalObject } = await getSingle("practical");
    let contentHtml = await parseMarkdown(practicalObject.attributes.content);
    contentHtml += `<iframe src=${process.env.NEXT_PUBLIC_MAPS_SRC} width="600" height="450" class="max-w-full border-0 mx-auto" allowFullScreen loading="lazy"></iframe>`;
    return (
        <section id="practical" className="w-full">
            <SimpleHtmlContainer contentHtml={contentHtml} />
        </section>

    )
}
