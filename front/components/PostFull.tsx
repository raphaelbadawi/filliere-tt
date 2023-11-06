import { Post } from "@/types";
import Date from "@/components/Date";
import Image from "next/image"; 
import Link from "next/link";

export default function PostSnippet({post}: {post: Post}) {
    return (
        <div className="w-full mt-4 mx-auto px-10 py-6 rounded bg-gradient-to-r from-primary to-black ">
            <Link rel="noopener noreferrer" href="/news" className="mt-3 hover:underline text-accent cursor-pointer">Retour aux actualités</Link>
            <div className="mt-3 flex items-center justify-between">
                <span className="text-sm text-gray-300"><Date dateString={post.attributes.createdAt}></Date></span>
                <Link href="#" className="px-2 py-1 font-bold rounded bg-accent text-white">TAG</Link>
            </div>
            <article className="mt-3">
                <h2 className="text-white text-3xl font-bold">{post.attributes.title}</h2>
                <span className="hover:underline text-gray-300">par {post.attributes.createdBy.data.attributes.firstname} {post.attributes.createdBy.data.attributes.lastname}</span>
                <hr className="mt-3"></hr>
                {post.attributes.picture.data && <Image width="320" height="320" src={`${process.env.STRAPI_DOCKER_NETWORK_ENDPOINT}${post.attributes.picture.data.attributes.formats.small.url}`} alt="Image" className="object-cover h-80 w-80 mt-2 rounded"></Image>}
                <p className="mt-3 text-white">{post.attributes.content}</p>
            </article>
        </div>
    )
}