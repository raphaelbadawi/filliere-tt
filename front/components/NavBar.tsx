"use client";

import Link from "next/link";
import Image from "next/image";
import { ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import DarkModeSwitch from "./DarkModeSwitch";

export default function NavBar({ links }: { links: { href: string, title: string, icon: ReactNode }[] }) {
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
        let activeIndex = -1;
        links.forEach((link, index) => {
            if (pathname.startsWith(link.href)) {
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
        const underlineStyle = computeUnderlineStyle(activeIndex);
        setUnderlineStyle(underlineStyle);
    }, [pathname]);

    return (
        <nav className="relative w-full shadow-lg shadow-primary">
            <Link className="absolute m-2 z-10" href="/"><Image alt="Accueil" width="56" height="56" src="/icons/logo.png"></Image></Link>
            <ul className="relative left-1/2 -translate-x-1/2 flex p-4 gap-4 justify-center" onMouseLeave={handleMouseLeave}
            >
                {links && links.map((link, index) =>
                    <li
                        key={index}
                        className="nav-item relative"
                        onMouseEnter={() => handleMouseEnter(index)}
                    >
                        <Link
                            className={`flex items-center gap-1 nav-link text-xl font-semibold transition-colors duration-300 ease-in-out ${pathname.startsWith(link.href) ? "text-accent" : "text-secondary"}`}
                            href={{ pathname: link.href }}
                        >
                            <span className="icon">{link.icon}</span>
                            {link.title}
                        </Link>
                    </li>
                )}
                {underlineStyle.width !== "0px" &&
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
            <span className="absolute top-2 right-2"><DarkModeSwitch  /></span>
        </nav>);
}
