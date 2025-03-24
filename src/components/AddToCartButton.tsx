'use client'

import React, { useState } from 'react'
import { useCart } from '@/context/CartContext'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'

interface AddToCartButtonProps {
  id: string
  name: string
  price: number
  image: string
  className?: string
}

export default function AddToCartButton({
  id,
  name,
  price,
  image,
  className = '',
}: AddToCartButtonProps) {
  const { addItem } = useCart()
  const [isAdding, setIsAdding] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleAddToCart = async () => {
    try {
      setIsAdding(true)
      setError(null)
      console.log('Adding item to cart:', { id, name, price, image })
      
      // First verify the product exists
      const { data: product, error: productError } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single()

      if (productError) {
        console.error('Error verifying product:', productError)
        throw new Error(`Failed to verify product: ${productError.message}`)
      }

      if (!product) {
        console.error('Product not found:', id)
        throw new Error('Product not found')
      }

      await addItem(id, 1)
      console.log('Successfully added item to cart')
    } catch (err) {
      console.error('Failed to add item to cart:', err)
      setError(err instanceof Error ? err.message : 'Failed to add item to cart')
    } finally {
      setTimeout(() => {
        setIsAdding(false)
        setError(null)
      }, 1000)
    }
  }

  return (
    <div className="flex flex-col items-center">
      <motion.button
        onClick={handleAddToCart}
        disabled={isAdding}
        className={`luxury-button ${className} ${error ? 'bg-red-500' : ''}`}
        whileTap={{ scale: 0.95 }}
        animate={{
          backgroundColor: isAdding ? '#C5A572' : error ? '#EF4444' : '#1a1a1a',
        }}
      >
        {error ? 'Error' : isAdding ? 'Added to Cart' : 'Add to Cart'}
      </motion.button>
      {error && (
        <p className="text-red-500 text-sm mt-2">{error}</p>
      )}
    </div>
  )
} 