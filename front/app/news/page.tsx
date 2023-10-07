import getPosts from "@/services/getPosts";

export default async function News() {
    const { data } = await getPosts();
    /** @todo show all attributes, style post snippets, put post snippet in separate component, add pagination, create single post page, add tags and comments */
    return (
        <div>
            {data && data.map((post: any, index: any) =>
                <div key={index}>{post.attributes.title}</div>
            )}
        </div>
    )
}
