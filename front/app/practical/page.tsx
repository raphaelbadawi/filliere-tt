
import getSingle from "@/services/getSingle";
import SimpleHtmlContainer from '@/components/containers/SimpleHtmlContainer';
import parseMarkdown from "@/utils/parseMarkdown";

export default async function Practical() {
    const { data: practicalObject } = await getSingle("practical");
    const contentHtml = await parseMarkdown(practicalObject.attributes.content);
    return (
        <section id="practical" className="w-full">
            <SimpleHtmlContainer contentHtml={contentHtml} />
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2771.3550212325576!2d6.172277976800223!3d46.00410577108805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478b88f6300baec1%3A0x42e12aceb691cc5c!2sGymnase%20du%20Parmelan!5e0!3m2!1sfr!2sfr!4v1720439039821!5m2!1sfr!2sfr" width="600" height="450" className="border-0 mx-auto" allowFullScreen loading="lazy"></iframe>
        </section>

    )
}
