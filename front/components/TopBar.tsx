import NavBar from "./NavBar";

export default function TopBar({ links }: { links: string[] }) {
    return (
        <div>
            <NavBar links={links} />
        </div>
    )
}