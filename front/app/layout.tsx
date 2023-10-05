import './globals.css'
import { Poppins } from "next/font/google"
import { FaNewspaper, FaLightbulb, FaRightToBracket, FaEnvelope, FaTrophy  } from "react-icons/fa6";
import type { Metadata } from 'next'
import TopBar from '@/components/TopBar';
import { ReactNode } from 'react';

const poppins = Poppins({ weight: "400", subsets: ["latin"] });
const poppinsSemiBold = Poppins({ weight: "600", subsets: ["latin"] });

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
}

/** @todo title and section tag ; replace isDesktop my md queries to hide components ; fix dark mode flash by creating a beforeInteractive.tsx in utils (https://nextjs.org/docs/pages/api-reference/components/script) and just using setDark in the useEffect ; use straou for home content and blog section ; set pagination ; export strapi schemas */
export default function RootLayout({
  children,
}: {
  children: ReactNode
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
