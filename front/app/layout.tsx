import './globals.css'
import { Poppins } from "next/font/google"
import { FaNewspaper, FaLightbulb, FaRightToBracket, FaEnvelope, FaTrophy } from "react-icons/fa6";
import type { Metadata } from 'next'
import TopBar from '@/components/TopBar';
import { ReactNode } from 'react';
import Script from 'next/script';

const poppins = Poppins({ weight: "400", subsets: ["latin"] });

const navLinks: { href: string, title: string, icon: ReactNode }[] = [
  { href: "/news", title: "Actualités du club", icon: <FaNewspaper /> },
  { href: "/practical", title: "Informations pratiques", icon: <FaLightbulb /> },
  { href: "/subscribe", title: "S'inscrire", icon: <FaRightToBracket /> },
  { href: "/contact", title: "Contact", icon: <FaEnvelope /> },
  { href: "/contest", title: "Compétitions", icon: <FaTrophy /> },
];

export const metadata: Metadata = {
  title: 'Fillière TT',
  description: 'Page du club de tennis de table de Groisy',
  icons: {
    icon: '/icon.png',
  },
}

/** @todo subscribe, contest, newsletter (link in footer) */
export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html className="opacity-0 transition-opacity" lang="en">
      <body className={`h-screen flex flex-col bg-background ${poppins.className}`}>
        <TopBar links={navLinks} />
        <main className="mt-16 grow grid place-items-start">{children}</main>
        <Script src="/scripts/cursorAura.js" strategy="lazyOnload"></Script>
      </body>
    </html>
  )
}
