'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import Navigation from '@/components/Navigation'

const collections = [
  {
    id: 'golden-essence',
    name: 'Golden Essence',
    description: 'Our premium collection featuring gold-infused skincare products for ultimate luxury and radiance.',
    image: '/images/products/product-1.jpg',
  },
  {
    id: 'crystal-clear',
    name: 'Crystal Clear',
    description: 'Pure and gentle skincare solutions for sensitive skin types.',
    image: '/images/products/product-3.jpg',
  },
]

export default function CollectionsPage() {
  return (
    <>
      <Navigation />
      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl font-playfair mb-4">Our Collections</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our carefully curated collections, each designed to address specific skincare needs and preferences.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {collections.map((collection, index) => (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative h-[400px] group"
              >
                <Image
                  src={collection.image}
                  alt={collection.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8 text-center">
                  <h2 className="text-3xl font-playfair mb-4">{collection.name}</h2>
                  <p className="mb-8">{collection.description}</p>
                  <Link href={`/collections/${collection.id}`} className="luxury-button">
                    Explore Collection
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
} 