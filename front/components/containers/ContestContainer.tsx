"use client";

import { Contest } from "@/types";
import { useState } from "react";
import ContestComponent from "../ContestComponent";

export default function ContestContainer({ contests }: { contests: Contest[] }) {
    const [targetContest, setTargetContest] = useState("");
    const getContestFromTarget = () => {
        for (const contest of contests) {
            if (contest.documentId == targetContest) {
                return contest;
            }
        }
        return contests[0];
    }
    return (
        <>
            <select defaultValue={""} onChange={e => setTargetContest(e.target.value)} name="contest" className="w-full mt-4 px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-300 dark:text-white dark:focus:ring-primary dark:focus:border-primary" id="contestSelect">
                <option value={""} disabled>Choisissez une équipe</option>
                {contests && contests.map((contest: Contest, index: number) => (
                    <option value={contest.documentId} key={index}>{contest.teamName}</option>
                ))}
            </select>
            {targetContest != "" && (
                <ContestComponent contest={getContestFromTarget()} />
            )}
        </>
    )
}