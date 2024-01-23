import { remark } from 'remark';
import html from 'remark-html';

export default async function parseMarkdown(content: string) {
    const processedContent = await remark()
        .use(html)
        .process(content || "")
    return processedContent.toString().replaceAll("<a href", "<a target=\"_blank\" href");
}