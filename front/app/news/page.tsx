import getPosts from "@/services/getPosts";
import { Post, SearchParams, Tag } from "@/types";
import Paginator from "@/components/Paginator";
import PostSnippet from "@/components/PostSnippet";
import Link from "next/link";
import Title from "@/components/Title";
import getTag from "@/services/getTag";

export default async function News({ searchParams }: { searchParams: SearchParams }) {
    const pageSize = 10;
    const pageNumber = Number(searchParams.page) || 1;
    const tagId = searchParams.tagId || false;
    let tagName = "";
    let filters = "";
    if (tagId) {
        const tag: {data: Tag} = await getTag(tagId);
        tagName = tag.data.attributes.tag;
        filters = "&filters[tags][id][$eq]=" + tagId;
    }
    const { data, meta } = await getPosts(pageNumber, pageSize, filters);
    const totalPosts = meta.pagination.total;
    const totalPageCount = Math.ceil(totalPosts / pageSize);

    return (
        <section id="news" className="w-full px-4">
            {tagId && <Link rel="noopener noreferrer" href="/news" className="block mt-3 hover:underline text-white cursor-pointer">Retour aux actualités</Link>}
            {tagId && <Title text={tagName.toUpperCase()}></Title>}
            {data && data.map((post: Post, index: number) =>
                <PostSnippet key={index} index={index} post={post} />
            )}
            <Paginator endpoint="/news" pageNumber={pageNumber} totalPageCount={totalPageCount} pageSize={pageSize} totalPosts={totalPosts} />
        </section>
    )
}
