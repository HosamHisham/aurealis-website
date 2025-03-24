import '../app/globals.css'
import RootLayoutClient from '@/components/RootLayoutClient'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Aurealis - Luxury Skincare',
  description: 'Discover your natural beauty with our luxury skincare collection.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <RootLayoutClient>{children}</RootLayoutClient>
} 