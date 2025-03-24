'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const AccountLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()

  const navigation = [
    { name: 'Overview', href: '/account' },
    { name: 'Profile', href: '/account/profile' },
    { name: 'Orders', href: '/account/orders' },
    { name: 'Wishlist', href: '/account/wishlist' },
    { name: 'Addresses', href: '/account/addresses' },
    { name: 'Settings', href: '/account/settings' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="w-full md:w-64 flex-shrink-0">
            <nav className="bg-white p-6 shadow-sm rounded-lg">
              <ul className="space-y-2">
                {navigation.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={`block px-4 py-2 rounded-md transition-colors ${
                          isActive
                            ? 'bg-[#C5A572] text-white'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {item.name}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountLayout 