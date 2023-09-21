import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function NavBarMobile({ links }: { links: { href: string, title: string }[] }) {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    // TODO FIX OFFSET
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
            <button className="nav-burger fixed z-10 left-6 top-6 p-2 rounded-md bg-secondary" onClick={() => setOpen(!open)}>
                <div className="w-6 h-1 bg-gray-800 mb-1 transition-all duration-300" style={burgerStyles[0]} />
                <div className="w-6 h-1 bg-gray-800 mb-1 transition-all duration-300" style={burgerStyles[1]} />
                <div className="w-6 h-1 bg-gray-800 mb-1 transition-all duration-300" style={burgerStyles[2]} />
            </button>
            <ul className={`pt-24 flex flex-col justify-start p-4 gap-4 relative ${open ? "translate-x-0" : "-translate-x-full"} transition-all duration-300 bg-black bg-opacity-20`}>
                {links && links.map((link, index) =>
                    <li
                        key={index}
                        className="nav-item relative"
                    >
                        <Link
                            className={`nav-link text-xl font-semibold uppercase hover:text-accent transition-colors duration-300 ease-in-out ${pathname == link.href ? "text-accent" : "text-secondary"}`}
                            href={{ pathname: link.href }}
                        >
                            {link.title}
                        </Link>
                    </li>
                )}
            </ul>
        </nav>);
}