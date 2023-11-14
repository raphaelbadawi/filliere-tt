import CommentForm from "@/components/CommentForm";
import PostFull from "@/components/PostFull";
import Comments from "@/components/containers/Comments";
import getPosts from "@/services/getPosts";

export default async function SingleNews({ params }: { params: { slug: string } }) {
    /** @todo add comments form, add react-toastify library for comments feedback, setup form validation (use zod library), show only 5 pagination buttons (<<, <, X, >, >>) and only if there is more than 1 page, show comments count in post snippets, add captcha to comments, glowing effect around cursor on post snippet hover, export config */
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
                <CommentForm />
            </section>
        </div>
    )
}