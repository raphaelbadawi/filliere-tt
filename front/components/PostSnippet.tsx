import { Post } from "@/types";
import Date from "@/components/Date";
import Image from "next/image"; 
import Link from "next/link";

export default function PostSnippet({index, post}: {index: number, post: Post}) {
    return (
        <div key={index} className="mt-4 mx-auto px-10 py-6 rounded bg-gradient-to-r from-primary to-black cursor-aura-receptor">
            <div className="relative flex items-center justify-between">
                <span className="text-sm text-gray-300"><Date dateString={post.attributes.createdAt}></Date></span>
                {post.attributes.tags && post.attributes.tags.data.map((tag, index) => <Link key={index} href={`/news?tagId=${tag.id}&tagName=${tag.attributes.tag}`} className="px-2 py-1 font-bold rounded bg-accent text-white">{tag.attributes.tag.toUpperCase()}</Link>)}
            </div>
            <div className="relative mt-3">
                <Link href={`/news/${post.attributes.slug}`} className="text-white text-3xl font-bold hover:underline">{post.attributes.title}</Link>
                {post.attributes.picture.data && <Image width="160" height="160" src={`${process.env.STRAPI_DOCKER_NETWORK_ENDPOINT}${post.attributes.picture.data.attributes.formats.small.url}`} alt="Image" className="object-cover h-40 w-40 mt-2 rounded"></Image>}
                <p className="mt-3 text-white">{post.attributes.content.length > 300 ? post.attributes.content.substring(0, 300) + "..." : post.attributes.content}</p>
            </div>
            <Link href={`/news/${post.attributes.slug}`} className="relative mt-3 hover:underline text-accent cursor-pointer">Voir plus</Link>
        </div>
    )
}