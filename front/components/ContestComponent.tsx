import { Contest } from "@/types";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import getResults from "@/services/getResults";
import ContestLadder from "./ContestLadder";
import ContestResults from "./ContestResults";

export default function ContestComponent({ contest }: { contest: Contest }) {
    const [results, setResults] = useState({ ladder: null, results: null });
    // trigger a getResults request and update state accordingly
    useEffect(() => {
        setResults({ ladder: null, results: null });
        getResults(contest.attributes.requestBody, contest.attributes.teamId).then(data => setResults(data));
    }, [contest])
    console.log(results);
    return (
        <div className="mt-3 flex justify-center">
            {!results.ladder && (
                <Spinner />
            )}
            {results.ladder && results.results && (
                <div className="flex flex-col">
                    <ContestLadder ladder={results.ladder} teamId={contest.attributes.teamId} />
                    <ContestResults results={results.results} teamId={contest.attributes.teamId} />
                </div>

            )}
        </div>
    )
}