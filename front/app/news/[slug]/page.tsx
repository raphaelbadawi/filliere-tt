import CommentForm from "@/components/CommentForm";
import PostFull from "@/components/PostFull";
import Comments from "@/components/containers/Comments";
import getPosts from "@/services/getPosts";

export default async function SingleNews({ params }: { params: { slug: string } }) {
    /** @todo show comments count in post snippets, glowing effect around cursor on post snippet hover, export config */
    let filters = "&filters[slug][$eq]=" + params.slug;
    const { data: post } = await getPosts(1, 1, filters);
    return (
        <div className="w-full flex flex-col">
            <section id="singleNews" className="w-full p-4">
                <PostFull post={post[0]} />
            </section>
            <section id="comments" className="w-full p-4">
                <Comments post={post[0]}/>
            </section>
            <section id="commentForm" className="w-full p-4">
                <CommentForm post={post[0]} />
            </section>
        </div>
    )
}