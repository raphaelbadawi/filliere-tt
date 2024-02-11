import { Contest } from "@/types";
import { useState } from "react";
import Spinner from "./Spinner";
import getResults from "@/services/getResults";

export default function ContestComponent({ contest }: { contest: Contest }) {
    const [ results, setResults ] = useState([]);
    // trigger a getResults request and update state accordingly
    getResults(contest.attributes.requestBody, contest.attributes.teamId).then(data => {
        console.log(data)
    })
    // ladder and results should have their own individual components
    
    return (
        <div className="mt-3 flex justify-center">
            {results.length == 0 && (
                <Spinner />
            )}
            {results.length > 0 && (
                <span>ContestComponent</span>
            )}
        </div>
    )
}