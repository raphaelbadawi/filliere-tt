import getMultiple from "@/services/getMultiple";

export default async function Contact() {
    const contests = await getMultiple("contests");
    // make a select mapped to a targetContest state
    // default targetContest will be for now the first available contest
    // on each state change, trigger a getResults request and update state accordingly
    // ladder and results should have their own individual components
    return (
        <div>Contest</div>
    )
}
