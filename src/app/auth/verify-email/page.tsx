'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

const VerifyEmailPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-6xl w-full flex">
        {/* Left side - Image */}
        <div className="hidden lg:block w-1/2 relative h-[600px]">
          <Image
            src="/verify-email-image.jpg"
            alt="Luxury cosmetics"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Right side - Content */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full lg:w-1/2 p-8 lg:p-16 bg-white"
        >
          <div className="max-w-md mx-auto text-center">
            <h1 className="text-4xl font-playfair mb-8">Check Your Email</h1>
            <div className="text-6xl mb-8">✉️</div>
            <p className="text-gray-600 mb-8">
              We've sent you an email with a verification link. Please check your inbox
              and click the link to verify your email address.
            </p>
            <p className="text-gray-600 mb-8">
              If you don't see the email, please check your spam folder.
            </p>
            <Link
              href="/auth/login"
              className="luxury-button inline-block"
            >
              Return to Login
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default VerifyEmailPage 