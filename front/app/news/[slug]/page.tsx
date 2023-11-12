
import PostFull from "@/components/PostFull";
import Comments from "@/components/containers/Comments";
import getPosts from "@/services/getPosts";

export default async function SingleNews({ params }: { params: { slug: string } }) {
    /** @todo add tags and comments form, show comments count in post snippets, add captcha to comments */
    const { data: post } = await getPosts(1, 1, {slug: params.slug});
    return (
        <div className="w-full flex flex-col">
            <section id="singleNews" className="w-full p-4">
                <PostFull post={post[0]} />
            </section>
            <section id="comments" className="w-full p-4">
                <Comments post={post[0]}/>
            </section>
        </div>
    )
}