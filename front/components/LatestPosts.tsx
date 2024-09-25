import Link from 'next/link';
import getPosts from '@/services/getPosts';
import { Post } from '@/types';

export default async function LatestPosts() {
    const { data } = await getPosts(1, 10, "", true);

    return (
        <div className="mt-4 mx-auto p-4 sm:p-6 text-white rounded-lg bg-gradient-to-br from-black via-black to-accent">
            <h2 className="text-2xl font-semibold">Dernières actus</h2>
            <hr className="my-2 relative border-white border-t-2 rounded-full" />
            <ul className={`space-y-2`}>
                {data && data.map((post: Post, index: number) => (
                    <li key={index} className="relative pl-6 group">
                        <Link className="block transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:translate-x-[5%] group-hover:font-semibold" href={`/news/${post.slug}`}>
                            {post.title}
                        </Link>
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 transition-opacity duration-1000 ease-in-out group-hover:opacity-0">👉</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}


