import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { metadata } from './metadata'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export { metadata }

export default function Template({ children }: { children: React.ReactNode }) {
  return children
} 