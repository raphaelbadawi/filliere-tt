import { format } from "date-fns";
import { fr } from "date-fns/locale";
import getMultiple from "@/services/getMultiple";
import sendMail from "@/services/sendMail";
import { promises as fs } from 'fs';
import { Subscriber } from "@/types";

function setMailTemplateContent(template: string, subscriber: Subscriber, title: string, content: string) {
  const logoLink = process.env.NEXT_PUBLIC_HOST + "/icons/logo.png ";
  const unsubscribeLink = process.env.NEXT_PUBLIC_HOST + "/api/unsubscribe ";

  let templateContent = template
    .replace("{{LOGO_LINK}}", logoLink)
    .replace("{{TITLE}}", title)
    .replace("{{CONTENT}}", content)
    .replace("{{UNSUBSCRIBE_LINK}}", unsubscribeLink)
;
  return templateContent;
}

async function getTemplate() {
  const templatePath = process.cwd() + "/templates/newsletter.html";
  const content = await fs.readFile(templatePath, 'utf-8')
  return content;
}

export async function POST(req: Request) {
  const subscribers = await getMultiple("subscribers");
  const body = await req.json();
  if (body.jwt !== process.env.STRAPI_ADMIN_JWT) {
    return new Response("KO", { status: 500 });
  }
  const date = format(new Date(), "d LLLL yyyy", { locale: fr });
  const template = await getTemplate();
  for (const subscriber of subscribers.data) {
    const title = `[FILLIÈRE TT] Newsletter du ${date}`;
    const content = setMailTemplateContent(template, subscriber, title, body.content);
    sendMail(
      process.env.MAIL_USER || "",
      subscriber.attributes.email,
      title,
      content
    );
  }
  return new Response("OK", { status: 200 });
}
