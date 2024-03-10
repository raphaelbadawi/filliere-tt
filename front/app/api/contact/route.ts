import sendMail from "@/services/sendMail";

export async function POST(req: Request) {
  const body = await req.json();
  return sendMail(
    process.env.MAIL_USER || "",
    body.email,
    `[FILLIÈRE TT] Message de ${body.author}`,
    body.content
  );
}
