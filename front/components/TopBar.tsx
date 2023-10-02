"use client";

import useMediaQuery from "@/utils/useMediaQuery";
import NavBar from "./NavBar";
import NavBarMobile from "./NavBarMobile";

export default function TopBar({ links }: { links: { href: string, title: string }[] }) {
    const isDesktop = useMediaQuery('(min-width: 960px)');

    if (isDesktop === null) {
        return (
            <div className="absolute">Chargement en cours</div>
        )
    } else if (isDesktop) {
        return (
            <nav className="bg-backlight absolute flex justify-center w-full">
                <NavBar links={links} />
            </nav>
        )
    } else {
        return (
            <nav className="absolute flex justify-center w-full">
                <NavBarMobile links={links} />
            </nav>)
    }
}