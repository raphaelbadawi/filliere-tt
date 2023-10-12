import getPosts from "@/services/getPosts";
import Post from "@/types/post";
import Date from "@/components/Date";
import Image from "next/image";

export default async function News() {
    const { data } = await getPosts();

    /** @todo show all attributes, style post snippets, put post snippet in separate component, add pagination, create single post page, add tags and comments */
    return (
        <div>
            {data && data.map((post: Post, index: number) =>
                <div key={index} className="container max-w-4xl mt-4 ml-4 px-10 py-6 rounded-lg shadow-sm bg-primary">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-300"><Date dateString={post.attributes.createdAt}></Date></span>
                        <a rel="noopener noreferrer" href="#" className="px-2 py-1 font-bold rounded bg-accent text-white">TAG</a>
                    </div>
                    <div className="mt-3">
                        <a rel="noopener noreferrer" href="#" className="text-2xl font-bold hover:underline">{ post.attributes.title }</a>
                        <p className="mt-2">{ post.attributes.content }</p>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <a rel="noopener noreferrer" href="#" className="hover:underline text-accent">Read more</a>
                        <div>
                            <a rel="noopener noreferrer" href="#" className="flex items-center">
                                <Image width="40" height="40" src={`${process.env.STRAPI_DOCKER_NETWORK_ENDPOINT}${post.attributes.picture.data.attributes.formats.small.url}`} alt="Image" className="object-cover w-10 h-10 mx-4 rounded-full"></Image>
                                <span className="hover:underline text-gray-300">Leroy Jenkins</span>
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
