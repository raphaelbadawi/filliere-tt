"use client";

import useMediaQuery from "@/utils/useMediaQuery";
import NavBar from "./NavBar";
import NavBarMobile from "./NavBarMobile";

export default function TopBar({ links }: { links: { href: string, title: string }[] }) {
    const isDesktop = useMediaQuery('(min-width: 960px)');

    if (isDesktop === null) {
        return (
            <div>Chargement en cours</div>
        )
    } else if (isDesktop) {
        return (
            <nav className="flex justify-center bg-black bg-opacity-20 w-full backdrop-blur-xl shadow-xl">
                <NavBar links={links} />
            </nav>
        )
    } else {
        return (
            <nav className="flex justify-center bg-black bg-opacity-20 w-full backdrop-blur-xl shadow-xl">
                <NavBarMobile links={links} />
            </nav>)
    }
}