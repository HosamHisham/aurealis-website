export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  image_url: string
  featured: boolean
  benefits?: string[]
  ingredients?: string[]
  how_to_use?: string
  stock_quantity: number
  created_at: string
  updated_at: string
}

export interface ProductError {
  message: string
  details?: string
}
