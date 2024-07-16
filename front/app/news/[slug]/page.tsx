import CommentForm from "@/components/CommentForm";
import PostFull from "@/components/PostFull";
import Comments from "@/components/containers/Comments";
import getPosts from "@/services/getPosts";
import { Post } from "@/types";
import { Metadata } from "next";

type Props = {
    params: { slug: string };
};

let postFetchPromise: Promise<Post>;

async function fetchPost(slug: string): Promise<Post> {
    if (!postFetchPromise) {
        let filters = "&filters[slug][$eq]=" + slug;
        postFetchPromise = getPosts(1, 1, filters).then(response => response.data[0]);
    }
    return postFetchPromise;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const fullPost = await fetchPost(params.slug);
  
    return {
        title: `Fillière TT | ${fullPost.attributes.title}`,
    };
}

export default async function SingleNews({ params }: Props) {
    const fullPost = await fetchPost(params.slug);

    return (
        <div className="w-screen flex flex-col">
            <section id="singleNews" className="w-full p-4">
                <PostFull post={fullPost} />
            </section>
            <section id="comments" className="w-full p-4">
                <Comments post={fullPost}/>
            </section>
            <section id="commentForm" className="w-full p-4">
                <CommentForm post={fullPost} />
            </section>
        </div>
    );
}
