'use client'

import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const { signUp, signIn } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    try {
      console.log('Attempting to sign up with email:', email)
      const { data, error } = await signUp(email, password)
      
      if (error) {
        console.error('Sign up error:', error)
        setError(error.message || 'Error creating account')
        return
      }

      console.log('Sign up successful:', data)
      
      // Add a small delay before attempting to sign in
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      console.log('Attempting to sign in with email:', email)
      const signInResponse = await signIn(email, password)
      console.log('Sign in response:', signInResponse)
      
      if (signInResponse.error) {
        console.error('Auto sign in error:', signInResponse.error)
        setError('Account created but unable to sign in automatically. Please try signing in manually.')
        router.push('/auth/signin?email=' + encodeURIComponent(email))
        return
      }

      if (!signInResponse.data?.user) {
        console.error('No user data in sign in response')
        setError('Account created but session not established. Please try signing in manually.')
        router.push('/auth/signin?email=' + encodeURIComponent(email))
        return
      }

      console.log('Sign in successful, redirecting to home')
      router.push('/')
      
    } catch (error: any) {
      console.error('Sign up/sign in error:', error)
      setError(error?.message || 'Error creating account. Please try again.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link
              href="/auth/signin"
              className="font-medium text-[#C5A572] hover:text-[#8B7355]"
            >
              sign in to your account
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-[#C5A572] focus:border-[#C5A572] focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#C5A572] focus:border-[#C5A572] focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="sr-only">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-[#C5A572] focus:border-[#C5A572] focus:z-10 sm:text-sm"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#C5A572] hover:bg-[#8B7355] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C5A572] transition-colors duration-200"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 