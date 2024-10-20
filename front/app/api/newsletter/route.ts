import { format } from "date-fns";
import { fr } from "date-fns/locale";
import getMultiple from "@/services/getMultiple";
import sendMail from "@/services/sendMail";
import { getTemplate, setMailTemplateContent } from "@/utils/createMailTemplate";
import parseMarkdown from "@/utils/parseMarkdown";

export async function POST(req: Request) {
  const subscribers = await getMultiple("subscribers");
  const body = await req.json();

  // Check for valid JWT
  if (body.jwt !== process.env.STRAPI_ADMIN_JWT) {
    return new Response("KO", { status: 500 });
  }

  // Asynchronous handling to be able to return early
  new Promise(async (resolve, reject) => {
    try {
      const date = format(new Date(), "d LLLL yyyy", { locale: fr });
      const template = await getTemplate("newsletter");
      const contentBody = await parseMarkdown(body.content);

      let count = 0;
      for (const subscriber of subscribers.data) {
        const title = `[FILLIÈRE TT] Newsletter du ${date}`;
        const sender = `Fillière TT <${process.env.MAIL_POSTMASTER}>`;
        const content = await setMailTemplateContent(
          template,
          subscriber.hash,
          title,
          contentBody,
          "subscribers"
        );
        sendMail(sender || "", subscriber.email, title, content);
        
        // Wait 10 seconds to limit spam detection
        await new Promise((resolve) => setTimeout(resolve, 10 * 1000));

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
