"use client";

import Link from "next/link";
import Image from "next/image";
import { ReactNode, useState } from "react";
import { usePathname } from "next/navigation";
import DarkModeSwitch from "./DarkModeSwitch";

export default function NavBarMobile({ links }: { links: { href: string, title: string, icon: ReactNode, blank?: boolean }[] }) {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const burgerStyles = [
        {
            transform: open ? 'rotate(45deg)' : 'rotate(0)',
            transformOrigin: "1px center 0px",
        },
        {
            transform: open ? 'translateX(20px)' : 'translate(0)',
            opacity: open ? '0' : '100%',
        },
        {
            transform: open ? 'rotate(-45deg)' : 'rotate(0)',
            transformOrigin: "1px center 0px",
        }
    ]

    return (
        <nav className="flex xl:hidden relative left-0 gap-2">
            <Link className="z-20 m-2" href="/" onClick={() => setOpen(false)}><Image alt="Accueil" width="56" height="56" src="/icons/logo.png"></Image></Link>
            <button className="z-20 nav-burger rounded-md" onClick={() => setOpen(!open)}>
                <div className="w-6 h-1 bg-foreground mb-1 transition-all duration-300" style={burgerStyles[0]} />
                <div className="w-6 h-1 bg-foreground mb-1 transition-all duration-300" style={burgerStyles[1]} />
                <div className="w-6 h-1 bg-foreground mb-1 transition-all duration-300" style={burgerStyles[2]} />
            </button>
            <ul className={`absolute pt-16 flex flex-col justify-start p-4 gap-4 rounded-br-xl bg-background shadow-primary ${open ? "translate-x-0 shadow-xl" : "-translate-x-full shadow-none"} transition-all duration-300`}>
                {links && links.map((link, index) =>
                    <li
                        key={index}
                        className="nav-item relative"
                        onClick={() => setOpen(false)}
                    >
                        <Link
                            className={`flex items-center gap-4 nav-link text-xl font-semibold uppercase transition-colors duration-300 ease-in-out ${pathname.startsWith(link.href) ? "text-accent" : "text-foreground"}`}
                            href={{ pathname: link.href }}
                            {...(link.blank ? { target: "_blank" } : {})}
                        >
                            <span className="icon">{link.icon}</span>
                            {link.title}
                        </Link>
                    </li>
                )}
            </ul>
            <span className="absolute right-2 top-2"><DarkModeSwitch  /></span>
        </nav>)
}