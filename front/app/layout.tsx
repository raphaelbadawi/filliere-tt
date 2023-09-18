import './globals.css'
import Image from 'next/image';
import type { Metadata } from 'next'
import TopBar from '@/components/TopBar';

const navLinks: { href: string, title: string }[] = [
  { href: "/news", title: "Actualités du club" },
  { href: "/practical", title: "Informations pratiques" },
  { href: "/subscribe", title: "S'inscrire" },
  { href: "/contact", title: "Contact" },
];

export const metadata: Metadata = {
  title: 'Fillière TT',
  description: 'Page du club de tennis de table de Groisy',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="h-screen flex flex-col" style={{ backgroundImage: "url('../public/bg-img.jpeg')" }}>
        <Image
          className="-z-10"
          alt="Background"
          layout="fill"
          objectFit="cover"
          objectPosition="cover"
          src="/bg-img.jpeg"
        />
        <TopBar links={navLinks} />
        <main className="grow grid place-items-center">{children}</main>
      </body>
    </html>
  )
}
