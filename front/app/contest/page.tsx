import { Contest } from "@/types";
import ContestContainer from "@/components/containers/ContestContainer";
import getMultiple from "@/services/getMultiple";

export default async function ContestPage() {
    const { data } : { data: Contest[] } = await getMultiple("contests");

    return (
        <section id="contest" className="w-full px-4">
            <ContestContainer contests={data} />
        </section>
    )
}
