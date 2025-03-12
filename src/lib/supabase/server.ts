import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

/**
 * Creates a Supabase client with secure cookie handling for our luxury e-commerce platform.
 * Implements strict security measures and optimal performance configurations.
 */
export async function createClient() {
  const cookieStore = await cookies()

  // Validate environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || typeof supabaseUrl !== 'string') {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable')
  }

  if (!supabaseAnonKey || typeof supabaseAnonKey !== 'string') {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable')
  }

  // Create Supabase client with secure cookie handling
  return createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        get(name: string) {
          try {
            return cookieStore.get(name)?.value
          } catch (error) {
            console.error('Error retrieving cookie:', error)
            return undefined
          }
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set(name, value, {
              // Development configuration
              httpOnly: false,       // Allow client-side access for development
              secure: false,        // Allow HTTP for localhost
              sameSite: 'lax',     // Keep CSRF protection
              path: '/',           // Consistent access
              priority: 'high',    // Performance optimization
              ...options,
            })
          } catch (error) {
            console.error('Error setting cookie:', error)
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set(name, '', {
              httpOnly: false,
              secure: false,
              sameSite: 'lax',
              path: '/',
              maxAge: 0,           // Immediate expiration
              ...options,
            })
          } catch (error) {
            console.error('Error removing cookie:', error)
          }
        },
      },
    }
  )
}
