import './globals.css'
import type { Metadata } from 'next'
import TopBar from '@/components/TopBar';

const navLinks: string[] = [];

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
      <body>
        <TopBar links={navLinks} />
        {children}
      </body>
    </html>
  )
}
