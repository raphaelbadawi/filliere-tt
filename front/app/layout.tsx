import './globals.css'
import { Poppins } from "next/font/google"
import { FaNewspaper, FaLightbulb, FaRightToBracket, FaEnvelope, FaTrophy, FaArchway } from "react-icons/fa6";
import type { Metadata } from 'next'
import TopBar from '@/components/TopBar';
import { ReactNode } from 'react';
import Script from 'next/script';
import Footer from '@/components/Footer';

const poppins = Poppins({ weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], subsets: ["latin"] });

const navLinks: { href: string, title: string, icon: ReactNode, blank?: boolean }[] = [
  { href: "/news", title: "Actualités du club", icon: <FaNewspaper /> },
  { href: "/practical", title: "Informations pratiques", icon: <FaLightbulb /> },
  { href: "/subscribe", title: "S'inscrire", icon: <FaRightToBracket /> },
  { href: "/contact", title: "Contact", icon: <FaEnvelope /> },
  { href: "/contest", title: "Compétitions", icon: <FaTrophy /> },
  { href: process.env.ARCHIVES_URL || "/", title: "Archives", icon: <FaArchway />, blank: true}
];

export const metadata: Metadata = {
  title: 'Fillière TT',
  description: 'Site du club de tennis de table de Groisy',
  icons: {
    icon: '/icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html className="opacity-0 transition-opacity" lang="en">
      <body className={`min-h-screen min-w-fit flex flex-col bg-background ${poppins.className}`}>
        <TopBar links={navLinks} />
        <main className="mt-20 min-w-fit flex grow">{children}</main>
        <Footer />
        <Script src="/scripts/cursorAura.js" strategy="lazyOnload"></Script>
      </body>
    </html>
  )
}
