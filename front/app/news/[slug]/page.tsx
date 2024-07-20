import CommentForm from "@/components/CommentForm";
import PostFull from "@/components/PostFull";
import Comments from "@/components/containers/Comments";
import getPosts from "@/services/getPosts";
import { Post } from "@/types";
import { Metadata } from "next";

type Props = {
    params: { slug: string };
};

let posts: { [slug: string]: Promise<Post> } = {};

async function fetchPost(slug: string): Promise<Post> {
    if (!posts[slug]) {
        let filters = "&filters[slug][$eq]=" + slug;
        posts[slug] = getPosts(1, 1, filters).then(response => response.data[0]);
    }
    return posts[slug];
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
