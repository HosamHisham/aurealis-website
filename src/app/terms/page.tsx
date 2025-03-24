'use client'

import React from 'react'
import { motion } from 'framer-motion'

const TermsPage = () => {
  const sections = [
    {
      title: 'Agreement to Terms',
      content: [
        'By accessing or using our website, you agree to be bound by these Terms of Service.',
        'If you disagree with any part of these terms, you may not access our website.',
        'These terms apply to all users, customers, and visitors of our website.',
      ],
    },
    {
      title: 'Use License',
      content: [
        'Permission is granted to temporarily access our website for personal, non-commercial use.',
        'This license does not include modifying, copying, or distributing our content.',
        'You may not use our website for any commercial purpose without our written consent.',
        'We reserve the right to terminate this license at any time.',
      ],
    },
    {
      title: 'User Accounts',
      content: [
        'You must be at least 18 years old to create an account.',
        'You are responsible for maintaining the confidentiality of your account.',
        'You agree to provide accurate and complete information.',
        'We reserve the right to suspend or terminate accounts that violate our terms.',
      ],
    },
    {
      title: 'Product Information',
      content: [
        'We strive to provide accurate product descriptions and pricing.',
        'We reserve the right to modify prices and product information without notice.',
        'Product images may vary from actual products.',
        'We are not responsible for typographical errors in product information.',
      ],
    },
    {
      title: 'Order Acceptance',
      content: [
        'All orders are subject to acceptance and availability.',
        'We reserve the right to refuse service to anyone.',
        'We may cancel orders for any reason, including pricing errors.',
        'We will notify you if your order is cancelled.',
      ],
    },
    {
      title: 'Payment Terms',
      content: [
        'All prices are in USD unless otherwise stated.',
        'We accept various payment methods as indicated during checkout.',
        'Payment information is processed securely through our payment partners.',
        'You agree to pay all charges at the prices in effect when incurred.',
      ],
    },
    {
      title: 'Shipping and Delivery',
      content: [
        'We ship to most countries worldwide.',
        'Shipping times and costs vary by location.',
        'We are not responsible for customs duties or import taxes.',
        'Delivery dates are estimates and not guaranteed.',
      ],
    },
    {
      title: 'Returns and Refunds',
      content: [
        'We offer a 30-day return policy for unopened products.',
        'Opened products may be eligible for store credit.',
        'Shipping costs for returns are the customer\'s responsibility.',
        'Refunds will be processed within 14 business days.',
      ],
    },
    {
      title: 'Intellectual Property',
      content: [
        'All content on our website is protected by copyright and other laws.',
        'You may not use our trademarks without our written permission.',
        'User-generated content remains the property of the user.',
        'We may use your content for marketing purposes with your consent.',
      ],
    },
    {
      title: 'Limitation of Liability',
      content: [
        'We are not liable for any indirect, incidental, or consequential damages.',
        'Our liability is limited to the amount paid for the product.',
        'We are not responsible for third-party actions or content.',
        'Some jurisdictions do not allow limitations of liability.',
      ],
    },
    {
      title: 'Changes to Terms',
      content: [
        'We may update these terms at any time.',
        'We will notify you of any material changes.',
        'Continued use of our website constitutes acceptance of changes.',
        'You should review these terms periodically.',
      ],
    },
    {
      title: 'Contact Information',
      content: [
        'If you have questions about these terms, please contact us at:',
        'Email: legal@aurealis.com',
        'Phone: +1 (555) 123-4567',
        'Address: 123 Beauty Lane, New York, NY 10001',
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
            Terms of Service
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl max-w-3xl mx-auto text-gray-600"
          >
            Last updated: {new Date().toLocaleDateString()}
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
                <ul className="space-y-4">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-gray-600 flex items-start">
                      <span className="text-[#C5A572] mr-2">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default TermsPage 