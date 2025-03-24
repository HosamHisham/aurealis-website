'use client'

import React from 'react'
import { motion } from 'framer-motion'

const LoadingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="relative w-24 h-24 mx-auto">
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute inset-0 border-4 border-[#C5A572] border-t-transparent rounded-full"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[#C5A572] text-xl font-playfair">A</span>
            </div>
          </div>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-600"
        >
          Loading...
        </motion.p>
      </div>
    </div>
  )
}

export default LoadingPage 