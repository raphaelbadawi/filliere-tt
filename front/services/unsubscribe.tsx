"use server";

export default async function unsubscribe(hash: string, entityType: string = "subscribers") {
  const bearer = `Bearer ${process.env.STRAPI_TOKEN}`;
  const currentEntryResponse = await fetch(
    `${process.env.STRAPI_DOCKER_NETWORK_ENDPOINT}/api/${entityType}?filters[hash][$eq]=${hash}`,
    { headers: { Authorization: bearer }, cache: "no-store" }
  );
  if (!currentEntryResponse.ok) {
    return "Le serveur est injoignable";
  }
  const currentEntryData = await currentEntryResponse.json();

  if (!currentEntryData.data.length) {
    return "Cette adresse email est déjà désinscrite";
  }
  // If hashes don't match, the request doesn't come from a legit link
  if (currentEntryData.data[0].attributes.hash != hash) {
    return "Le lien n'est pas valide";
  }

  const res = await fetch(
    `${process.env.STRAPI_DOCKER_NETWORK_ENDPOINT}/api/${entityType}/${currentEntryData.data[0].id}`,
    {
      method: "DELETE",
      headers: { Authorization: bearer, "Content-Type": "application/json" },
    }
  );

  if (!res.ok) {
    return "Le serveur est injoignable";
  }
  return "OK";
}
