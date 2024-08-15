import getMultiple from "@/services/getMultiple";

/** Do this: 1. post new subscriber on table if not already there, 2. send notif to other subscribers */
export async function POST(req: Request) {
  const subscriptions = await getMultiple("post-subscriptions");
  return new Response("OK", { status: 200 });
}
