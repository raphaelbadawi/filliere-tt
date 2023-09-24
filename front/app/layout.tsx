import './globals.css'
import { Poppins } from "next/font/google"
import type { Metadata } from 'next'
import TopBar from '@/components/TopBar';

const poppins = Poppins({ weight: "400", subsets: ["latin"] });
const poppinsSemiBold = Poppins({ weight: "600", subsets: ["latin"] });


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

/** @todo: add home icon ; finish cards ; setup appwrite for blog section ; use prefers-color-scheme colors for the blog section */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`h-screen flex flex-col bg-background ${poppins.className} ${poppinsSemiBold.className}`}>
        <TopBar links={navLinks} />
        <main className="mt-16 grow grid place-items-start">{children}</main>
      </body>
    </html>
  )
}
