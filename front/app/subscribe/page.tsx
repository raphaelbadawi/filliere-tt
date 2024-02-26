import { remark } from 'remark';
import html from 'remark-html';
import getSingle from "@/services/getSingle";
import SimpleHtmlContainer from '@/components/containers/SimpleHtmlContainer';

export default async function Subscribe() {
    const { data: subscriptionObject } = await getSingle("subscription");
    const processedContent = await remark()
        .use(html)
        .process(subscriptionObject.attributes.content || "")
    const contentHtml = processedContent.toString().replaceAll("<a href", "<a target=\"_blank\" href");
    const fileAttributes = subscriptionObject.attributes.file.data.attributes;
    const encodedFileAttributes = btoa(JSON.stringify(fileAttributes));
    return (
        <section id="practical" className="w-full flex flex-col items-center gap-6">
            <SimpleHtmlContainer contentHtml={contentHtml} />
            <a target="_blank" href={`/api/file?file=${encodedFileAttributes}`} className="w-fit bg-primary text-white font-bold py-2 px-4 rounded outline-none scale-100 hover:shadow-2xl hover:scale-110 transition-all duration-300" type="button" id="subscriptionButton">
                Télécharger le formulaire d'inscription 
            </a>
        </section>

    )
}
