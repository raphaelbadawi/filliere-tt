import CommentForm from "@/components/CommentForm";
import PostFull from "@/components/PostFull";
import Comments from "@/components/containers/Comments";
import getPosts from "@/services/getPosts";
import { Post } from "@/types";
import { Metadata } from "next";

type Props = {
    params: Promise<{ slug: string }>;
};

async function fetchPost(slug: string): Promise<Post> {
    let filters = "&filters[slug][$eq]=" + slug;
    return getPosts(1, 1, filters).then(response => response.data[0]);
}

export async function generateMetadata(props: Props): Promise<Metadata> {
    const params = await props.params;
    const fullPost = await fetchPost(params.slug);
    return {
        title: `Fillière TT | ${fullPost.title}`,
    };
}

export default async function SingleNews(props: Props) {
    const params = await props.params;
    const fullPost = await fetchPost(params.slug);

    return (
        <div className="w-full flex flex-col gap-4 ">
            <section id="singleNews" className="w-full">
                <PostFull post={fullPost} />
            </section>
            <section id="comments" className="w-full">
                <Comments post={fullPost}/>
            </section>
            <section id="commentForm" className="w-full">
                <CommentForm post={fullPost} />
            </section>
        </div>
    );
}
