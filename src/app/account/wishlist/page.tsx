'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const WishlistPage = () => {
  // This would typically come from your database
  const wishlistItems = [
    {
      id: '1',
      name: 'Royal Face Cream',
      price: 180,
      image: '/product-2.jpg',
      description: 'Luxurious face cream with royal jelly and gold particles',
    },
    {
      id: '2',
      name: 'Diamond Eye Serum',
      price: 220,
      image: '/product-3.jpg',
      description: 'Advanced eye serum with diamond powder and peptides',
    },
    {
      id: '3',
      name: 'Pearl Brightening Mask',
      price: 150,
      image: '/product-4.jpg',
      description: 'Brightening face mask with pearl extract and vitamin C',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-playfair mb-12">My Wishlist</h1>

        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {wishlistItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 shadow-sm"
              >
                <div className="relative h-64 mb-4">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                  <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
                    <svg
                      className="w-5 h-5 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <h3 className="text-xl font-playfair mb-2">{item.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                <p className="text-[#C5A572] text-xl mb-6">${item.price}</p>

                <div className="flex space-x-4">
                  <Link
                    href={`/shop/${item.id}`}
                    className="luxury-button flex-1 text-center"
                  >
                    View Product
                  </Link>
                  <button className="luxury-button flex-1">
                    Add to Cart
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">💝</div>
            <p className="text-gray-600 mb-4">Your wishlist is empty</p>
            <p className="text-gray-600 mb-8">
              Save items you love to your wishlist and they'll appear here.
            </p>
            <Link href="/shop" className="luxury-button">
              Start Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default WishlistPage 