import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function NavBar({ links }: { links: { href: string, title: string }[] }) {
    const pathname = usePathname();
    const [underlineStyle, setUnderlineStyle] = useState({ width: "0px", offset: "0px" });
    const [activeIndex, setActiveIndex] = useState(0);


    const computeUnderlineStyle = (index: number): { width: string, offset: string } => {
        const item = document.querySelectorAll('.nav-item')[index];
        if (item && item.parentElement) {
            const itemRect = item.getBoundingClientRect();
            const parentRect = item.parentElement.getBoundingClientRect();
            const offset = itemRect.left - parentRect.left;
            return { width: `${itemRect.width}px`, offset: `${offset}px` };
        }
        return { width: "0px", offset: "0px" };
    }

    const computeActiveIndex = () => {
        let activeIndex = 0;
        links.forEach((link, index) => {
            if (link.href == pathname) {
                activeIndex = index;
            }
        })
        return activeIndex;
    }

    const handleMouseEnter = (index: number) => {
        setUnderlineStyle(computeUnderlineStyle(index));
    };

    const handleMouseLeave = () => {
        setUnderlineStyle(computeUnderlineStyle(activeIndex));
    };

    useEffect(() => {
        const activeIndex = computeActiveIndex();
        setActiveIndex(activeIndex);
        setUnderlineStyle(computeUnderlineStyle(activeIndex));
    }, [pathname]);

    return (
        <nav className="flex justify-center bg-black bg-opacity-20 w-full backdrop-blur-xl shadow-xl">
            <ul className="flex p-4 gap-4 justify-center relative" onMouseLeave={handleMouseLeave}
            >
                {links && links.map((link, index) =>
                    <li
                        key={index}
                        className="nav-item relative"
                        onMouseEnter={() => handleMouseEnter(index)}
                    >
                        <Link
                            className={`nav-link text-lg hover:text-accent transition-colors duration-300 ease-in-out ${pathname == link.href ? "text-accent" : "text-secondary"}`}
                            href={{ pathname: link.href }}
                        >
                            {link.title}
                        </Link>
                    </li>
                )}
                <div
                    className="underline absolute bottom-4 left-0"
                    style={{
                        width: underlineStyle.width,
                        height: "2px",
                        backgroundColor: "rgb(var(--accent-rgb))",
                        transition: "all 0.3s ease-in-out",
                        transform: `translateX(${underlineStyle.offset})`,
                    }}
                />
            </ul>
        </nav>);
}
