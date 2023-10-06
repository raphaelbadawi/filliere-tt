import "./TopBar.css";
import NavBar from "./NavBar";
import NavBarMobile from "./NavBarMobile";
import { ReactNode } from "react";

export default function TopBar({ links }: { links: { href: string, title: string, icon: ReactNode }[] }) {
    return (
        <>
            <header className="bg-backlight absolute lg:flex hidden justify-center w-full">
                <NavBar links={links} />
            </header>
            <header id="topbar" className="absolute  lg:hidden flex justify-center w-full">
                <NavBarMobile links={links} />
            </header>
        </>
    )
}