"use client";

import { useEffect, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { z } from "zod"
import Spinner from "./Spinner";
import { Post } from "@/types";
import postComment from "@/services/postComment";
import { verifyCaptcha } from "@/services/verifyCaptcha";

export default function CommentForm({ post }: { post: Post }) {
    const commentFormSchema = z.object({
        username: z.string().min(3, "Le nom d'utilisateur doit faire au moins 3 caractères"),
        email: z.string().email("Vous devez saisir une adresse email valide"),
        comment: z.string().min(10, "Votre commentaire doit faire au moins 10 caractères"),
    });

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [comment, setComment] = useState("");
    const [spinner, setSpinner] = useState(false);
    const [errors, setErrors] = useState<z.inferFlattenedErrors<typeof commentFormSchema>>();
    const [hasErrors, setHasErrors] = useState(false);

    const recaptchaRef = useRef<ReCAPTCHA>(null)
    const [isVerified, setIsVerified] = useState<boolean>(false)
    async function onReCAPTCHAChange(token: string | null) {
        const res = await verifyCaptcha(token);
        if (res != "OK") {
            setIsVerified(false);
            return;
        }
        setIsVerified(true);
    }

    let hasDarkMode = false;
    useEffect(() => {
        hasDarkMode = localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }, [])

    const clickHandler: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
        e.preventDefault();
        try {
            const parsedInput = commentFormSchema.safeParse({ username, email, comment });
            if (!parsedInput.success) {
                setErrors(parsedInput.error.flatten());
                setHasErrors(true);
                return;
            }
            setHasErrors(false);
            if (!isVerified) {
                toast.error("Veuillez cocher la case qui vérifie que vous n'êtes pas un robot");
                return;
            }
            setSpinner(true);
            const res = await postComment({ author: username, email, content: comment, post: post.id })
            setSpinner(false);
            if (res != "OK") {
                toast.error("Quelque chose s'est mal passé");
                return;
            }
            toast.success("Votre commentaire a été proposé avec succès, il sera validé prochainement", {});
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex flex-col gap-3 w-full mt-4 mx-auto px-10 py-6 rounded bg-gradient-to-r from-black to-white">
            <h2 className="text-3xl">Poster un nouveau commentaire</h2>
            <hr className="border-white border-t-4 rounded-full"></hr>
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="flex flex-wrap gap-2 w-full">
                    <div className="flex flex-col flex-grow">
                        <label className="block text-gray-700 text-sm font-bold" htmlFor="usernameInput">
                            Mon nom
                        </label>
                        <input className="shadow appearance-none border rounded p-2 text-gray-700 leading-tight outline-none focus:border-b-2 focus:border-b-primary" id="usernameInput" name="usernameInput" onChange={e => setUsername(e.target.value)} type="text" placeholder="Mon nom"></input>
                        {hasErrors && errors?.fieldErrors?.username && (
                            <p className="text-red-500">{errors.fieldErrors["username"]}</p>
                        )}
                    </div>
                    <div className="flex flex-col flex-grow">
                        <label className="block text-gray-700 text-sm font-bold" htmlFor="emailInput">
                            Mon email
                        </label>
                        <input className="shadow appearance-none border rounded p-2 text-gray-700 leading-tight outline-none focus:border-b-2 focus:border-b-primary" id="emailInput" name="emailInput" onChange={e => setEmail(e.target.value)} type="email" placeholder="Mon email"></input>
                        {hasErrors && errors?.fieldErrors?.email && (
                            <p className="text-red-500">{errors.fieldErrors["email"]}</p>
                        )}
                    </div>
                </div>
                <div className="mt-6 flex flex-col w-full">
                    <label className="block text-gray-700 text-sm font-bold" htmlFor="commentInput">
                        Mon commentaire
                    </label>
                    <textarea className="shadow appearance-none rounded p-2 text-gray-700 leading-tight outline-none focus:border-b-2 focus:border-b-primary" id="commentInput" name="commentInput" onChange={e => setComment(e.target.value)} placeholder="Mon commentaire"></textarea>
                    {hasErrors && errors?.fieldErrors?.comment && (
                        <p className="text-red-500">{errors.fieldErrors["comment"]}</p>
                    )}
                </div>
                <div className="mt-6 flex flex-col items-center gap-2">
                    <button className="bg-primary text-white font-bold py-2 px-4 rounded outline-none scale-100 hover:shadow-lg hover:shadow-accent hover:scale-110 transition-all duration-300" onClick={clickHandler} type="button" id="commentButton">
                        {spinner && (
                            <Spinner height="1rem" width="1rem" thickness="2px" addedClasses="mr-2" />
                        )}
                        Publier
                    </button>
                    <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_PUBLIC_KEY || ""}
                        onChange={onReCAPTCHAChange}
                    />
                    <ToastContainer theme={hasDarkMode ? "dark" : "light"} />
                    <label className="block text-gray-700 text-xs" htmlFor="commentButton">
                        Le commentaire ne sera visible qu'après validation par un modérateur
                    </label>
                </div>
            </form>
        </div>
    )
}