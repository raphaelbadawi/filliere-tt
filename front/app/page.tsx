import FlipCard from "@/components/FlipCard";
import Title from "@/components/Title";
import getMultiple from "@/services/getMultiple";
import getSingle from "@/services/getSingle";
import { Card } from "@/types";

export default async function Home() {
  const { data: cards } : { data: Card[] } = await getMultiple();
  const { data: titleObject } = await getSingle();
  return (
    <section id="home" className="w-full">
      <Title text={titleObject.title} />
      <div className="sm:px-4 flex flex-wrap gap-4 items-start">
        {cards && cards.map((card, index) =>
          <FlipCard key={index} width="20rem" height="32rem" title={card.title} caption={card.caption || ""} text={card.content} image={`${process.env.STRAPI_DOCKER_NETWORK_ENDPOINT}${card.picture.formats.medium?.url || card.picture.formats.small.url}`}></FlipCard>
        )}
      </div>
    </section>

  )
}