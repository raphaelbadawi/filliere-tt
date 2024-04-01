import Link from "next/link";

export default function Footer() {
    return (
        <footer className="relative">
            <div className="relative py-4 text-center z-10">
                <Link href="/" className="text-primary hover:underline">S'abonner à la newsletter du club</Link>
                <address className="text-foreground not-italic">Gymnase du Parmelan, 74570 GROISY</address>
                <p className="text-gray-500">&copy; {new Date().getFullYear()} Fillière TT.</p>
            </div>
            <div className="absolute block inset-0 shadow-reverse"></div>
        </footer>
    );
};
