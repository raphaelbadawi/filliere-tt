import { Contest } from "@/types";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import getResults from "@/services/getResults";
import ContestLadder from "./ContestLadder";
import ContestResults from "./ContestResults";

export default function ContestComponent({ contest }: { contest: Contest }) {
    const [results, setResults] = useState({ contestName: null, ladder: null, results: null });
    // Trigger a getResults request and update state accordingly
    useEffect(() => {
        setResults({ contestName: null, ladder: null, results: null });
        getResults(contest.attributes.teamId).then(data => setResults(data));
    }, [contest])
    return (
        <div className="mt-3 flex">
            {!results.ladder && (
                <Spinner />
            )}
            {results.contestName && results.ladder && results.results && (
                <div className="flex flex-col gap-4 mx-auto">
                    <div className="text-xl">{results.contestName}</div>
                    <ContestLadder ladder={results.ladder} teamId={contest.attributes.teamId} />
                    <ContestResults results={results.results} teamId={contest.attributes.teamId} />
                </div>

            )}
        </div>
    )
}