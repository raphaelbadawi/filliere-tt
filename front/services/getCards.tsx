export default async function getCards() {
    const bearer = `Bearer ${process.env.STRAPI_TOKEN}`;
    const res = await fetch(
        `${process.env.STRAPI_DOCKER_NETWORK_ENDPOINT}/api/cards?populate=*`,
        { headers: { Authorization: bearer } }
    );
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
    }
    return res.json();
}
