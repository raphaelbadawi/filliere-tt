"use server";

import crypto from "crypto";

export default async function subscribe(email: string) {
  const bearer = `Bearer ${process.env.STRAPI_TOKEN}`;

  const alreadyExistsResponse = await fetch(
    `${process.env.STRAPI_DOCKER_NETWORK_ENDPOINT}/api/subscribers?filters[email][$eq]=${email}`,
    { headers: { Authorization: bearer }, cache: "no-store" }
  );
  if (!alreadyExistsResponse.ok) {
    return "Le serveur est injoignable";
  }
  const alreadyExistsData = await alreadyExistsResponse.json();
  if(alreadyExistsData.data.length) {
    return "Cette adresse email est déjà inscrite à la newsletter";
  }

  const hash = crypto.randomBytes(32).toString("hex");
  const res = await fetch(
    `${process.env.STRAPI_DOCKER_NETWORK_ENDPOINT}/api/subscribers`,
    {
      method: "POST",
      headers: { Authorization: bearer, "Content-Type": "application/json" },
      body: JSON.stringify({data: { email, hash }}),
    }
  );

  if (!res.ok) {
    return "KO";
  }
  return "OK";
}
