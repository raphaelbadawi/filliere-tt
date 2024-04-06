"use client";

import subscribe from '@/services/subscribe';
import Swal from 'sweetalert2';
import { z } from "zod"

const openNewsletterModal: React.MouseEventHandler<HTMLAnchorElement> = async (e) => {
    e.preventDefault();
    const contentFormSchema = z.object({
        email: z.string().email("Vous devez saisir une adresse email valide"),
    });
    const result = await Swal.fire({
        text: "Veuillez saisir votre adresse mail :",
        input: "text",
        inputAttributes: {
            autocapitalize: "off"
        },
        heightAuto: false,
        showCancelButton: true,
        cancelButtonText: "Annuler",
        buttonsStyling: false,
        customClass: {
            confirmButton: "bg-primary text-white font-bold py-2 px-4 rounded outline-none",
            cancelButton: "bg-accent text-white font-bold py-2 px-4 rounded outline-none",
            actions: "gap-4",
        },
        preConfirm: async (email: string) => {
            const parsedInput = contentFormSchema.safeParse({ email });
            if (!parsedInput.success) {
                return Swal.showValidationMessage("Veuillez saisir une adresse mail valide");

            }
            const response = await subscribe(email);
            if (response !== "OK") {
                return Swal.showValidationMessage(response);
            }
            return "Vous êtes désormais inscrit à la newsletter du club";
        },

    });
    if (result.isConfirmed) {
        Swal.fire({
            heightAuto: false,
            text: result.value
        });
    }
}

export default function NewsletterModal() {
    return (
        <a onClick={openNewsletterModal} href="/" className="text-primary hover:underline">S&apos;abonner à la newsletter du club</a>
    );
};
