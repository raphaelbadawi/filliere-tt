import crypto from "crypto";
import getMultiple from "@/services/getMultiple";
import getPosts from "@/services/getPosts";
import { getTemplate, setMailTemplateContent } from "@/utils/createMailTemplate";
import sendMail from "@/services/sendMail";

export async function POST(req: Request) {
  const body = await req.json();
  const commentId = body.comment.id;
  const commenterEmail = body.comment.email;
  const subscriptionEmailFilter = "&filters[email][$eq]=" + commenterEmail;
  const postFilters = "&filters[comments][id][$eq]=" + commentId;
  const post = await getPosts(1, 1, postFilters).then(response => response.data[0]);
  const subscriptionPostFilter = "&filters[post][id][$eq]=" + post.id;
  const commenterSubscription = await getMultiple("post-subscriptions", subscriptionEmailFilter + subscriptionPostFilter);

  // Subscribe the commenter if not already subscribed to post
  if (!commenterSubscription.data.length) {
    const bearer = `Bearer ${process.env.STRAPI_TOKEN}`;
    const hash = crypto.randomBytes(32).toString("hex");
    const res = await fetch(
      `${process.env.STRAPI_DOCKER_NETWORK_ENDPOINT}/api/post-subscriptions`,
      {
        method: "POST",
        headers: { Authorization: bearer, "Content-Type": "application/json" },
        body: JSON.stringify({data: { email: commenterEmail, hash, post: post.id }}),
      }
    );
  }

  // Notify other commenters
  const subscriptions = await getMultiple("post-subscriptions", subscriptionPostFilter);
  const template = await getTemplate("newsletter"); // Nothing fancy, we use the same basic template used for newsletters
  /** @todo put link with anchor to autoscroll to comments and retest */
  const contentBody = `Un nouveau commentaire a été posté par ${body.comment.author} sur le post ${post.attributes.title} que vous aviez commenté par le passé. Cliquez <a href="" style="text-decoration: none; color: rgb(137, 162, 202);">ici pour voir les commentaires</a>.`;
  for(const sub of subscriptions.data) {
    const subEmail = sub.attributes.email;
    if (subEmail == commenterEmail) {
      continue;
    }
    const title = "[FILLIÈRE TT] Nouvelle activité sur un post que vous avez commenté";
    const sender = `Fillière TT <${process.env.MAIL_POSTMASTER}>`;
    const content = await setMailTemplateContent(template, sub.attributes.hash, title, contentBody, "post-subscribers");
    sendMail(
      sender || "",
      subEmail,
      title,
      content
    );
  }

  return new Response("OK", { status: 200 });
}
