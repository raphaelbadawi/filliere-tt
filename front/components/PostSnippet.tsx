import { Post } from "@/types";
import Date from "@/components/Date";
import Image from "next/image"; 

export default function PostSnippet({index, post}: {index: number, post: Post}) {
    return (
        <div key={index} className="mt-4 mx-autos px-10 py-6 rounded bg-gradient-to-r from-primary to-black ">
            <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300"><Date dateString={post.attributes.createdAt}></Date></span>
                <a rel="noopener noreferrer" href="#" className="px-2 py-1 font-bold rounded bg-accent text-white">TAG</a>
            </div>
            <div className="mt-3">
                <a rel="noopener noreferrer" href="#" className="text-3xl font-bold hover:underline">{post.attributes.title}</a>
                {post.attributes.picture.data && <Image width="160" height="160" src={`${process.env.STRAPI_DOCKER_NETWORK_ENDPOINT}${post.attributes.picture.data.attributes.formats.small.url}`} alt="Image" className="object-cover h-40 w-40 mt-2 rounded"></Image>}
                <p className="mt-2">{post.attributes.content.length > 300 ? post.attributes.content.substring(0, 300) + "..." : post.attributes.content}</p>
            </div>
            <div className="flex items-center justify-between mt-4">
                <a rel="noopener noreferrer" href="#" className="hover:underline text-accent">Voir plus</a>
                <span className="hover:underline text-gray-300">Fillière TT</span>
            </div>
        </div>
    )
}