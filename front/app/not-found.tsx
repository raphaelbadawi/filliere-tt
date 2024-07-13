import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <h2>Cette table n&apos;existe pas</h2>
      <Link href="/" className="text-primary hover:underline">Retour à l&apos;entrée du gymnase</Link>
    </div>
  )
}