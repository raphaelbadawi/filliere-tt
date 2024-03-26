import { format } from "date-fns";
import { fr } from "date-fns/locale";
import getMultiple from "@/services/getMultiple";
import sendMail from "@/services/sendMail";

export async function POST(req: Request) {
  const subscribers = await getMultiple("subscribers");
  const body = await req.json();
  if (body.jwt !== process.env.STRAPI_ADMIN_JWT) {
    return new Response("KO", { status: 500 });
  }
  const date = format(new Date(), "d LLLL yyyy", { locale: fr });
  for (const subscriber of subscribers.data) {
    sendMail(
      process.env.MAIL_USER || "",
      subscriber.attributes.email,
      `[FILLIÈRE TT] Newsletter du ${date}`,
      body.content
    );
  }
  return new Response("OK", { status: 200 });
}
