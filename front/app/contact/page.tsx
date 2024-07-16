import ContactComponent from "@/components/ContactComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Fillière TT | Contact",
};

export default function Contact() {
    return (
        <section id="contact" className="w-screen">
            <ContactComponent />
        </section>
    )
}