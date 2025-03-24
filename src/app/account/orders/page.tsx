'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const OrdersPage = () => {
  // This would typically come from your database
  const orders = [
    {
      id: '12345',
      date: 'March 1, 2024',
      status: 'Delivered',
      total: 180,
      items: [
        {
          id: '1',
          name: 'Luminous Serum',
          price: 180,
          quantity: 1,
          image: '/product-1.jpg',
        },
      ],
    },
    {
      id: '12344',
      date: 'February 15, 2024',
      status: 'Delivered',
      total: 360,
      items: [
        {
          id: '2',
          name: 'Royal Face Cream',
          price: 180,
          quantity: 2,
          image: '/product-2.jpg',
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-playfair mb-12">Order History</h1>

        <div className="space-y-8">
          {orders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 shadow-sm"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                  <h2 className="text-xl font-playfair">Order #{order.id}</h2>
                  <p className="text-gray-600">Placed on {order.date}</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    {order.status}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <div className="relative h-20 w-20 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-gray-600">Quantity: {item.quantity}</p>
                      <p className="text-[#C5A572]">${item.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-600">Total Amount</p>
                    <p className="text-xl font-medium">${order.total}</p>
                  </div>
                  <Link
                    href={`/account/orders/${order.id}`}
                    className="luxury-button"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {orders.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">You haven't placed any orders yet.</p>
            <Link href="/shop" className="luxury-button">
              Start Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default OrdersPage 