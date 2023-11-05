import getPosts from "@/services/getPosts";
import { Post, SearchParams } from "@/types";
import Paginator from "@/components/Paginator";
import PostSnippet from "@/components/PostSnippet";


export default async function News({ searchParams }: { searchParams: SearchParams }) {
    const pageSize = 10;
    const pageNumber = Number(searchParams.page) || 1;
    const { data, meta } = await getPosts(pageNumber, pageSize);
    const totalPosts = meta.pagination.total;
    const totalPageCount = Math.ceil(totalPosts / pageSize);

    return (
        <section id="news" className="w-full px-4">
            {data && data.map((post: Post, index: number) =>
                <PostSnippet index={index} post={post} />
            )}
            <Paginator endpoint="/news" pageNumber={pageNumber} totalPageCount={totalPageCount} pageSize={pageSize} totalPosts={totalPosts} />
        </section>
    )
}
