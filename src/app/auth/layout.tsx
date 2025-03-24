'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Aurealis Logo"
              width={150}
              height={40}
              priority
            />
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center text-gray-600 text-sm">
            <p>© {new Date().getFullYear()} Aurealis. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default AuthLayout 