import { createClient } from '@supabase/supabase-js'
import { Database } from './database.types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

export type Tables = Database['public']['Tables']
export type Collections = Tables['collections']['Row']
export type Products = Tables['products']['Row']
export type CartItems = Tables['cart_items']['Row']

// Convenience types for components
export type Product = Products
export type Collection = Collections
export type CartItem = CartItems

// Database types
export type User = {
  id: string
  email: string
  created_at: string
} 