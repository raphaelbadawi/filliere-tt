import { Post } from "@/types";
import Comment from "@/components/Comment";

export default function Comments({post}: {post: Post}) {
    const comments = post.attributes.comments.data;
    return (
        <div className="flex flex-col gap-3 w-full mt-4 mx-auto px-10 py-6 rounded bg-gradient-to-r from-black to-accent">
            <h2 className="text-3xl">Commentaires</h2>
            <hr className="border-white border-t-4 rounded-full"></hr>
            {comments.length > 0 && comments.map((comment, index) => <Comment key={index} comment={comment} />)}
            {comments.length == 0 && <span>Pas de commentaire</span>}
        </div>
    )
}