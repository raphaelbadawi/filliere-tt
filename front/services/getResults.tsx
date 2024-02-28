/** @warning this service is meant to be used client-side */
export default async function getResults(teamId: number) {
    // First: get team division
    const divisionQuery = `{
        sportMatches(
          first: 1
          or: [{ awayOpponent_team_id: "{{TEAM_ID}}" }, { homeOpponent_team_id: "{{TEAM_ID}}" }]
          order: [{ date: "DESC" }]
        ) {
          edges {
            node {
              id
              division {
                id
                name
              }
            }
          }
        }
      }`.replaceAll("{{TEAM_ID}}", teamId.toString());

    const divisionRes = await fetch(`${process.env.NEXT_PUBLIC_FFTT_API}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                query: divisionQuery
            }),
            cache: "no-store",
        }
    );
    if (!divisionRes.ok) {
        throw new Error("Failed to fetch data");
    }

    const rawDivision = await divisionRes.json();
    const division = rawDivision.data.sportMatches.edges[0].node.division;
    const contestName = division.name;
    const divisionId = division.id.replace("/api/divisions/", "");

    // Then, using the division ID, get the actual team results
    const resultsQuery = `{
        poolsWithSportMatches: pools(group_tour_division_id: {{DIVISION_ID}}) {
          edges {
            node {
              id
              name
              playerOppositionSheet {
                id
                lines {
                  edges {
                    node {
                      awayPlayer
                      homePlayer
                      id
                      position
                    }
                  }
                }
                opponentCount
                oppositionCount
              }
              roundGrid {
                id
                rounds {
                  edges {
                    node {
                      day {
                        id
                        position
                      }
                      id
                      roundNumber
                      startDate
                    }
                  }
                }
              }
              sportMatches {
                edges {
                  node {
                    awayGamePoints
                    awayOpponent {
                      id
                      team {
                        id
                        name
                      }
                    }
                    date
                    day {
                      id
                    }
                    forfeit
                    hasWarnings
                    homeGamePoints
                    homeOpponent {
                      id
                      team {
                        id
                        name
                      }
                    }
                    id
                    penalty
                    roundNumber
                    winner
                  }
                }
              }
            }
          }
        }
        poolsWithResults: pools(group_tour_division_id: {{DIVISION_ID}}) {
          edges {
            node {
              id
              results {
                edges {
                  node {
                    definitivePoints
                    definitiveRank
                    forfeit
                    gamePointLost
                    gamePointWin
                    id
                    modified
                    opponent {
                      id
                      team {
                        id
                        name
                      }
                    }
                    penality
                    pointsModified
                    sportMatchCount
                    sportMatchDraw
                    sportMatchLost
                    sportMatchWin
                  }
                }
              }
            }
          }
        }
      }`.replaceAll("{{DIVISION_ID}}", divisionId.toString());
    const res = await fetch(`${process.env.NEXT_PUBLIC_FFTT_API}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                query: resultsQuery
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
    const ladder = rawResults.data[poolsWithResultsKey].edges[poolIndex].node.results.edges;
    const results = rawResults.data[poolsWithSportMatchesKey].edges[poolIndex].node.sportMatches.edges;

    return {
        contestName,
        poolNumber,
        ladder,
        results,
    }
}