'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const OrderDetailsPage = ({ params }: { params: { id: string } }) => {
  // This would typically come from your database
  const order = {
    id: params.id,
    date: 'March 1, 2024',
    status: 'Delivered',
    total: 180,
    subtotal: 180,
    shipping: 0,
    tax: 0,
    items: [
      {
        id: '1',
        name: 'Luminous Serum',
        price: 180,
        quantity: 1,
        image: '/product-1.jpg',
        description: 'Advanced serum with vitamin C and hyaluronic acid',
      },
    ],
    shippingAddress: {
      name: 'John Doe',
      address: '123 Luxury Lane',
      city: 'Beverly Hills',
      state: 'CA',
      zipCode: '90210',
      country: 'United States',
      phone: '+1 (555) 123-4567',
    },
    tracking: {
      carrier: 'FedEx',
      number: '1234567890',
      estimatedDelivery: 'March 5, 2024',
      status: 'Delivered',
      history: [
        {
          date: 'March 5, 2024',
          time: '2:30 PM',
          status: 'Delivered',
          location: 'Beverly Hills, CA',
        },
        {
          date: 'March 4, 2024',
          time: '8:15 AM',
          status: 'Out for Delivery',
          location: 'Los Angeles, CA',
        },
        {
          date: 'March 3, 2024',
          time: '11:30 PM',
          status: 'In Transit',
          location: 'Phoenix, AZ',
        },
      ],
    },
  }

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center space-x-4 mb-8">
          <Link
            href="/account/orders"
            className="text-[#C5A572] hover:text-[#8B7355]"
          >
            ← Back to Orders
          </Link>
          <h1 className="text-4xl font-playfair">Order #{order.id}</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-8 shadow-sm mb-8"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                  <p className="text-gray-600">Placed on {order.date}</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    {order.status}
                  </span>
                </div>
              </div>

              <div className="space-y-6">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-start space-x-4">
                    <div className="relative h-24 w-24 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                      <p className="text-gray-600">Quantity: {item.quantity}</p>
                      <p className="text-[#C5A572]">${item.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${order.subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>${order.shipping}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span>${order.tax}</span>
                  </div>
                  <div className="flex justify-between font-medium pt-2 border-t">
                    <span>Total</span>
                    <span>${order.total}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Tracking Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white p-8 shadow-sm"
            >
              <h2 className="text-xl font-playfair mb-6">Tracking Information</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{order.tracking.carrier}</p>
                    <p className="text-gray-600">Tracking Number: {order.tracking.number}</p>
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    {order.tracking.status}
                  </span>
                </div>

                <div className="space-y-4">
                  {order.tracking.history.map((event, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-[#C5A572]" />
                      <div>
                        <p className="font-medium">{event.status}</p>
                        <p className="text-gray-600 text-sm">{event.location}</p>
                        <p className="text-gray-500 text-sm">{event.date} at {event.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Shipping Address */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 shadow-sm"
            >
              <h2 className="text-xl font-playfair mb-6">Shipping Address</h2>
              <div className="space-y-2 text-gray-600">
                <p>{order.shippingAddress.name}</p>
                <p>{order.shippingAddress.address}</p>
                <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
                <p>{order.shippingAddress.country}</p>
                <p>{order.shippingAddress.phone}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderDetailsPage 