'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

interface OrderItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

interface ShippingAddress {
  name: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
}

interface Order {
  id: string
  date: string
  items: OrderItem[]
  shippingAddress: ShippingAddress
  subtotal: number
  shippingCost: number
  tax: number
  total: number
}

const OrderConfirmationPage = () => {
  // This would typically come from your order state or URL parameters
  const order: Order = {
    id: 'ORD-123456',
    date: new Date().toLocaleDateString(),
    items: [
      {
        id: '1',
        name: 'Luminous Serum',
        price: 180,
        image: '/images/product-1.jpg',
        quantity: 2,
      },
      {
        id: '2',
        name: 'Royal Face Cream',
        price: 180,
        image: '/images/product-2.jpg',
        quantity: 1,
      },
    ],
    shippingAddress: {
      name: 'John Doe',
      address: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States',
    },
    subtotal: 540,
    shippingCost: 10,
    tax: 54,
    total: 604,
  }

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-3xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 shadow-sm rounded-lg text-center"
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="text-3xl font-playfair mb-4">Thank You for Your Order!</h1>
          <p className="text-gray-600 mb-8">
            Your order has been successfully placed. We'll send you an email confirmation shortly.
          </p>

          <div className="border-t border-b py-6 mb-8">
            <p className="text-sm text-gray-600 mb-2">Order Number</p>
            <p className="text-lg font-medium">{order.id}</p>
            <p className="text-sm text-gray-600 mt-2">{order.date}</p>
          </div>

          <div className="space-y-6 mb-8">
            <h2 className="text-xl font-playfair">Order Details</h2>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <div className="relative h-16 w-16 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                    <p className="text-[#C5A572]">${item.price * item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>${order.shippingCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span>${order.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-medium pt-2 border-t">
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>

            <div className="text-left">
              <h3 className="font-medium mb-2">Shipping Address</h3>
              <p className="text-gray-600">
                {order.shippingAddress.name}<br />
                {order.shippingAddress.address}<br />
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}<br />
                {order.shippingAddress.country}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <Link
              href="/shop"
              className="luxury-button block w-full"
            >
              Continue Shopping
            </Link>
            <Link
              href="/account/orders"
              className="block w-full px-6 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              View Order History
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default OrderConfirmationPage 