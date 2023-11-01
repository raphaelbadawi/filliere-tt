import FlipCard from "@/components/FlipCard";
import Title from "@/components/Title";
import getCards from "@/services/getCards";
import getTitle from "@/services/getTitle";
import { Card } from "@/types";

export default async function Home() {
  const { data: cards } : { data: Card[] } = await getCards();
  const { data: titleObject } = await getTitle();
  return (
    <section id="home" className="w-full">
      <Title text={titleObject.attributes.title} />
      <div className="px-4 flex flex-wrap gap-4 items-start">
        {cards && cards.map((card, index) =>
          <FlipCard key={index} width="24rem" height="36rem" title={card.attributes.title} caption={card.attributes.caption || ""} text={card.attributes.content} image={`${process.env.STRAPI_DOCKER_NETWORK_ENDPOINT}${card.attributes.picture.data.attributes.formats.medium.url}`}></FlipCard>
        )}
      </div>
    </section>

  )
}