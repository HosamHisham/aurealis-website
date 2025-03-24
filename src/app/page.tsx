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

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProducts() {
      try {
        const { data: products, error } = await supabase
          .from('products')
          .select('*')
          .limit(3)
        
        if (error) {
          console.error('Error loading products:', error)
          return
        }

        setFeaturedProducts(products)
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  const benefits = [
    {
      title: 'Natural Ingredients',
      description: 'Our products are crafted with the finest natural ingredients, carefully selected for their proven benefits.',
      icon: '🌿',
    },
    {
      title: 'Luxury Experience',
      description: 'Experience the epitome of luxury skincare with our premium formulations and elegant packaging.',
      icon: '✨',
    },
    {
      title: 'Proven Results',
      description: 'Backed by science and customer testimonials, our products deliver visible results.',
      icon: '🌟',
    },
  ]

  return (
    <>
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="relative h-screen">
          <div className="relative h-full">
            <Image
              src="/images/hero-bg.jpg"
              alt="Luxury skincare products"
              width={1920}
              height={1080}
              className="absolute inset-0 w-full h-full object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute inset-0 flex items-center justify-center text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="max-w-4xl mx-auto px-4"
              >
                <h1 className="text-5xl md:text-6xl font-playfair mb-6 text-white">
                  Discover Your Natural Beauty
                </h1>
                <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
                  Experience luxury skincare crafted with the finest ingredients
                </p>
                <Link href="/shop" className="luxury-button text-lg">
                  Shop Now
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-playfair text-center mb-12">Featured Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
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
            <div className="text-center mt-12">
              <Link href="/shop" className="luxury-button">
                View All Products
              </Link>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-playfair text-center mb-12">Why Choose Aurealis</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="text-center"
                >
                  <div className="text-4xl mb-4">{benefit.icon}</div>
                  <h3 className="text-xl font-playfair mb-4">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default HomePage 