"use client";

import SimpleForm from "@/components/containers/SimpleForm";

/** @todo rework contact form to have a common container (wrapper) passing form label, textarea placeholder and submit function (which will be dissociated from the validation logic) ; use nodemailer */
export default function Contact() {
    const submitHandler = () => { return "OK" };
    return <SimpleForm submitHandler={submitHandler} title="Nous envoyer un message" contentValidationString="Votre message doit faire au moins 10 caractères" textAreaPlaceholder="Votre message" submitNotice="Le message nous sera envoyé directement par mail" successNotice="Votre message a été envoyé avec succès" />
}