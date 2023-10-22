export default async function getPosts(pageNumber: number, pageSize: number) {
  const bearer = `Bearer ${process.env.STRAPI_TOKEN}`;
  const res = await fetch(
    `${process.env.STRAPI_DOCKER_NETWORK_ENDPOINT}/api/posts?pagination[page]=${pageNumber}&pagination[pageSize]=${pageSize}&populate=*`,
    { headers: { Authorization: bearer } }
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
