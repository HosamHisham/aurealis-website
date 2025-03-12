import { createClient } from '@/lib/supabase/server'
import { type Provider } from '@supabase/supabase-js'

export type UserProfile = {
  id: string
  email: string
  full_name?: string
  phone?: string
  shipping_address?: {
    street: string
    city: string
    state: string
    postal_code: string
    country: string
  }
  billing_address?: {
    street: string
    city: string
    state: string
    postal_code: string
    country: string
  }
  preferences?: {
    newsletter: boolean
    marketing: boolean
    language: string
    currency: string
  }
  created_at: string
  updated_at: string
}

/**
 * Sign in with email and password
 * @param email User's email
 * @param password User's password
 * @returns User data or error
 */
export async function signInWithPassword(email: string, password: string) {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error signing in:', error)
    return { data: null, error }
  }
}

/**
 * Sign in with OAuth provider
 * @param provider OAuth provider (e.g., 'google', 'apple')
 * @returns Authentication URL or error
 */
export async function signInWithOAuth(provider: Provider) {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    })

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error signing in with OAuth:', error)
    return { data: null, error }
  }
}

/**
 * Sign up with email and password
 * @param email User's email
 * @param password User's password
 * @returns User data or error
 */
export async function signUp(email: string, password: string) {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      },
    })

    if (error) throw error

    // Create user profile after successful signup
    if (data.user) {
      await createUserProfile(data.user.id, email)
    }

    return { data, error: null }
  } catch (error) {
    console.error('Error signing up:', error)
    return { data: null, error }
  }
}

/**
 * Sign out the current user
 * @returns Success status or error
 */
export async function signOut() {
  try {
    const supabase = await createClient()
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    return { error: null }
  } catch (error) {
    console.error('Error signing out:', error)
    return { error }
  }
}

/**
 * Get the current user's profile
 * @returns User profile data or error
 */
export async function getUserProfile(): Promise<{ data: UserProfile | null; error: Error | null }> {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError) throw authError
    if (!user) return { data: null, error: null }

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error fetching user profile:', error)
    return { data: null, error: error as Error }
  }
}

/**
 * Update the current user's profile
 * @param profile Updated profile data
 * @returns Updated profile or error
 */
export async function updateUserProfile(profile: Partial<UserProfile>) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError) throw authError
    if (!user) throw new Error('No authenticated user')

    const { data, error } = await supabase
      .from('profiles')
      .update(profile)
      .eq('id', user.id)
      .select()
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error updating user profile:', error)
    return { data: null, error: error as Error }
  }
}

/**
 * Create a new user profile
 * @param userId User's ID
 * @param email User's email
 * @returns Created profile or error
 */
async function createUserProfile(userId: string, email: string) {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('profiles')
      .insert([
        {
          id: userId,
          email,
          preferences: {
            newsletter: true,
            marketing: true,
          },
        },
      ])

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error creating user profile:', error)
    return { data: null, error }
  }
}