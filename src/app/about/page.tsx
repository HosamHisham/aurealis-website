'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const AboutPage = () => {
  const team = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & CEO',
      image: '/images/team-1.jpg',
      bio: 'With over 15 years of experience in the beauty industry, Sarah founded Aurealis with a vision to create luxurious, effective skincare products.',
    },
    {
      name: 'Dr. Michael Chen',
      role: 'Head of Research',
      image: '/images/team-2.jpg',
      bio: 'Dr. Chen brings his expertise in dermatology and natural ingredients to develop innovative formulations.',
    },
    {
      name: 'Emma Rodriguez',
      role: 'Creative Director',
      image: '/images/team-3.jpg',
      bio: 'Emma oversees the visual identity and packaging design, ensuring our products reflect the luxury they contain.',
    },
  ]

  const values = [
    {
      title: 'Quality',
      description: 'We never compromise on quality, using only the finest ingredients and rigorous testing processes.',
      icon: '✨',
    },
    {
      title: 'Innovation',
      description: 'We continuously research and develop new formulations to bring you the latest in skincare technology.',
      icon: '🔬',
    },
    {
      title: 'Sustainability',
      description: 'We are committed to sustainable practices, from sourcing to packaging.',
      icon: '🌱',
    },
    {
      title: 'Transparency',
      description: 'We believe in being open about our ingredients and processes.',
      icon: '🔍',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/images/about-hero.jpg"
            alt="About Aurealis"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-playfair mb-6"
          >
            Our Story
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl max-w-3xl mx-auto"
          >
            Discover how we're revolutionizing luxury skincare with natural ingredients and innovative formulations.
          </motion.p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative h-[500px]"
            >
              <Image
                src="/images/mission-image.jpg"
                alt="Our Mission"
                fill
                className="object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-3xl font-playfair mb-6">Our Mission</h2>
              <p className="text-gray-600 mb-6">
                At Aurealis, we believe that true beauty comes from within and is enhanced by nature's finest ingredients. Our mission is to create luxurious skincare products that not only make you look beautiful but also feel beautiful.
              </p>
              <p className="text-gray-600 mb-8">
                We combine cutting-edge scientific research with traditional beauty wisdom to develop products that are both effective and indulgent. Every product in our collection is carefully formulated to deliver visible results while providing a sensorial experience that elevates your daily skincare routine.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-playfair text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-playfair mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-playfair text-center mb-12">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="relative h-64 mb-6">
                  <Image
                    src="/images/team-1.jpg"
                    alt={member.name}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <h3 className="text-xl font-playfair mb-1">{member.name}</h3>
                <p className="text-[#C5A572] mb-4">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-playfair mb-4">Get in Touch</h2>
          <p className="text-gray-600 mb-8">
            Have questions about our products or want to learn more? We'd love to hear from you.
          </p>
          <a
            href="mailto:contact@aurealis.com"
            className="luxury-button inline-block"
          >
            Contact Us
          </a>
        </div>
      </section>
    </div>
  )
}

export default AboutPage 