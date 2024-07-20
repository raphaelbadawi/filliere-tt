import { Comment } from "@/types";
import Date from "@/components/Date";

export default function CommentComponent({comment}: {comment: Comment}) {
    return (
        <div role="comment" className="p-2 sm:p-4 bg-white text-black rounded">
            <p className="text-base">{comment.attributes.content}</p>
            <hr className="my-2 relative border-accent border-t-2 rounded-full" />
            <p className="text-right text-sm">par <span className="text-base font-semibold text-accent">{comment.attributes.author}</span> le <span className="font-semibold text-primary"><Date dateString={comment.attributes.createdAt}></Date></span></p>
        </div>
    )
}