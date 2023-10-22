import getPosts from "@/services/getPosts";
import { Post, SearchParams } from "@/types/index";
import Date from "@/components/Date";
import Image from "next/image"; 

export default async function News({ searchParams }: { searchParams: SearchParams }) {
    const pageSize = 10;
    const pageNumber = searchParams.page || 1;
    const { data, meta } = await getPosts(pageNumber, pageSize);
    const totalPosts = meta.pagination.total;
    const totalPageCount = Math.ceil(totalPosts / pageSize);

    /** @todo finish pagination (link, icons, hover), create card entity, put post snippet and pagination in separate components, create single post page, add tags and comments */
    return (
        <div className="w-full px-4">
            {data && data.map((post: Post, index: number) =>
                <div key={index} className="mt-4 mx-autos px-10 py-6 rounded-lg shadow-sm bg-primary">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-300"><Date dateString={post.attributes.createdAt}></Date></span>
                        <a rel="noopener noreferrer" href="#" className="px-2 py-1 font-bold rounded bg-accent text-white">TAG</a>
                    </div>
                    <div className="mt-3">
                        <a rel="noopener noreferrer" href="#" className="text-2xl font-bold hover:underline">{post.attributes.title}</a>
                        <p className="mt-2">{post.attributes.content}</p>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <a rel="noopener noreferrer" href="#" className="hover:underline text-accent">Read more</a>
                        <div>
                            <a rel="noopener noreferrer" href="#" className="flex items-center">
                                {post.attributes.picture.data && <Image width="40" height="40" src={`${process.env.STRAPI_DOCKER_NETWORK_ENDPOINT}${post.attributes.picture.data.attributes.formats.small.url}`} alt="Image" className="object-cover w-10 h-10 mx-4 rounded-full"></Image>}
                                <span className="hover:underline text-gray-300">Leroy Jenkins</span>
                            </a>
                        </div>
                    </div>
                </div>
            )}
            <div className="flex justify-center mt-4 space-x-2">
                {pageNumber > 1 && (
                    <button
                        className="px-4 py-2 ml-4 border rounded bg-accent text-white"
                    >
                        Précédent
                    </button>
                )}
                {Array.from({ length: Math.min(5, totalPageCount) }).map((_, idx) => (
                    <button
                        key={idx}
                        className={`px-3 py-1 border rounded ${pageNumber === idx + 1 ? 'bg-accent text-white' : 'bg-white text-accent'}`}
                    >
                        {idx + 1}
                    </button>
                ))}

                {/* Next button */}
                {pageNumber * pageSize < totalPosts && (
                    <button
                        className="px-4 py-2 ml-4 border rounded bg-accent text-white"
                    >
                        Suivant
                    </button>
                )}
            </div>
        </div>
    )
}
