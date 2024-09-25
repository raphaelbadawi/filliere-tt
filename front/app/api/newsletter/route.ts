import { format } from "date-fns";
import { fr } from "date-fns/locale";
import getMultiple from "@/services/getMultiple";
import sendMail from "@/services/sendMail";
import { getTemplate, setMailTemplateContent } from "@/utils/createMailTemplate";
import parseMarkdown from "@/utils/parseMarkdown";

export async function POST(req: Request) {
  const subscribers = await getMultiple("subscribers");
  const body = await req.json();
  if (body.jwt !== process.env.STRAPI_ADMIN_JWT) {
    return new Response("KO", { status: 500 });
  }
  const date = format(new Date(), "d LLLL yyyy", { locale: fr });
  const template = await getTemplate("newsletter");
  const contentBody = await parseMarkdown(body.content);

  for (const subscriber of subscribers.data) {
    const title = `[FILLIÈRE TT] Newsletter du ${date}`;
    const sender = `Fillière TT <${process.env.MAIL_POSTMASTER}>`;
    const content = await setMailTemplateContent(template,  subscriber.hash, title, contentBody, "subscribers");
    sendMail(
      sender || "",
      subscriber.email,
      title,
      content
    );
    // Wait 1mn to limit the risk of being identified as spam
    await new Promise((resolve) => setTimeout(resolve, 60000));
  }
  return new Response("OK", { status: 200 });
}
