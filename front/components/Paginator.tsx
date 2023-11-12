import Link from "next/link";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";

export default function Paginator({endpoint, pageNumber, totalPageCount, pageSize, totalPosts}: {endpoint: string, pageNumber: number, totalPageCount: number, pageSize: number, totalPosts: number}) {
    return (<div className="sticky bottom-0 z-20 flex justify-center my-4 space-x-2">
        {pageNumber > 1 && (
            <Link
                className="px-3 py-1 ml-4 flex items-center border rounded bg-accent hover:bg-white text-white hover:text-accent transition-all"
                href={`/news?page=${pageNumber - 1}`}
            >
                <FaAnglesLeft />
            </Link>
        )}
        {Array.from({ length: Math.min(5, totalPageCount) }).map((_, idx) => (
            <Link
                key={idx}
                href={`/news?page=${idx + 1}`}
                className={`px-3 py-1 border rounded transition-all ${pageNumber === idx + 1 ? 'bg-accent hover:bg-white text-white hover:text-accent' : 'bg-white hover:bg-accent text-accent hover:text-white'}`}
            >
                {idx + 1}
            </Link>
        ))}
        {pageNumber * pageSize < totalPosts && (
            <Link
                className="px-3 py-1 ml-4 border rounded bg-accent hover:bg-white text-white hover:text-accent transition-all"
                href={`${endpoint}?page=${pageNumber + 1}`}
            >
                <FaAnglesRight />
            </Link>
        )}
    </div>)
}