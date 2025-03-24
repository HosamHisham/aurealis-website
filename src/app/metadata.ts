import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Aurealis - Luxury Skincare',
  description: 'Discover your natural beauty with our luxury skincare collection.',
  metadataBase: new URL('http://localhost:3000'),
  openGraph: {
    title: 'Aurealis - Luxury Skincare',
    description: 'Discover your natural beauty with our luxury skincare collection.',
    images: ['/images/hero-bg.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aurealis - Luxury Skincare',
    description: 'Discover your natural beauty with our luxury skincare collection.',
    images: ['/images/hero-bg.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
  }
} 