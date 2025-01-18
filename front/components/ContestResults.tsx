import { Result, Results } from "@/types";
import DateComponent from "@/components/Date";
import React from "react";

export default function ContestResults({ results, teamId }: { results: Results, teamId: number }) {
    // Group results by date
    type GroupedResults = {
        [key: string]: Result[];
    };
    const resultsGroupedByDate = results.reduce((acc: GroupedResults, current) => {
        const date = current.node.date.split('T')[0]; // Isolate the date part
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(current);
        return acc;
    }, {} as GroupedResults);

    const renderMatchGroup = (games: Result[], date: string) => (
        <>
            <div className="px-6 py-2 bg-gray-200 text-gray-900 font-semibold">
                <DateComponent dateString={date}></DateComponent>
            </div>
            {games.map((game) => renderMatchDetail(game))}
        </>
    );

    const renderMatchDetail = (game: Result) => {
        let { awayGamePoints, homeGamePoints, awayOpponent, homeOpponent, date, winner } = game.node;
        if (!homeOpponent) {
            homeOpponent = { id: "0", team: { id: "0", name: "N/A" } };
        }
        if (!awayOpponent) {
            awayOpponent = { id: "0", team: { id: "0", name: "N/A" } };
        }
        const opponentName = awayOpponent.team.name;
        const teamName = homeOpponent.team.name;
        const teamPoints = homeGamePoints;
        const opponentPoints = awayGamePoints;

        return (
            <div key={game.node.id} className="py-4 border-b last:border-b-0">
                <div className="flex items-center justify-center text-gray-600 text-sm">
                    <div className="flex-1 text-right pr-2">
                        {teamName}
                    </div>
                    <div className="flex-none text-lg font-bold mx-4">
                        <span>{teamPoints}</span> - <span>{opponentPoints}</span>
                    </div>
                    <div className="flex-1 pl-2">
                        {opponentName}
                    </div>
                </div>
            </div>
        );
    };


    return (
        <div className="w-full bg-white rounded-lg my-2">
            {Object.entries(resultsGroupedByDate).map(([date, games]) => (
                <div key={date} className="last:mb-0">
                    {renderMatchGroup(games, date)}
                </div>
            ))}
        </div>
    );
}
