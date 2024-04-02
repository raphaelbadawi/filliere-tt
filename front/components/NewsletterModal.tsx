"use client";

import Swal from 'sweetalert2';

const openNewsletterModal: React.MouseEventHandler<HTMLAnchorElement> = async (e) => {
    e.preventDefault();
    const result = await Swal.fire({
        text: "Veuillez saisir votre adresse mail :",
        input: "text",
        inputAttributes: {
            autocapitalize: "off"
        },
        heightAuto: false,
        showCancelButton: true,
        buttonsStyling: false,
        customClass: {
            confirmButton: "bg-primary text-white font-bold py-2 px-4 rounded outline-none",
            cancelButton: "bg-accent text-white font-bold py-2 px-4 rounded outline-none",
            actions: "gap-4",
        },
        preConfirm: async (mail: string) => {
            // call subscribe api
            // return Swal.showValidationMessage("Quelque chose s'est mal passé");
            return "OK";
        },
        
    });
    if (result.isConfirmed) {
        Swal.fire({text: result.value});
    }
}

export default function NewsletterModal() {
    return (
        <a onClick={openNewsletterModal} href="/" className="text-primary hover:underline">S'abonner à la newsletter du club</a>
    );
};
