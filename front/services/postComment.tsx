import { CommentAttributes } from "@/types";

export default async function postComment(commentData: CommentAttributes) {
    const bearer = `Bearer ${process.env.STRAPI_TOKEN}`;
    const res = await fetch(
        `${process.env.STRAPI_DOCKER_NETWORK_ENDPOINT}/api/comments`,
        {
            method: "POST",
            headers: { Authorization: bearer, "Content -Type": "application/json" },
            body: JSON.stringify({ data: commentData })
        }
    );

    return res.json();
}
