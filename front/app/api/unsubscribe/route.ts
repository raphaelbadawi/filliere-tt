import unsubscribe from "@/services/unsubscribe";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const hash = searchParams.get("hash");
  if (!hash) {
    return new Response("Le lien n'est pas valide", { status: 400 });
  }
  const response = await unsubscribe(hash);
  if (response !== "OK") {
    return new Response(response, { status: 500 });
  }
  return new Response("Votre désinscription a bien été tenue en compte", {
    status: 200,
  });
}
