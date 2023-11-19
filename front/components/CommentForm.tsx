"use client";

import { useState } from "react";
import { z } from "zod"

export default function CommentForm() {

    const commentFormSchema = z.object({
        username: z.string().min(3, "Le nom d'utilisateur doit faire au moins 3 caractères"),
        email: z.string().email("Vous devez saisir une adresse email valide"),
        comment: z.string().min(10, "Votre commentaire doit faire au moins 10 caractères"),
    });

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [comment, setComment] = useState("");
    const [errors, setErrors] = useState<z.inferFlattenedErrors<typeof commentFormSchema>>();

    const clickHandler: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
        e.preventDefault();
        try {
            const parsedInput = commentFormSchema.safeParse({ username, email, comment });
            if (!parsedInput.success) {
                setErrors(parsedInput.error.flatten());
            } else {
                // SUBMIT HERE
            }
        } catch (error) {
            setUsername("");
            setEmail("");
            setComment("")
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
                        {errors?.fieldErrors?.username && (
                            <p className="text-red-500">{errors.fieldErrors["username"]}</p>
                        )}
                    </div>
                    <div className="flex flex-col flex-grow">
                        <label className="block text-gray-700 text-sm font-bold" htmlFor="emailInput">
                            Mon mail
                        </label>
                        <input className="shadow appearance-none border rounded p-2 text-gray-700 leading-tight outline-none focus:border-b-2 focus:border-b-primary" id="emailInput" name="emailInput" onChange={e => setEmail(e.target.value)} type="email" placeholder="Mon email"></input>
                        {errors?.fieldErrors?.email && (
                            <p className="text-red-500">{errors.fieldErrors["email"]}</p>
                        )}
                    </div>
                </div>
                <div className="mt-6 flex flex-col w-full">
                    <label className="block text-gray-700 text-sm font-bold" htmlFor="commentInput">
                        Mon commentaire
                    </label>
                    <textarea className="shadow appearance-none rounded p-2 text-gray-700 leading-tight outline-none focus:border-b-2 focus:border-b-primary" id="commentInput" name="commentInput" onChange={e => setComment(e.target.value)} placeholder="Mon commentaire"></textarea>
                    {errors?.fieldErrors?.comment && (
                        <p className="text-red-500">{errors.fieldErrors["comment"]}</p>
                    )}
                </div>
                <div className="mt-6 flex flex-col items-center gap-2">
                    <button className="bg-primary text-white font-bold py-2 px-4 rounded outline-none scale-100 hover:shadow-lg hover:shadow-accent hover:scale-110 transition-all duration-300" onClick={clickHandler} type="button" id="commentButton">
                        Publier
                    </button>
                    <label className="block text-gray-700 text-xs" htmlFor="commentButton">
                        Le commentaire ne sera visible qu'après validation par un modérateur
                    </label>
                </div>
            </form>
        </div>
    )
}