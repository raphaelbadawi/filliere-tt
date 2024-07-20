export default async function getPosts(pageNumber: number, pageSize: number, filters?: string, latest?: boolean) {
  let append = "";

  if (latest) {
    append += `?pagination[limit]=${pageSize}`
  } else {
    append += `?pagination[page]=${pageNumber}&pagination[pageSize]=${pageSize}`;
  }

  if (typeof filters != "undefined" && filters.length > 0) {
    append += filters;
  }

  const bearer = `Bearer ${process.env.STRAPI_TOKEN}`;
  const res = await fetch(
    `${process.env.STRAPI_DOCKER_NETWORK_ENDPOINT}/api/posts${append}&sort=createdAt:desc&populate=*`,
    { headers: { Authorization: bearer }, cache: "no-store" }
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
