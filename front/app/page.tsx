import FlipCard from "@/components/FlipCard";
import Title from "@/components/Title";
import getMultiple from "@/services/getMultiple";
import getSingle from "@/services/getSingle";
import { Card } from "@/types";

export default async function Home() {
  const { data: cards } : { data: Card[] } = await getMultiple();
  const { data: titleObject } = await getSingle();
  return (
    <section id="home" className="w-screen mb-12">
      <Title text={titleObject.attributes.title} />
      <div className="px-4 flex flex-wrap gap-4 items-start">
        {cards && cards.map((card, index) =>
          <FlipCard key={index} width="24rem" height="36rem" title={card.attributes.title} caption={card.attributes.caption || ""} text={card.attributes.content} image={`${process.env.STRAPI_DOCKER_NETWORK_ENDPOINT}${card.attributes.picture.data.attributes.formats.medium?.url || card.attributes.picture.data.attributes.formats.small.url}`}></FlipCard>
        )}
      </div>
    </section>

  )
}