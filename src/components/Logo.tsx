import React from 'react'
import Link from 'next/link'

interface LogoProps {
  className?: string
}

export default function Logo({ className = '' }: LogoProps) {
  return (
    <Link href="/" className={`block ${className}`}>
      <svg
        width="150"
        height="40"
        viewBox="0 0 150 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-auto h-8"
      >
        <text
          x="75"
          y="28"
          fontFamily="Playfair Display, serif"
          fontSize="24"
          fill="currentColor"
          textAnchor="middle"
          className="font-playfair"
        >
          AUREALIS
        </text>
        <text
          x="75"
          y="38"
          fontFamily="Inter, sans-serif"
          fontSize="8"
          fill="currentColor"
          textAnchor="middle"
          className="uppercase tracking-widest"
        >
          Luxury Skincare
        </text>
      </svg>
    </Link>
  )
} 