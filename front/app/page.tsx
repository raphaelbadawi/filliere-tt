import FlipCard from "@/components/FlipCard";
import Title from "@/components/Title";

const contents = [
  {
    title: "Title",
    caption: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae soluta a repellendus, dolorem laudantium hic dignissimos non eum illum officia, optio omnis enim iste deserunt, error eveniet temporibus assumenda! Repudiandae?",
    text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum incidunt vel labore, alias nobis tempore! Adipisci, inventore esse doloribus accusantium, quaerat in nisi praesentium dolorem ducimus deleniti error architecto autem.
    Magnam maiores nihil vitae possimus sit modi tempora exercitationem eaque eveniet hic consectetur commodi laboriosam dolorem delectus saepe necessitatibus non fugit iusto nostrum, cum dolore tempore aut aspernatur? Incidunt, voluptatem?
    Vero totam officia sint repellendus at tempore illo nihil esse explicabo pariatur voluptate modi, amet labore odio eligendi iste eaque corrupti earum sed excepturi suscipit harum repudiandae dolores. Recusandae, accusamus!
    Aliquid labore corporis, ipsa commodi minima soluta, amet harum fugiat blanditiis illo tempore nihil non minus. Fugiat quidem id asperiores! Quaerat iusto explicabo rerum hic soluta quia ab incidunt ullam!
    Sit expedita dolores nisi saepe earum praesentium ipsum labore cum, at eos. Sunt delectus officiis quia aperiam laudantium, quas nobis harum at consectetur, commodi et exercitationem, fugiat velit corporis cupiditate.`,
    image: "/images/lebrun.webp",
  }
]

// TODO : pass texts and images and use images as faces background

export default function Home() {
  return (
    <section id="home" className="w-full">
      <Title text="Bienvenue sur le site du club de tennis de table de Groisy" />
      <div className="px-4 flex flex-wrap gap-4 items-start">
        <FlipCard width="24rem" height="36rem" title={contents[0].title} caption={contents[0].caption} text={contents[0].text} image={contents[0].image}></FlipCard>
        <FlipCard width="24rem" height="36rem" title={contents[0].title} caption={contents[0].caption} text={contents[0].text} image={contents[0].image}></FlipCard>
        <FlipCard width="24rem" height="36rem" title={contents[0].title} caption={contents[0].caption} text={contents[0].text} image={contents[0].image}></FlipCard>
      </div>
    </section>

  )
}