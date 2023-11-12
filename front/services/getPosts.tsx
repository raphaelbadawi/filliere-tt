export default async function getPosts(pageNumber: number, pageSize: number, filters?: object) {
  let append = "";
  if (typeof filters != "undefined" && Object.keys(filters).length) {
    append += "&filters=";
    for (const [key, value] of Object.entries(filters)) {
      append += `\[${key}\][$eq]=${value}`;
    } 
  }
  const bearer = `Bearer ${process.env.STRAPI_TOKEN}`;
  const res = await fetch(
    `${process.env.STRAPI_DOCKER_NETWORK_ENDPOINT}/api/posts?pagination[page]=${pageNumber}&pagination[pageSize]=${pageSize}&sort=createdAt:desc${append}&populate=*`,
    { headers: { Authorization: bearer }, cache: "no-store" }
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
