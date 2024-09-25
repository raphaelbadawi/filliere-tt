"use client";

import 'react-toastify/dist/ReactToastify.css';
import { Post } from "@/types";
import postComment from "@/services/postComment";
import SimpleForm from "./containers/SimpleForm";

export default function CommentForm({ post }: { post: Post }) {
    const submitHandler = async (author: string, email: string, content: string) => {
        const res = await postComment({ author, email, content, post: post.documentId });
        return res;
    }
    return <SimpleForm submitHandler={submitHandler} color="accent" secondaryColor="primary" title="Poster un nouveau commentaire" contentValidationString="Votre commentaire doit faire au moins 10 caractères" textAreaPlaceholder="Votre commentaire" submitNotice="Le commentaire ne sera visible qu'après validation par un modérateur" successNotice="Votre commentaire a été proposé avec succès, il sera validé prochainement" />
}