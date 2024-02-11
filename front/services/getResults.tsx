/** @warning this service is meant to be used client-side */
export default async function getResults(query: string, teamId: number) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_FFTT_API}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                query
            }),
            cache: "no-store",
        }
    );
    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }
    const rawResults = await res.json();

    // loop into each pool ladder to find in which pool the team is
    let poolIndex = 0;
    let poolsWithResultsKey = "poolsWithResults";
    let poolsWithSportMatchesKey = "poolsWithSportMatches";
    for (const key of Object.keys(rawResults.data)) {
        if (key.startsWith(poolsWithResultsKey)) {
            poolsWithResultsKey = key;
        }
        if (key.startsWith(poolsWithSportMatchesKey)) {
            poolsWithSportMatchesKey = key;
        }
    }
    const pools = rawResults.data[poolsWithResultsKey].edges;
    for (const [index, pool] of pools.entries()) {
        let isFound = false;
        for (const team of pool.node.results.edges) {
            if (team.node.opponent.team.id == "/api/teams/" + teamId) {
                poolIndex = index;
                isFound = true;
                break;
            }
        }
        if (isFound) {
            break;
        }
    }

    // using the pool index, get all results
    const poolNumber = poolIndex + 1;
    const ladder =  rawResults.data[poolsWithResultsKey].edges[poolIndex].node.results.edges;
    const results =  rawResults.data[poolsWithSportMatchesKey].edges[poolIndex].node.sportMatches.edges;

    return {
        poolNumber,
        ladder,
        results,
    }
}