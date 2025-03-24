'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

type FormSection = {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
}

type CheckoutFormData = {
  shipping: FormSection
  billing: FormSection & { sameAsShipping: boolean }
  payment: {
    cardNumber: string
    cardName: string
    expiryDate: string
    cvv: string
  }
}

const CheckoutPage = () => {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<CheckoutFormData>({
    shipping: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
    },
    billing: {
      sameAsShipping: true,
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
    },
    payment: {
      cardNumber: '',
      cardName: '',
      expiryDate: '',
      cvv: '',
    },
  })

  const handleSameAsShippingChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      billing: {
        ...prev.billing,
        sameAsShipping: checked,
        ...(checked ? prev.shipping : {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          address: '',
          city: '',
          state: '',
          zipCode: '',
          country: '',
        }),
      },
    }))
  }

  const handleChange = (section: keyof CheckoutFormData, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
        ...(section === 'shipping' && prev.billing.sameAsShipping && field !== 'sameAsShipping'
          ? { [field]: value }
          : {}),
      },
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // This would typically integrate with your payment processor
    setStep(step + 1)
  }

  // This would typically come from your cart state
  const cartItems = [
    {
      id: '1',
      name: 'Luminous Serum',
      price: 180,
      image: '/product-1.jpg',
      quantity: 2,
    },
    {
      id: '2',
      name: 'Royal Face Cream',
      price: 180,
      image: '/product-2.jpg',
      quantity: 1,
    },
  ]

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 10
  const tax = subtotal * 0.1
  const total = subtotal + shipping + tax

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center space-x-4 mb-8">
          <Link
            href="/cart"
            className="text-[#C5A572] hover:text-[#8B7355]"
          >
            ← Back to Cart
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 shadow-sm rounded-lg">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= 1 ? 'bg-[#C5A572] text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    1
                  </div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= 2 ? 'bg-[#C5A572] text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    2
                  </div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= 3 ? 'bg-[#C5A572] text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    3
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  Step {step} of 3
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <h2 className="text-2xl font-playfair mb-6">Shipping Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          First Name
                        </label>
                        <input
                          type="text"
                          value={formData.shipping.firstName}
                          onChange={(e) => handleChange('shipping', 'firstName', e.target.value)}
                          className="luxury-input w-full"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name
                        </label>
                        <input
                          type="text"
                          value={formData.shipping.lastName}
                          onChange={(e) => handleChange('shipping', 'lastName', e.target.value)}
                          className="luxury-input w-full"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.shipping.email}
                        onChange={(e) => handleChange('shipping', 'email', e.target.value)}
                        className="luxury-input w-full"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.shipping.phone}
                        onChange={(e) => handleChange('shipping', 'phone', e.target.value)}
                        className="luxury-input w-full"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Street Address
                      </label>
                      <input
                        type="text"
                        value={formData.shipping.address}
                        onChange={(e) => handleChange('shipping', 'address', e.target.value)}
                        className="luxury-input w-full"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          value={formData.shipping.city}
                          onChange={(e) => handleChange('shipping', 'city', e.target.value)}
                          className="luxury-input w-full"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          State
                        </label>
                        <input
                          type="text"
                          value={formData.shipping.state}
                          onChange={(e) => handleChange('shipping', 'state', e.target.value)}
                          className="luxury-input w-full"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          ZIP Code
                        </label>
                        <input
                          type="text"
                          value={formData.shipping.zipCode}
                          onChange={(e) => handleChange('shipping', 'zipCode', e.target.value)}
                          className="luxury-input w-full"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Country
                      </label>
                      <input
                        type="text"
                        value={formData.shipping.country}
                        onChange={(e) => handleChange('shipping', 'country', e.target.value)}
                        className="luxury-input w-full"
                        required
                      />
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="sameAsShipping"
                        checked={formData.billing.sameAsShipping}
                        onChange={(e) => handleSameAsShippingChange(e.target.checked)}
                        className="h-4 w-4 text-[#C5A572] focus:ring-[#C5A572] border-gray-300 rounded"
                      />
                      <label htmlFor="sameAsShipping" className="ml-2 text-sm text-gray-600">
                        Billing address is the same as shipping address
                      </label>
                    </div>
                  </motion.div>
                )}

                {step === 2 && !formData.billing.sameAsShipping && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <h2 className="text-2xl font-playfair mb-6">Billing Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          First Name
                        </label>
                        <input
                          type="text"
                          value={formData.billing.firstName}
                          onChange={(e) => handleChange('billing', 'firstName', e.target.value)}
                          className="luxury-input w-full"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name
                        </label>
                        <input
                          type="text"
                          value={formData.billing.lastName}
                          onChange={(e) => handleChange('billing', 'lastName', e.target.value)}
                          className="luxury-input w-full"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.billing.email}
                        onChange={(e) => handleChange('billing', 'email', e.target.value)}
                        className="luxury-input w-full"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.billing.phone}
                        onChange={(e) => handleChange('billing', 'phone', e.target.value)}
                        className="luxury-input w-full"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Street Address
                      </label>
                      <input
                        type="text"
                        value={formData.billing.address}
                        onChange={(e) => handleChange('billing', 'address', e.target.value)}
                        className="luxury-input w-full"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          value={formData.billing.city}
                          onChange={(e) => handleChange('billing', 'city', e.target.value)}
                          className="luxury-input w-full"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          State
                        </label>
                        <input
                          type="text"
                          value={formData.billing.state}
                          onChange={(e) => handleChange('billing', 'state', e.target.value)}
                          className="luxury-input w-full"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          ZIP Code
                        </label>
                        <input
                          type="text"
                          value={formData.billing.zipCode}
                          onChange={(e) => handleChange('billing', 'zipCode', e.target.value)}
                          className="luxury-input w-full"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Country
                      </label>
                      <input
                        type="text"
                        value={formData.billing.country}
                        onChange={(e) => handleChange('billing', 'country', e.target.value)}
                        className="luxury-input w-full"
                        required
                      />
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <h2 className="text-2xl font-playfair mb-6">Payment Information</h2>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        value={formData.payment.cardNumber}
                        onChange={(e) => handleChange('payment', 'cardNumber', e.target.value)}
                        className="luxury-input w-full"
                        placeholder="1234 5678 9012 3456"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        value={formData.payment.cardName}
                        onChange={(e) => handleChange('payment', 'cardName', e.target.value)}
                        className="luxury-input w-full"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          value={formData.payment.expiryDate}
                          onChange={(e) => handleChange('payment', 'expiryDate', e.target.value)}
                          className="luxury-input w-full"
                          placeholder="MM/YY"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          CVV
                        </label>
                        <input
                          type="text"
                          value={formData.payment.cvv}
                          onChange={(e) => handleChange('payment', 'cvv', e.target.value)}
                          className="luxury-input w-full"
                          placeholder="123"
                          required
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                <div className="flex justify-between mt-8">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      className="px-6 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Back
                    </button>
                  )}
                  <button
                    type="submit"
                    className="luxury-button ml-auto"
                  >
                    {step === 3 ? 'Place Order' : 'Continue'}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 shadow-sm rounded-lg">
              <h2 className="text-xl font-playfair mb-6">Order Summary</h2>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <div className="relative h-16 w-16 flex-shrink-0">
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
                      <p className="text-[#C5A572]">${item.price * item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t mt-6 pt-6 space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage 