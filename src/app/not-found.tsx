'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-9xl font-playfair text-[#C5A572] mb-4">404</h1>
          <h2 className="text-3xl font-playfair mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <p className="text-gray-600 mb-8">
            Here are some helpful links to get you back on track:
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/"
              className="luxury-button"
            >
              Return Home
            </Link>
            <Link
              href="/shop"
              className="luxury-button"
            >
              Shop Now
            </Link>
            <Link
              href="/contact"
              className="luxury-button"
            >
              Contact Us
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12"
        >
          <p className="text-gray-600">
            Need help? Our customer service team is here for you.
          </p>
          <div className="mt-4 text-gray-600">
            <p>Email: support@aurealis.com</p>
            <p>Phone: +1 (555) 123-4567</p>
            <p>Hours: Monday-Friday, 9am-6pm EST</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default NotFoundPage 