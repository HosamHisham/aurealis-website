'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      })

      if (error) throw error
      setSuccess(true)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full p-8 bg-white">
          <div className="text-center">
            <h1 className="text-4xl font-playfair mb-8">Check Your Email</h1>
            <div className="text-6xl mb-8">✉️</div>
            <p className="text-gray-600 mb-8">
              We've sent you an email with instructions to reset your password.
              Please check your inbox.
            </p>
            <Link
              href="/auth/login"
              className="luxury-button inline-block"
            >
              Return to Login
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-6xl w-full flex">
        {/* Left side - Image */}
        <div className="hidden lg:block w-1/2 relative h-[600px]">
          <Image
            src="/forgot-password-image.jpg"
            alt="Luxury cosmetics"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Right side - Form */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full lg:w-1/2 p-8 lg:p-16 bg-white"
        >
          <div className="max-w-md mx-auto">
            <h1 className="text-4xl font-playfair mb-8">Reset Password</h1>
            <p className="text-gray-600 mb-8">
              Enter your email address and we'll send you instructions to reset your password.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 text-red-500 p-4 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="luxury-input w-full"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="luxury-button w-full"
              >
                {loading ? 'Sending Instructions...' : 'Send Instructions'}
              </button>
            </form>

            <div className="mt-8 text-center">
              <Link
                href="/auth/login"
                className="text-[#C5A572] hover:text-[#8B7355]"
              >
                Return to Login
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ForgotPasswordPage 