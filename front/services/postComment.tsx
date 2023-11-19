"use server"

import { CommentPostAttributes } from "@/types";

export default async function postComment(commentData: CommentPostAttributes) {
    const bearer = `Bearer ${process.env.STRAPI_TOKEN}`;
    commentData.publishedAt = null;
    const res = await fetch(
        `${process.env.STRAPI_DOCKER_NETWORK_ENDPOINT}/api/comments`,
        {
            method: "POST",
            headers: { Authorization: bearer, "Content-Type": "application/json" },
            body: JSON.stringify({ data: commentData })
        }
    );

    if (!res.ok) {
        return "KO";
    }
    return "OK";
}
