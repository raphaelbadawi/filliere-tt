import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function NavBarMobile({ links }: { links: { href: string, title: string }[] }) {
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
            <button className="nav-burger fixed z-20 left-6 top-6 p-2 rounded-md" onClick={() => setOpen(!open)}>
                <div className="w-6 h-1 bg-foreground mb-1 transition-all duration-300" style={burgerStyles[0]} />
                <div className="w-6 h-1 bg-foreground mb-1 transition-all duration-300" style={burgerStyles[1]} />
                <div className="w-6 h-1 bg-foreground mb-1 transition-all duration-300" style={burgerStyles[2]} />
            </button>
            <ul className={`z-10 pt-24 flex flex-col justify-start p-4 gap-4 relative rounded-xl bg-background shadow-xl shadow-primary ${open ? "translate-x-0" : "-translate-x-full"} transition-all duration-300`}>
                {links && links.map((link, index) =>
                    <li
                        key={index}
                        className="nav-item relative"
                    >
                        <Link
                            className={`nav-link text-xl font-semibold uppercase hover:text-accent transition-colors duration-300 ease-in-out ${pathname == link.href ? "text-accent" : "text-foreground"}`}
                            href={{ pathname: link.href }}
                        >
                            {link.title}
                        </Link>
                    </li>
                )}
            </ul>
        </nav>);
}