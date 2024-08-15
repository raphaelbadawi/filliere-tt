export default async function getMultiple(type: string = "cards", filters?: string) {
    let append = "";
    if (typeof filters != "undefined" && filters.length > 0) {
        append += filters;
    }
    const bearer = `Bearer ${process.env.STRAPI_TOKEN}`;
    const res = await fetch(
        `${process.env.STRAPI_DOCKER_NETWORK_ENDPOINT}/api/${type}/?populate=*${append}`,
        { headers: { Authorization: bearer }, cache: "no-store" }
    );
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
    }
    return res.json();
}
