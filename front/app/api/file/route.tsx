export async function GET(req: Request) {
    const {searchParams} = new URL(req.url);
    const encodedFileAttributes = searchParams.get("file") || "";
    const fileAttributes = JSON.parse(atob(encodedFileAttributes));
    const fileUrl = `${process.env.STRAPI_DOCKER_NETWORK_ENDPOINT}${fileAttributes.url}`
    const response = await fetch(fileUrl);
    if (!response.ok) {
        return new Response("KO", {status: 500});
    }
    const headers = new Headers();
    headers.append("Content-Type", fileAttributes.mime);
    headers.append("Content-Disposition", "attachment; filename=" + fileAttributes.name);
    return new Response(response.body, { headers });
}