'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const ProductPage = ({ params }: { params: { id: string } }) => {
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [addedToCart, setAddedToCart] = useState(false)

  // This would typically come from your database
  const product = {
    id: params.id,
    name: 'Luminous Serum',
    price: 180,
    images: [
      '/images/products/product-1.jpg',
      '/images/products/product-2.jpg',
      '/images/products/product-3.jpg',
      '/images/products/product-4.jpg',
    ],
    category: 'serums',
    description: 'Advanced serum with vitamin C and hyaluronic acid',
    longDescription: `Experience the transformative power of our Luminous Serum, a sophisticated blend of potent ingredients designed to reveal your skin's natural radiance. This advanced formula combines the brightening properties of vitamin C with the hydrating benefits of hyaluronic acid, creating a powerful synergy that addresses multiple skin concerns.

Key Benefits:
• Brightens and evens skin tone
• Reduces the appearance of dark spots
• Provides intense hydration
• Improves skin texture and elasticity
• Protects against environmental damage

Directions for Use:
Apply 2-3 drops to clean, dry skin in the morning and evening. Follow with your preferred moisturizer.`,
    rating: 4.8,
    reviews: 128,
    ingredients: [
      'Vitamin C',
      'Hyaluronic Acid',
      'Niacinamide',
      'Ferulic Acid',
      'Vitamin E',
      'Glycerin',
      'Water',
    ],
    specifications: {
      size: '30ml',
      type: 'Serum',
      skinType: 'All skin types',
      shelfLife: '12 months',
      madeIn: 'Switzerland',
    },
  }

  const handleAddToCart = () => {
    // This would typically integrate with your cart system
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 3000)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center space-x-4 mb-8">
          <Link
            href="/shop"
            className="text-[#C5A572] hover:text-[#8B7355]"
          >
            ← Back to Shop
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="relative h-[500px] mb-4">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex space-x-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative h-20 w-20 flex-shrink-0 ${
                    selectedImage === index ? 'ring-2 ring-[#C5A572]' : ''
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-4xl font-playfair mb-4">{product.name}</h1>
            <div className="flex items-center mb-6">
              <span className="text-yellow-400 mr-1">★</span>
              <span className="text-gray-600 mr-2">{product.rating}</span>
              <span className="text-gray-400">({product.reviews} reviews)</span>
            </div>
            <p className="text-2xl text-[#C5A572] mb-6">${product.price}</p>
            <p className="text-gray-600 mb-8">{product.description}</p>

            <div className="flex items-center space-x-4 mb-8">
              <div className="flex items-center border border-gray-300 rounded-md">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900"
                >
                  -
                </button>
                <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="luxury-button flex-1"
              >
                Add to Cart
              </button>
            </div>

            {addedToCart && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="bg-green-50 text-green-500 p-4 rounded-lg mb-8"
              >
                Added to cart successfully!
              </motion.div>
            )}

            <div className="space-y-8">
              {/* Product Details */}
              <div>
                <h2 className="text-xl font-playfair mb-4">Product Details</h2>
                <p className="text-gray-600 whitespace-pre-line">{product.longDescription}</p>
              </div>

              {/* Ingredients */}
              <div>
                <h2 className="text-xl font-playfair mb-4">Ingredients</h2>
                <ul className="list-disc list-inside text-gray-600">
                  {product.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>

              {/* Specifications */}
              <div>
                <h2 className="text-xl font-playfair mb-4">Specifications</h2>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key}>
                      <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                      <span className="text-gray-600 ml-2">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPage 