import sendMail from "@/services/sendMail";

export async function POST(req: Request) {
  const body = await req.json();
  const sender = `${body.author} <${body.email}>`;
  return sendMail(
    sender || "",
    process.env.MAIL_USER || "",
    `[FILLIÈRE TT] Message de ${body.author}`,
    body.content
  );
}
