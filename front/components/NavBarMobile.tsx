"use client";

import Link from "next/link";
import Image from "next/image";
import { ReactNode, useState } from "react";
import { usePathname } from "next/navigation";
import DarkModeSwitch from "./DarkModeSwitch";

export default function NavBarMobile({ links }: { links: { href: string, title: string, icon: ReactNode }[] }) {
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
        <nav className="absolute left-0">
            <Link className="fixed m-2 z-20" href="/"><Image alt="Accueil" width="56" height="56" src="/icons/logo.png"></Image></Link>
            <button className="nav-burger fixed z-20 left-16 top-6 p-2 rounded-md" onClick={() => setOpen(!open)}>
                <div className="w-6 h-1 bg-foreground mb-1 transition-all duration-300" style={burgerStyles[0]} />
                <div className="w-6 h-1 bg-foreground mb-1 transition-all duration-300" style={burgerStyles[1]} />
                <div className="w-6 h-1 bg-foreground mb-1 transition-all duration-300" style={burgerStyles[2]} />
            </button>
            <ul className={`fixed z-10 pt-24 flex flex-col justify-start p-4 gap-4 rounded-br-xl rounded- bg-background shadow-xl shadow-primary ${open ? "translate-x-0" : "-translate-x-full"} transition-all duration-300`}>
                {links && links.map((link, index) =>
                    <li
                        key={index}
                        className="nav-item relative"
                    >
                        <Link
                            className={`flex items-center  gap-1 nav-link text-xl font-semibold uppercase transition-colors duration-300 ease-in-out ${pathname.startsWith(link.href) ? "text-accent" : "text-foreground"}`}
                            href={{ pathname: link.href }}
                        >
                            <span className="icon">{link.icon}</span>
                            {link.title}
                        </Link>
                    </li>
                )}
            </ul>
            <span className="fixed right-2 z-20 top-6"><DarkModeSwitch  /></span>
        </nav>)
}