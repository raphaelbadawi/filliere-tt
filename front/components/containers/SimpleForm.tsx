"use client";

import { useEffect, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { z } from "zod"
import Spinner from "@/components/Spinner";
import { verifyCaptcha } from "@/services/verifyCaptcha";

export default function SimpleForm({ submitHandler, title, color = "primary", contentValidationString, textAreaPlaceholder, submitNotice, successNotice }: { submitHandler: Function, title: string, color?: string, contentValidationString: string, textAreaPlaceholder: string, submitNotice: string, successNotice: string }) {
    const contentFormSchema = z.object({
        username: z.string().min(3, "Le nom d'utilisateur doit faire au moins 3 caractères"),
        email: z.string().email("Vous devez saisir une adresse email valide"),
        content: z.string().min(10, contentValidationString),
    });

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [content, setContent] = useState("");
    const [spinner, setSpinner] = useState(false);
    const [errors, setErrors] = useState<z.inferFlattenedErrors<typeof contentFormSchema>>();
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

    // We use a ref so we don't lose the value after each render
    let hasDarkMode = useRef(false);
    useEffect(() => {
        hasDarkMode.current = localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }, [])

    const clickHandler: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
        e.preventDefault();
        try {
            const parsedInput = contentFormSchema.safeParse({ username, email, content });
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
            const res = await submitHandler(username, email, content);
            setSpinner(false);
            if (!res.ok && res != "OK") {
                toast.error("Quelque chose s'est mal passé");
                return;
            }
            toast.success(successNotice, {});
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={`flex flex-col gap-3 w-full mt-4 mx-auto px-10 py-6 rounded bg-gradient-to-r from-transparent via-${color} to-transparent`}>
            <h2 className="text-3xl">{title}</h2>
            <hr className="border-white border-t-4 rounded-full"></hr>
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="flex flex-wrap gap-2 w-full">
                    <div className="flex flex-col flex-grow max-w-full">
                        <label className="block text-gray-700 text-sm font-bold" htmlFor="usernameInput">
                            Mon nom
                        </label>
                        <input className="shadow appearance-none border rounded p-2 text-gray-700 leading-tight outline-none focus:border-b-2 focus:border-b-primary" id="usernameInput" name="usernameInput" onChange={e => setUsername(e.target.value)} type="text" placeholder="Mon nom"></input>
                        {hasErrors && errors?.fieldErrors?.username && (
                            <p className="text-red-500">{errors.fieldErrors["username"]}</p>
                        )}
                    </div>
                    <div className="flex flex-col flex-grow max-w-full">
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
                    <label className="block text-gray-700 text-sm font-bold" htmlFor="contentInput">
                        {textAreaPlaceholder}
                    </label>
                    <textarea className="shadow appearance-none rounded p-2 text-gray-700 leading-tight outline-none focus:border-b-2 focus:border-b-primary" id="contentInput" name="contentInput" onChange={e => setContent(e.target.value)} placeholder={textAreaPlaceholder}></textarea>
                    {hasErrors && errors?.fieldErrors?.content && (
                        <p className="text-red-500">{errors.fieldErrors["content"]}</p>
                    )}
                </div>
                <div className="mt-6 flex flex-col items-center gap-2">
                    <button className="bg-primary text-white font-bold py-2 px-4 rounded outline-none scale-100 hover:shadow-2xl hover:scale-110 transition-all duration-300" onClick={clickHandler} type="button" id="contentButton">
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
                    <ToastContainer theme={hasDarkMode.current ? "dark" : "light"} />
                    <label className="block text-gray-700 text-xs" htmlFor="contentButton">
                        {submitNotice}
                    </label>
                </div>
            </form>
        </div>
    )
}