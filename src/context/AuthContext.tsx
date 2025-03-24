'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User, AuthResponse, AuthTokenResponsePassword } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

type AuthContextType = {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<AuthTokenResponsePassword>
  signUp: (email: string, password: string) => Promise<AuthResponse>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check active sessions and sets the user
    const initializeAuth = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()
        if (sessionError) {
          console.error('Error getting session:', sessionError.message)
          return
        }
        
        setUser(session?.user ?? null)
        
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
          console.log('Auth state changed:', _event, session?.user?.id)
          setUser(session?.user ?? null)
        })

        return () => {
          subscription?.unsubscribe()
        }
      } catch (error) {
        console.error('Error in auth initialization:', error)
      } finally {
        setLoading(false)
      }
    }

    initializeAuth()
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      const response = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      
      if (response.error) {
        console.error('Sign in error:', response.error.message)
      } else {
        console.log('Sign in successful:', response.data.user?.id)
      }
      
      return response
    } catch (error) {
      console.error('Unexpected error during sign in:', error)
      throw error
    }
  }

  const signUp = async (email: string, password: string) => {
    try {
      const response = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            email_confirmed: true
          }
        }
      })
      
      if (response.error) {
        console.error('Sign up error:', response.error.message)
      } else {
        console.log('Sign up successful:', response.data.user?.id)
      }
      
      return response
    } catch (error) {
      console.error('Unexpected error during sign up:', error)
      throw error
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error('Sign out error:', error.message)
        throw error
      }
      console.log('Sign out successful')
    } catch (error) {
      console.error('Unexpected error during sign out:', error)
      throw error
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 