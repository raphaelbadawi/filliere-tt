import getMultiple from "@/services/getMultiple";

export async function POST(req: Request) {
  const subscribers = await getMultiple("subscribers");
  /** @todo ADMIN_JWT_SECRET is expected in the request body for validation */
}
