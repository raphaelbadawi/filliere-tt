import FlipCard from "@/components/FlipCard";

const texts = [
  `Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum incidunt vel labore, alias nobis tempore! Adipisci, inventore esse doloribus accusantium, quaerat in nisi praesentium dolorem ducimus deleniti error architecto autem.
  Magnam maiores nihil vitae possimus sit modi tempora exercitationem eaque eveniet hic consectetur commodi laboriosam dolorem delectus saepe necessitatibus non fugit iusto nostrum, cum dolore tempore aut aspernatur? Incidunt, voluptatem?
  Vero totam officia sint repellendus at tempore illo nihil esse explicabo pariatur voluptate modi, amet labore odio eligendi iste eaque corrupti earum sed excepturi suscipit harum repudiandae dolores. Recusandae, accusamus!
  Aliquid labore corporis, ipsa commodi minima soluta, amet harum fugiat blanditiis illo tempore nihil non minus. Fugiat quidem id asperiores! Quaerat iusto explicabo rerum hic soluta quia ab incidunt ullam!
  Sit expedita dolores nisi saepe earum praesentium ipsum labore cum, at eos. Sunt delectus officiis quia aperiam laudantium, quas nobis harum at consectetur, commodi et exercitationem, fugiat velit corporis cupiditate.`
]

// TODO : pass texts and images and use images as faces background

export default function Home() {
  return (
    <div className="w-screen flex flex-wrap gap-4 mt-6 items-center">
      <FlipCard width="24rem" height="24rem" text={texts[0]}></FlipCard>
      <FlipCard width="24rem" height="24rem" text={texts[0]}></FlipCard>
    </div>
  )
}