import Link from "next/link";
import { FaAngleLeft, FaAngleRight, FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";

export default function Paginator({ endpoint, pageNumber, totalPageCount, pageSize, totalPosts }: { endpoint: string, pageNumber: number, totalPageCount: number, pageSize: number, totalPosts: number }) {
    if (totalPageCount <= 1) {
        // Don't display the paginator if there's only one page
        return null;
    }

    const isFirstPage = pageNumber === 1;
    const isLastPage = pageNumber === totalPageCount;

    return (
        <div className="sticky bottom-0 z-20 flex justify-center my-4 space-x-2">
            <Link
                href={`${endpoint}?page=1`}
                className={`px-3 py-1 border rounded flex items-center transition-all duration-300 ${isFirstPage ? 'bg-accent hover:bg-white text-white hover:text-accent' : 'bg-white hover:bg-accent text-accent hover:text-white'}`}
            >
                <FaAnglesLeft />
            </Link>
            {!isFirstPage && (
                <Link
                    className="px-3 py-1 ml-4 flex items-center border rounded bg-accent hover:bg-white text-white hover:text-accent transition-all duration-300"
                    href={`${endpoint}?page=${pageNumber - 1}`}
                >
                    <FaAngleLeft />
                </Link>
            )}
            <Link
                href={`${endpoint}?page=${pageNumber}`}
                className={`px-3 py-1 border rounded bg-accent hover:bg-white text-white hover:text-accent transition-all duration-300`}
            >
                {pageNumber}
            </Link>
            {!isLastPage && (
                <Link
                    className="px-3 py-1 ml-4 flex items-center border rounded bg-accent hover:bg-white text-white hover:text-accent transition-all duration-300"
                    href={`${endpoint}?page=${pageNumber + 1}`}
                >
                    <FaAngleRight />
                </Link>
            )}   
            <Link
                href={`${endpoint}?page=${totalPageCount}`}
                className={`px-3 py-1 border rounded flex items-center transition-all duration-300 ${isLastPage? 'bg-accent hover:bg-white text-white hover:text-accent' : 'bg-white hover:bg-accent text-accent hover:text-white'}`}
            >
                <FaAnglesRight />
            </Link>
        </div>
    );
}