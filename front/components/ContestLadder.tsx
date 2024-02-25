import { Ladder } from "@/types";

export default function ContestComponent({ ladder, teamId }: { ladder: Ladder, teamId: number }) {
    const teamIdString = "/api/teams/" + teamId;
    const getRowHighlight = (index: number, rowTeamId: string) => {
        if (rowTeamId == teamIdString) {
            return "bg-primary";
        }
        return index % 2 === 0 ? "bg-gray-300" : "bg-white";
    }
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full table-auto text-center shadow-md rounded-lg">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="px-4 py-2">Classement</th>
                        <th className="px-4 py-2">Équipe</th>
                        <th className="px-4 py-2">Points</th>
                        <th className="px-4 py-2">Victoires</th>
                        <th className="px-4 py-2">Défaites</th>
                    </tr>
                </thead>
                <tbody className="bg-white text-black">
                    {ladder.map((item, index) => (
                        <tr key={index} className={getRowHighlight(index, item.node.opponent.team.id)}>
                            <td className="border px-4 py-2">{item.node.definitiveRank}</td>
                            <td className="border px-4 py-2">{item.node.opponent.team.name}</td>
                            <td className="border px-4 py-2">{item.node.definitivePoints}</td>
                            <td className="border px-4 py-2">{item.node.sportMatchWin}</td>
                            <td className="border px-4 py-2">{item.node.sportMatchLost}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}