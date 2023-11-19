"use server";

export async function verifyCaptcha(token: string | null) {
    const res = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_PRIVATE_KEY}&response=${token}`,
        {
            method: "POST",
        }
    );
    
    if (!res.ok) {
        return "KO";
    }
    const data = await res.json();
    if (!data.success) {
        return "KO"
    }
    return "OK";
}