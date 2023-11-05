export default async function getPost(slug: string) {
    const bearer = `Bearer ${process.env.STRAPI_TOKEN}`;
    const res = await fetch(
      `${process.env.STRAPI_DOCKER_NETWORK_ENDPOINT}/api/posts?filters\[slug\][$eq]=${slug}&populate=*`,
      { headers: { Authorization: bearer }, cache: "no-store" }
    );
  
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
    }
    return res.json();
  }
  