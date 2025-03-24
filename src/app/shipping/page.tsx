'use client'

import React from 'react'
import { motion } from 'framer-motion'

type ShippingMethod = {
  name: string
  description: string
  cost: string
  details: string
}

type Section = {
  title: string
  content: ShippingMethod[] | string[]
}

const ShippingPage = () => {
  const sections: Section[] = [
    {
      title: 'Shipping Methods',
      content: [
        {
          name: 'Standard Shipping',
          description: '3-5 business days',
          cost: 'Free on orders over $100, $5.95 otherwise',
          details: 'Available for all US addresses and select international locations.',
        },
        {
          name: 'Express Shipping',
          description: '1-2 business days',
          cost: '$15.95',
          details: 'Available for all US addresses. Orders must be placed before 2 PM EST for next-day delivery.',
        },
        {
          name: 'International Shipping',
          description: '5-14 business days',
          cost: 'Starting at $15.95',
          details: 'Available to most countries. Delivery times vary by location.',
        },
      ] as ShippingMethod[],
    },
    {
      title: 'Order Processing',
      content: [
        'Orders are typically processed within 1-2 business days.',
        'Orders placed on weekends or holidays will be processed the next business day.',
        'You will receive a confirmation email with tracking information once your order ships.',
        'We may contact you if there are any issues with your order.',
      ],
    },
    {
      title: 'Shipping Restrictions',
      content: [
        'Some products may have shipping restrictions due to their ingredients.',
        'International orders may be subject to customs duties and import taxes.',
        'We do not ship to PO boxes for certain product categories.',
        'Some remote locations may have limited shipping options.',
      ],
    },
    {
      title: 'Tracking Your Order',
      content: [
        'Tracking numbers are provided via email once your order ships.',
        'You can track your order status on our website or the carrier\'s website.',
        'Delivery estimates are provided at checkout and in shipping confirmation emails.',
        'Please allow 24-48 hours for tracking information to update after shipping.',
      ],
    },
    {
      title: 'International Shipping',
      content: [
        'We ship to most countries worldwide.',
        'International orders may be subject to customs duties and import taxes.',
        'Delivery times vary by country and shipping method.',
        'Some products may not be available for international shipping.',
      ],
    },
    {
      title: 'Shipping Insurance',
      content: [
        'All orders include basic shipping insurance.',
        'Additional insurance is available for high-value orders.',
        'Claims must be filed within 30 days of delivery.',
        'We are not responsible for lost or damaged packages after delivery confirmation.',
      ],
    },
    {
      title: 'Holiday Shipping',
      content: [
        'Extended processing times may apply during peak seasons.',
        'We recommend ordering early during holiday periods.',
        'Holiday shipping deadlines will be posted on our website.',
        'Express shipping may not be available during certain holidays.',
      ],
    },
    {
      title: 'Shipping Address',
      content: [
        'Please ensure your shipping address is complete and accurate.',
        'We are not responsible for packages sent to incorrect addresses.',
        'Address changes must be made before the order ships.',
        'Some addresses may require additional verification.',
      ],
    },
    {
      title: 'Contact Us',
      content: [
        'If you have questions about shipping, please contact us at:',
        'Email: shipping@aurealis.com',
        'Phone: +1 (555) 123-4567',
        'Hours: Monday-Friday, 9am-6pm EST',
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-[#C5A572]/20 to-[#C5A572]/10" />
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-playfair mb-6"
          >
            Shipping Policy
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl max-w-3xl mx-auto text-gray-600"
          >
            Learn about our shipping methods, delivery times, and policies.
          </motion.p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4">
          <div className="space-y-12">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-lg shadow-sm"
              >
                <h2 className="text-2xl font-playfair mb-6">{section.title}</h2>
                {section.title === 'Shipping Methods' ? (
                  <div className="space-y-6">
                    {(section.content as ShippingMethod[]).map((method, methodIndex) => (
                      <div key={methodIndex} className="border-b border-gray-200 pb-6 last:border-0">
                        <h3 className="text-xl font-medium mb-2">{method.name}</h3>
                        <p className="text-[#C5A572] mb-2">{method.description}</p>
                        <p className="font-medium mb-2">{method.cost}</p>
                        <p className="text-gray-600">{method.details}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <ul className="space-y-4">
                    {(section.content as string[]).map((item, itemIndex) => (
                      <li key={itemIndex} className="text-gray-600 flex items-start">
                        <span className="text-[#C5A572] mr-2">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default ShippingPage 