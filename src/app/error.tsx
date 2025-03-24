'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-9xl font-playfair text-[#C5A572] mb-4">500</h1>
          <h2 className="text-3xl font-playfair mb-4">Server Error</h2>
          <p className="text-gray-600 mb-8">
            Something went wrong on our end. We're working to fix it.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <p className="text-gray-600 mb-8">
            In the meantime, you can try:
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/"
              className="luxury-button"
            >
              Return Home
            </Link>
            <button
              onClick={() => window.location.reload()}
              className="luxury-button"
            >
              Refresh Page
            </button>
            <Link
              href="/contact"
              className="luxury-button"
            >
              Contact Support
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
            Need immediate assistance? Our technical support team is here to help.
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

export default ErrorPage 