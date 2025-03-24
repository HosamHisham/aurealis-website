'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import AddToCartButton from '@/components/AddToCartButton'
import { supabase } from '@/lib/supabase'

interface Product {
  id: string
  name: string
  price: number
  image: string
  description: string
}

interface Collection {
  name: string
  description: string
  products: Product[]
}

export default function CollectionPage({ params }: { params: { slug: string } }) {
  const [collection, setCollection] = useState<Collection | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProducts() {
      try {
        const { data: products, error } = await supabase
          .from('products')
          .select('*')
        
        if (error) {
          console.error('Error loading products:', error)
          return
        }

        // Map the collection based on the slug
        const collectionData = {
          'golden-essence': {
            name: 'Golden Essence',
            description: 'Our premium collection featuring gold-infused skincare products for ultimate luxury and radiance.',
            products: products.slice(0, 2) // First two products
          },
          'crystal-clear': {
            name: 'Crystal Clear',
            description: 'Pure and gentle skincare solutions for sensitive skin types.',
            products: products.slice(2) // Remaining products
          }
        }[params.slug]

        setCollection(collectionData)
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [params.slug])

  if (!collection) {
    return <div>Collection not found</div>
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-playfair mb-4">{collection.name}</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {collection.description}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {collection.products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white shadow-sm"
              >
                <Link href={`/shop/${product.id}`}>
                  <div className="relative h-64">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-playfair mb-2">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                    <p className="text-[#C5A572] text-xl">${product.price}</p>
                  </div>
                </Link>
                <div className="px-6 pb-6">
                  <AddToCartButton
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    image={product.image}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
} 