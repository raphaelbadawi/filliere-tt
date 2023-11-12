import "./TopBar.css";
import NavBar from "./NavBar";
import NavBarMobile from "./NavBarMobile";
import { ReactNode } from "react";

export default function TopBar({ links }: { links: { href: string, title: string, icon: ReactNode }[] }) {
    return (
        <header id="topbar" className="z-10 bg-backlight fixed justify-center w-full">
            <NavBar links={links} />
            <NavBarMobile links={links} />
        </header>
    )
}