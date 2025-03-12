import { createClient } from '@/lib/supabase/server'

export type Product = {
  id: string
  name: string
  description: string
  price: number
  category: string
  subcategory?: string
  image_url: string
  benefits?: string[]
  ingredients?: string[]
  how_to_use?: string
  size?: string
  featured: boolean
  stock_quantity: number
  created_at: string
  updated_at: string
}

export async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const supabase = await createClient()
    
    const { data, error } = await supabase
      .from('products')
      .select('id, name, description, price, category, image_url, featured, benefits, ingredients, stock_quantity, created_at, updated_at')
      .eq('featured', true)
      .order('created_at', { ascending: false })
      .limit(6) // Show only top 6 featured products
    
    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching featured products:', error)
    return []
  }
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  try {
    const supabase = await createClient()
    
    const { data, error } = await supabase
      .from('products')
      .select('id, name, description, price, category, image_url, featured, benefits, ingredients, stock_quantity, created_at, updated_at')
      .eq('category', category)
      .order('created_at', { ascending: false })
      .limit(12) // Show 12 products per category
    
    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching products by category:', error)
    return []
  }
}

export async function getProduct(id: string): Promise<Product | null> {
  try {
    const supabase = await createClient()
    
    const { data, error } = await supabase
      .from('products')
      .select('id, name, description, price, category, subcategory, image_url, benefits, ingredients, how_to_use, size, featured, stock_quantity, created_at, updated_at')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}
