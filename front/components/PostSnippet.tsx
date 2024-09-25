import { Post } from "@/types";
import Date from "@/components/Date";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaComment } from "react-icons/fa6";
import parseMarkdown from "@/utils/parseMarkdown";

export default async function PostSnippet({ index, post }: { index: number, post: Post }) {
    const contentHtml = await parseMarkdown(post.content);
    const pictureUrl = post.picture?.formats?.large?.url
        || post.picture?.formats?.medium?.url
        || post.picture?.formats?.small?.url;
    return (
        <div key={index} className="mt-4 mx-auto p-2 sm:p-4 rounded-lg bg-gradient-to-r from-primary to-black cursor-aura-receptor">
            <div className="relative flex items-center justify-between">
                <span className="text-sm text-gray-300"><Date dateString={post.createdAt}></Date></span>
                <span className="flex gap-2">
                    {post.tags && post.tags.map((tag, index) => <Link key={index} href={`/news?tagId=${tag.documentId}&tagName=${tag.tag}`} className="h-max px-2 py-1 font-semibold rounded bg-accent text-white">{tag.tag.toUpperCase()}</Link>)}
                </span>
            </div>
            <div className="relative mt-3">
                <Link href={`/news/${post.slug}`} className="text-white text-3xl font-bold hover:underline">{post.title}</Link>
                {post.picture && <Image width="300" height="300" src={`${process.env.STRAPI_DOCKER_NETWORK_ENDPOINT}${pictureUrl}`} alt="Image" className="object-cover mt-2 rounded"></Image>}
                <div dangerouslySetInnerHTML={{ __html: contentHtml }} className="max-h-40 overflow-hidden mt-3 min-w-full text-white prose prose-invert"></div>

            </div>
            <hr className="my-2 relative border-white border-t-2 rounded-full" />
            <div className="flex items-center gap-2 text-white">
                <FaArrowRight />
                <div className="relative w-full flex items-center isolate">
                    <Link href={`/news/${post.slug}`} className="absolute hover:underline cursor-pointer z-10 font-bold text-lg">Voir plus</Link>
                    <span className="absolute opacity-50 animate-ping text-gray-300 cursor-pointer z-0">Voir plus</span>
                </div>
                <div className="ml-auto flex items-center gap-1"><FaComment />{post.comments.length}</div>
            </div>

        </div>
    )
}