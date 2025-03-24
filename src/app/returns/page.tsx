'use client'

import React from 'react'
import { motion } from 'framer-motion'

type ReturnEligibilityItem = {
  category: string
  description: string
  details: string
}

type Section = {
  title: string
  content: ReturnEligibilityItem[] | string[]
}

const ReturnsPage = () => {
  const sections: Section[] = [
    {
      title: 'Return Eligibility',
      content: [
        {
          category: 'Unopened Products',
          description: 'Full refund within 30 days of delivery',
          details: 'Product must be in original packaging with all seals intact.',
        },
        {
          category: 'Opened Products',
          description: 'Store credit within 30 days of delivery',
          details: 'Product must be at least 80% full and in good condition.',
        },
        {
          category: 'Damaged Products',
          description: 'Full refund or replacement',
          details: 'Must be reported within 48 hours of delivery with photos.',
        },
      ] as ReturnEligibilityItem[],
    },
    {
      title: 'Return Process',
      content: [
        'Log into your account and select the order you wish to return.',
        'Choose the items you want to return and provide a reason.',
        'Print the provided return shipping label.',
        'Package your items securely in the original packaging.',
        'Drop off your package at any authorized shipping location.',
        'Track your return status through your account.',
      ],
    },
    {
      title: 'Shipping Costs',
      content: [
        'Free returns with our prepaid shipping label for US orders.',
        'International returns require customer to pay shipping costs.',
        'Original shipping costs are non-refundable.',
        'Return shipping costs will be deducted from refunds for opened items.',
      ],
    },
    {
      title: 'Refund Process',
      content: [
        'Refunds are processed within 14 business days of receiving your return.',
        'Refunds will be issued to the original payment method.',
        'Store credit is issued immediately upon return receipt.',
        'You will receive an email confirmation when your refund is processed.',
        'Refunds may take 5-10 business days to appear on your statement.',
      ],
    },
    {
      title: 'Non-Returnable Items',
      content: [
        'Personal care items that have been opened or used.',
        'Gift cards and digital products.',
        'Items marked as "Final Sale".',
        'Custom or personalized items.',
        'Items damaged due to customer misuse.',
      ],
    },
    {
      title: 'Damaged or Incorrect Items',
      content: [
        'Please inspect your order upon delivery.',
        'Report damaged items within 48 hours with photos.',
        'Report incorrect items within 7 days of delivery.',
        'We will provide a prepaid return label for damaged/incorrect items.',
        'Replacement items will be shipped at no additional cost.',
      ],
    },
    {
      title: 'International Returns',
      content: [
        'International returns must be initiated within 30 days of delivery.',
        'Customers are responsible for return shipping costs.',
        'Items must be returned to our international returns center.',
        'Customs documentation must be completed accurately.',
        'Refunds will be issued in the original currency.',
      ],
    },
    {
      title: 'Contact Us',
      content: [
        'If you have questions about returns, please contact us at:',
        'Email: returns@aurealis.com',
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
            Returns Policy
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl max-w-3xl mx-auto text-gray-600"
          >
            Learn about our return process, eligibility, and refund policies.
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
                {section.title === 'Return Eligibility' ? (
                  <div className="space-y-6">
                    {(section.content as ReturnEligibilityItem[]).map((item, itemIndex) => (
                      <div key={itemIndex} className="border-b border-gray-200 pb-6 last:border-0">
                        <h3 className="text-xl font-medium mb-2">{item.category}</h3>
                        <p className="text-[#C5A572] mb-2">{item.description}</p>
                        <p className="text-gray-600">{item.details}</p>
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

export default ReturnsPage 