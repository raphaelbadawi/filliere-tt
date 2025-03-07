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
  const postFilters = "&filters[comments][documentId][$eq]=" + commentId;
  const post = await getPosts(1, 1, postFilters).then(response => response.data[0]);
  const subscriptionPostFilter = "&filters[post][documentId][$eq]=" + post.documentId;
  const commenterSubscription = await getMultiple("post-subscriptions", subscriptionEmailFilter + subscriptionPostFilter);

  // Subscribe the commenter if not already subscribed to post
  if (!commenterSubscription.length) {
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
  new Promise(async (resolve, reject) => {
    try {

      const subscriptions = await getMultiple("post-subscriptions", subscriptionPostFilter);
      const template = await getTemplate("newsletter"); // Nothing fancy, we use the same basic template used for newsletters
      const linkToPost = process.env.NEXT_PUBLIC_HOST + "/news/" + post.slug + "#comments";
      const contentBody = `Un nouveau commentaire a été posté par <strong>${body.comment.author}</strong> sur le contenu "${post.title}" que vous aviez commenté par le passé. Cliquez <a target="_blank" href="${linkToPost}" style="text-decoration: none; color: rgb(137, 162, 202);">ici pour voir les commentaires</a>.`;

      let count = 0;

      for(const sub of subscriptions.data) {
        const subEmail = sub.email;
        if (subEmail == commenterEmail) {
          continue;
        }
        const title = "[FILLIÈRE TT] Nouvelle activité";
        const sender = `Fillière TT <${process.env.MAIL_POSTMASTER}>`;
        const content = await setMailTemplateContent(template, sub.hash, title, contentBody, "post-subscriptions");
        sendMail(
          sender || "",
          subEmail,
          title,
          content
        );
        // Wait 10 seconds to limit spam detection
        await new Promise((resolve) => setTimeout(resolve, 60 * 1000));

        count++;

        // After 20 emails, wait for an entire hour before continuing
        if (count % 20 === 0) {
          await new Promise((resolve) => setTimeout(resolve, 60 * 60 * 1000));
        }
      }

      resolve("Emails sent successfully");
    } catch (error) {
      reject(error);
    }
  }).catch((error) => console.error("Error in email sending process", error));

  // Return early before the email process is done
  return new Response("OK", { status: 200 });
}
