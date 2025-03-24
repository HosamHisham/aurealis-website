'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: 'What makes Aurealis products different from other luxury skincare brands?',
      answer: 'Aurealis combines cutting-edge scientific research with traditional beauty wisdom. Our products are formulated with carefully selected natural ingredients and advanced skincare technology to deliver visible results. We maintain strict quality control and never compromise on ingredient quality or formulation standards.',
    },
    {
      question: 'Are Aurealis products suitable for all skin types?',
      answer: 'Yes, our product range is designed to cater to all skin types. Each product is carefully formulated and tested to ensure compatibility with different skin types. We recommend reading the product descriptions and consulting with our skincare experts if you have specific concerns.',
    },
    {
      question: 'How long does shipping take?',
      answer: 'We offer standard shipping (3-5 business days) and express shipping (1-2 business days) options. International shipping times vary by location. All orders are carefully packaged to ensure your products arrive in perfect condition.',
    },
    {
      question: 'What is your return policy?',
      answer: "We offer a 30-day return policy for all unopened products. If you're not satisfied with your purchase, you can return it within 30 days of delivery for a full refund. Opened products may be eligible for store credit.",
    },
    {
      question: 'Do you offer international shipping?',
      answer: 'Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location. You can check shipping rates and estimated delivery times during checkout.',
    },
    {
      question: 'How can I track my order?',
      answer: "Once your order ships, you'll receive a tracking number via email. You can use this number to track your order status on our website or the shipping carriers website.",
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay. All payments are processed securely through our payment partners.',
    },
    {
      question: 'Do you offer gift wrapping?',
      answer: "Yes, we offer complimentary gift wrapping for all orders. You can select this option during checkout, and we'll wrap your items beautifully with our signature packaging.",
    },
    {
      question: 'How can I contact customer service?',
      answer: 'Our customer service team is available Monday through Friday, 9am-6pm EST. You can reach us via email at support@aurealis.com or by phone at +1 (555) 123-4567.',
    },
    {
      question: 'Do you have a loyalty program?',
      answer: 'Yes, we have the Aurealis Rewards program. Members earn points for every purchase, which can be redeemed for discounts on future orders. You can sign up for free during checkout or in your account settings.',
    },
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

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
            Frequently Asked Questions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl max-w-3xl mx-auto text-gray-600"
          >
            Find answers to common questions about our products, shipping, and services.
          </motion.p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
                >
                  <span className="text-lg font-medium">{faq.question}</span>
                  <span className={`transform transition-transform ${openIndex === index ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 py-4 text-gray-600">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-playfair mb-4">Still Have Questions?</h2>
          <p className="text-gray-600 mb-8">
            Can't find what you're looking for? Our customer service team is here to help.
          </p>
          <a
            href="/contact"
            className="luxury-button inline-block"
          >
            Contact Us
          </a>
        </div>
      </section>
    </div>
  )
}

export default FAQPage 