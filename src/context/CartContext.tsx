'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from './AuthContext'
import { Product } from '@/lib/supabase'

type CartItem = {
  id: string
  product: Product
  quantity: number
}

type CartContextType = {
  items: CartItem[]
  addItem: (productId: string, quantity: number) => Promise<void>
  removeItem: (productId: string) => Promise<void>
  updateQuantity: (productId: string, quantity: number) => Promise<void>
  clearCart: () => Promise<void>
  loading: boolean
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  // Calculate totals
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)

  useEffect(() => {
    if (user) {
      loadCart()
    } else {
      setItems([])
      setLoading(false)
    }
  }, [user])

  const loadCart = async () => {
    try {
      console.log('Loading cart for user:', user?.id)
      const { data: cartItems, error } = await supabase
        .from('cart_items')
        .select(`
          id,
          quantity,
          product_id,
          products (
            id,
            name,
            description,
            price,
            image
          )
        `)
        .eq('user_id', user?.id)

      if (error) {
        console.error('Error loading cart:', error)
        throw error
      }

      console.log('Cart items loaded:', cartItems)
      const formattedItems = cartItems.map((item: any) => ({
        id: item.id,
        product: item.products,
        quantity: item.quantity,
      }))

      setItems(formattedItems)
    } catch (error) {
      console.error('Error loading cart:', error)
    } finally {
      setLoading(false)
    }
  }

  const addItem = async (productId: string, quantity: number) => {
    if (!user) {
      console.error('Must be logged in to add items to cart')
      throw new Error('Must be logged in to add items to cart')
    }

    try {
      console.log('Adding item to cart:', { productId, quantity, userId: user.id })
      
      // First check if the product exists
      const { data: product, error: productError } = await supabase
        .from('products')
        .select('*')
        .eq('id', productId)
        .single()

      if (productError || !product) {
        console.error('Product not found:', productError)
        throw new Error('Product not found')
      }

      // Then check if the item is already in the cart
      const { data: existingItem, error: existingError } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', user.id)
        .eq('product_id', productId)
        .single()

      if (existingError && existingError.code !== 'PGRST116') {
        console.error('Error checking existing cart item:', existingError)
        throw existingError
      }

      if (existingItem) {
        console.log('Updating existing cart item')
        await updateQuantity(existingItem.id, existingItem.quantity + quantity)
      } else {
        console.log('Adding new cart item')
        const { error: insertError } = await supabase
          .from('cart_items')
          .insert({
            user_id: user.id,
            product_id: productId,
            quantity,
          })

        if (insertError) {
          console.error('Error inserting cart item:', insertError)
          throw insertError
        }
      }

      await loadCart()
    } catch (error) {
      console.error('Error adding item to cart:', error)
      throw error
    }
  }

  const removeItem = async (itemId: string) => {
    if (!user) {
      console.error('Must be logged in to remove items from cart')
      throw new Error('Must be logged in to remove items from cart')
    }

    try {
      console.log('Removing item from cart:', itemId)
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', itemId)
        .eq('user_id', user.id)

      if (error) {
        console.error('Error removing item:', error)
        throw error
      }

      await loadCart()
    } catch (error) {
      console.error('Error removing item from cart:', error)
      throw error
    }
  }

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (!user) {
      console.error('Must be logged in to update cart')
      throw new Error('Must be logged in to update cart')
    }

    try {
      console.log('Updating cart quantity:', { itemId, quantity })
      if (quantity <= 0) {
        await removeItem(itemId)
        return
      }

      const { error } = await supabase
        .from('cart_items')
        .update({ quantity })
        .eq('id', itemId)
        .eq('user_id', user.id)

      if (error) {
        console.error('Error updating quantity:', error)
        throw error
      }

      await loadCart()
    } catch (error) {
      console.error('Error updating cart quantity:', error)
      throw error
    }
  }

  const clearCart = async () => {
    if (!user) {
      console.error('Must be logged in to clear cart')
      throw new Error('Must be logged in to clear cart')
    }

    try {
      console.log('Clearing cart')
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id)

      if (error) {
        console.error('Error clearing cart:', error)
        throw error
      }

      setItems([])
    } catch (error) {
      console.error('Error clearing cart:', error)
      throw error
    }
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        loading,
        totalItems,
        totalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
} 