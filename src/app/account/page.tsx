'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

const AccountPage = () => {
  const router = useRouter()
  const { user, loading, signOut } = useAuth()

  // Handle loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#C5A572] border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // If no user is found after loading, redirect to sign in
  if (!user) {
    router.push('/auth/signin')
    return null
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-playfair mb-12">My Account</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 shadow-sm"
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative h-20 w-20 rounded-full overflow-hidden">
                <Image
                  src="/placeholder-avatar.jpg"
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="text-xl font-playfair">{user.user_metadata?.first_name || 'User'}</h2>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>
            <Link
              href="/account/profile"
              className="luxury-button w-full text-center"
            >
              Edit Profile
            </Link>
          </motion.div>

          {/* Orders Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-8 shadow-sm"
          >
            <h2 className="text-xl font-playfair mb-6">Recent Orders</h2>
            <div className="space-y-4">
              <div className="border-b pb-4">
                <p className="text-sm text-gray-500">Order #12345</p>
                <p className="font-medium">Luminous Serum</p>
                <p className="text-sm text-gray-600">Delivered on March 1, 2024</p>
              </div>
              <Link
                href="/account/orders"
                className="luxury-button w-full text-center"
              >
                View All Orders
              </Link>
            </div>
          </motion.div>

          {/* Wishlist Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-8 shadow-sm"
          >
            <h2 className="text-xl font-playfair mb-6">Wishlist</h2>
            <div className="space-y-4">
              <div className="border-b pb-4">
                <p className="font-medium">Royal Face Cream</p>
                <p className="text-[#C5A572]">$180</p>
              </div>
              <Link
                href="/account/wishlist"
                className="luxury-button w-full text-center"
              >
                View Wishlist
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Additional Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {/* Addresses */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-8 shadow-sm"
          >
            <h2 className="text-xl font-playfair mb-6">Addresses</h2>
            <div className="space-y-4">
              <div className="border-b pb-4">
                <p className="font-medium">Home</p>
                <p className="text-gray-600">
                  123 Luxury Lane<br />
                  Beverly Hills, CA 90210<br />
                  United States
                </p>
              </div>
              <Link
                href="/account/addresses"
                className="luxury-button w-full text-center"
              >
                Manage Addresses
              </Link>
            </div>
          </motion.div>

          {/* Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white p-8 shadow-sm"
          >
            <h2 className="text-xl font-playfair mb-6">Account Settings</h2>
            <div className="space-y-4">
              <Link
                href="/account/settings"
                className="luxury-button w-full text-center"
              >
                Settings
              </Link>
              <button
                onClick={handleSignOut}
                className="w-full py-3 px-4 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default AccountPage 