import { Comment } from "@/types";
import Date from "@/components/Date";
import parseLinks from "@/utils/parseLinks";

export default function CommentComponent({comment}: {comment: Comment}) {
    const commentContent = parseLinks(comment.attributes.content);
    return (
        <div role="comment" className="p-2 sm:p-4 bg-white text-black rounded">
            <p className="text-base whitespace-pre-wrap">{commentContent}</p>
            <hr className="my-2 relative border-accent border-t-2 rounded-full" />
            <p className="text-right text-sm">par <span className="text-base font-semibold text-accent">{comment.attributes.author}</span> le <span className="font-semibold text-primary"><Date dateString={comment.attributes.createdAt}></Date></span></p>
        </div>
    )
}