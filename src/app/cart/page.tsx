'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: '1',
      name: 'Luminous Serum',
      price: 180,
      image: '/product-1.jpg',
      quantity: 2,
    },
    {
      id: '2',
      name: 'Royal Face Cream',
      price: 180,
      image: '/product-2.jpg',
      quantity: 1,
    },
  ])

  const updateQuantity = (id: string, newQuantity: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
      )
    )
  }

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 0 ? 10 : 0
  const tax = subtotal * 0.1
  const total = subtotal + shipping + tax

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-playfair mb-12">Shopping Cart</h1>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center p-6 border-b last:border-b-0"
                  >
                    <div className="relative h-24 w-24 flex-shrink-0">
                      <Image
                        src="/images/product-1.jpg"
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 ml-6">
                      <h3 className="text-xl font-playfair mb-2">{item.name}</h3>
                      <p className="text-[#C5A572] mb-4">${item.price}</p>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center border border-gray-300 rounded-md">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-4 py-2 text-gray-600 hover:text-gray-900"
                          >
                            -
                          </button>
                          <span className="px-4 py-2 border-x border-gray-300">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-4 py-2 text-gray-600 hover:text-gray-900"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-medium">${item.price * item.quantity}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 shadow-sm rounded-lg">
                <h2 className="text-xl font-playfair mb-6">Order Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <Link href="/checkout" className="luxury-button w-full text-center">
                    Proceed to Checkout
                  </Link>
                </div>

                <div className="mt-6 text-center">
                  <Link href="/shop" className="text-[#C5A572] hover:text-[#8B7355]">
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🛒</div>
            <p className="text-gray-600 mb-4">Your cart is empty</p>
            <p className="text-gray-600 mb-8">
              Add some products to your cart and they'll appear here.
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

export default CartPage 