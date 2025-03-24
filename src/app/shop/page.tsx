'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const ShopPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('featured')

  // This would typically come from your database
  const products = [
    {
      id: '1',
      name: 'Luminous Serum',
      price: 180,
      image: '/images/products/product-1.jpg',
      category: 'serums',
      description: 'Advanced serum with vitamin C and hyaluronic acid',
      rating: 4.8,
      reviews: 128,
    },
    {
      id: '2',
      name: 'Royal Face Cream',
      price: 180,
      image: '/images/products/product-2.jpg',
      category: 'creams',
      description: 'Luxurious face cream with royal jelly and gold particles',
      rating: 4.9,
      reviews: 256,
    },
    {
      id: '3',
      name: 'Diamond Eye Serum',
      price: 220,
      image: '/images/products/product-3.jpg',
      category: 'serums',
      description: 'Advanced eye serum with diamond powder and peptides',
      rating: 4.7,
      reviews: 89,
    },
    {
      id: '4',
      name: 'Pearl Brightening Mask',
      price: 150,
      image: '/images/products/product-4.jpg',
      category: 'masks',
      description: 'Brightening face mask with pearl extract and vitamin C',
      rating: 4.6,
      reviews: 167,
    },
  ]

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'serums', name: 'Serums' },
    { id: 'creams', name: 'Creams' },
    { id: 'masks', name: 'Masks' },
    { id: 'cleansers', name: 'Cleansers' },
  ]

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(product => product.category === selectedCategory)

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'rating':
        return b.rating - a.rating
      default:
        return 0
    }
  })

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <h1 className="text-4xl font-playfair mb-6 md:mb-0">Shop</h1>
          
          <div className="flex items-center space-x-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="luxury-input"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white p-6 shadow-sm rounded-lg">
              <h2 className="text-xl font-playfair mb-4">Categories</h2>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`block w-full text-left px-4 py-2 rounded-md transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-[#C5A572] text-white'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedProducts.map((product, index) => (
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
                      <div className="flex items-center justify-between">
                        <p className="text-[#C5A572] text-xl">${product.price}</p>
                        <div className="flex items-center">
                          <span className="text-yellow-400 mr-1">★</span>
                          <span className="text-gray-600">{product.rating}</span>
                          <span className="text-gray-400 ml-1">({product.reviews})</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {sortedProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600">No products found in this category.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShopPage 