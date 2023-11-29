"use client";

import SimpleForm from "@/components/containers/SimpleForm";

export default function Contact() {
    const submitHandler = async (author: string, email: string, content: string) => {
        const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ author, email, content }) });
        return res;
    }
    return <SimpleForm submitHandler={submitHandler} title="Nous envoyer un message" contentValidationString="Votre message doit faire au moins 10 caractères" textAreaPlaceholder="Votre message" submitNotice="Le message nous sera envoyé directement par mail" successNotice="Votre message a été envoyé avec succès" />
}