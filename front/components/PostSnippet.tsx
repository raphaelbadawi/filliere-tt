import { Post } from "@/types";
import Date from "@/components/Date";
import Image from "next/image";
import Link from "next/link";
import { FaComment } from "react-icons/fa6";
import parseMarkdown from "@/utils/parseMarkdown";

export default async function PostSnippet({ index, post }: { index: number, post: Post }) {
    const contentHtml = await parseMarkdown(post.attributes.content);
    return (
        <div key={index} className="mt-4 mx-auto px-10 py-6 rounded bg-gradient-to-r from-primary to-black cursor-aura-receptor">
            <div className="relative flex items-center justify-between">
                <span className="text-sm text-gray-300"><Date dateString={post.attributes.createdAt}></Date></span>
                <span className="flex gap-2">
                    {post.attributes.tags && post.attributes.tags.data.map((tag, index) => <Link key={index} href={`/news?tagId=${tag.id}&tagName=${tag.attributes.tag}`} className="px-2 py-1 font-bold rounded bg-accent text-white">{tag.attributes.tag.toUpperCase()}</Link>)}
                </span>
            </div>
            <div className="relative mt-3">
                <Link href={`/news/${post.attributes.slug}`} className="text-white text-3xl font-bold hover:underline">{post.attributes.title}</Link>
                {post.attributes.picture.data && <Image width="160" height="160" src={`${process.env.STRAPI_DOCKER_NETWORK_ENDPOINT}${post.attributes.picture.data.attributes.formats.small.url}`} alt="Image" className="object-cover h-40 w-40 mt-2 rounded"></Image>}
                <div dangerouslySetInnerHTML={{ __html: contentHtml.length > 300 ? contentHtml.substring(0, 300) + "..." : contentHtml }} className="mt-3 min-w-full text-white prose prose-invert"></div>

            </div>
            <div className="relative flex items-center isolate">
                <Link href={`/news/${post.attributes.slug}`} className="absolute mt-3 hover:underline text-white cursor-pointer z-10">Voir plus</Link>
                <span className="absolute mt-3 opacity-50 animate-ping text-gray-300 cursor-pointer z-0">Voir plus</span>
                <div className="ml-auto flex items-center gap-1"><FaComment />{post.attributes.comments.data.length}</div>
            </div>
        </div>
    )
}