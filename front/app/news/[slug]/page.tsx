
import PostFull from "@/components/PostFull";
import getPost from "@/services/getPost";

export default async function SingleNews({ params }: { params: { slug: string } }) {
    /** @todo add optional filtering logic to getPosts service, add tags and comments, add captcha to comments */
    const { data: post } = await getPost(params.slug);
    return (
        <section id="singleNews" className="w-full p-4">
            <PostFull post={post[0]} />
        </section>
    )
}