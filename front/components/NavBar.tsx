import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function NavBar({ links }: { links: { href: string, title: string }[] }) {
    const pathname = usePathname();
    const [underlineStyle, setUnderlineStyle] = useState({ width: "0px", offset: "0px" });
    console.log(underlineStyle);
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
        <nav className="w-full shadow-lg shadow-primary">
            <Link className="absolute m-2    z-10" href="/"><Image alt="Accueil" width="56" height="56" src="/icons/logo.png"></Image></Link>
            <ul className="left-1/2 -translate-x-1/2 flex p-4 gap-4 justify-center relative" onMouseLeave={handleMouseLeave}
            >
                {links && links.map((link, index) =>
                    <li
                        key={index}
                        className="nav-item relative"
                        onMouseEnter={() => handleMouseEnter(index)}
                    >
                        <Link
                            className={`nav-link text-xl font-semibold hover:text-accent transition-colors duration-300 ease-in-out ${pathname == link.href ? "text-accent" : "text-secondary"}`}
                            href={{ pathname: link.href }}
                        >
                            {link.title}
                        </Link>
                    </li>
                )}
                {underlineStyle.width !== "0px" && pathname !== "/" &&
                    <div
                        className="underline absolute bottom-2 left-0"
                        style={{
                            width: underlineStyle.width,
                            height: "2px",
                            backgroundColor: "rgb(var(--accent-rgb))",
                            transition: "all 0.3s ease-in-out",
                            transform: `translateX(${underlineStyle.offset})`,
                        }}
                    />
                }
            </ul>
        </nav>);
}
