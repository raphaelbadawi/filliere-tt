import { Post } from "@/types";
import Comment from "@/components/Comment";

export default function Comments({post}: {post: Post}) {
    const comments = post.attributes.comments.data;
    return (
        <div className="w-full mt-4 mx-auto px-10 py-6 rounded bg-gradient-to-r from-black to-accent">
            <h2 className="text-3xl mb-3">Commentaires</h2>
            <hr className="mb-3 border-white border-t-4 rounded-full"></hr>
            {comments.length > 0 && comments.map((comment, index) => <Comment comment={comment} />)}
            {comments.length == 0 && <span>Pas de commentaire</span>}
        </div>
    )
}