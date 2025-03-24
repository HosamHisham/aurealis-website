'use client'

import React from 'react'
import { motion } from 'framer-motion'

const PrivacyPage = () => {
  const sections = [
    {
      title: 'Information We Collect',
      content: [
        'Personal information (name, email, address, phone number)',
        'Payment information (processed securely through our payment partners)',
        'Order history and preferences',
        'Device and usage information',
        'Cookies and tracking data',
      ],
    },
    {
      title: 'How We Use Your Information',
      content: [
        'To process your orders and payments',
        'To communicate with you about your orders and account',
        'To send marketing communications (with your consent)',
        'To improve our products and services',
        'To comply with legal obligations',
      ],
    },
    {
      title: 'Information Sharing',
      content: [
        'We do not sell your personal information',
        'We share information with service providers who assist in our operations',
        'We may share information to comply with legal requirements',
        'We may share information in connection with a business transfer',
      ],
    },
    {
      title: 'Your Rights',
      content: [
        'Access your personal information',
        'Correct inaccurate information',
        'Request deletion of your information',
        'Opt-out of marketing communications',
        'Export your data',
      ],
    },
    {
      title: 'Data Security',
      content: [
        'We implement appropriate security measures to protect your information',
        'We use encryption for data transmission',
        'We regularly review and update our security practices',
        'We limit access to personal information to authorized personnel',
      ],
    },
    {
      title: 'Cookies and Tracking',
      content: [
        'We use cookies to enhance your shopping experience',
        'You can control cookie preferences through your browser settings',
        'We use analytics tools to understand website usage',
        'Third-party services may also use cookies',
      ],
    },
    {
      title: 'Children\'s Privacy',
      content: [
        'Our website is not intended for children under 13',
        'We do not knowingly collect information from children',
        'If you believe we have collected information from a child, please contact us',
      ],
    },
    {
      title: 'Changes to This Policy',
      content: [
        'We may update this privacy policy from time to time',
        'We will notify you of any material changes',
        'Continued use of our services constitutes acceptance of changes',
      ],
    },
    {
      title: 'Contact Us',
      content: [
        'If you have questions about this privacy policy, please contact us at:',
        'Email: privacy@aurealis.com',
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
            Privacy Policy
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

export default PrivacyPage 