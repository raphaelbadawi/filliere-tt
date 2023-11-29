export async function POST(req: Request) {
  const nodemailer = require("nodemailer");
  const body = await req.json();
  const transporter = nodemailer.createTransport({
    port: process.env.MAIL_PORT ? +process.env.MAIL_PORT : 465,
    host: process.env.MAIL_HOST,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
    secure: true,
  });
  const mailData = {
    from: body.email,
    to: process.env.MAIL_USER,
    subject: `[FILLIÈRE TT] Message de ${body.author}`,
    text: body.content,
  };
  try {
    await transporter.sendMail(mailData);
  } catch(e) {
    return new Response("KO", {status: 500});
  }
  return new Response("OK", {status: 200});
}
