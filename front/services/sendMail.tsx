export default async function sendMail(from: string, to: string, subject: string, text: string) {
    const nodemailer = require("nodemailer");
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
        from,
        to,
        subject,
        html: text,
    };
    try {
        await transporter.sendMail(mailData);
    } catch (e) {
        console.log(e);
        return new Response("KO", { status: 500 });
    }
    return new Response("OK", { status: 200 });
}
