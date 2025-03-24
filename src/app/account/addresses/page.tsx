'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Address = {
  id: string
  type: 'shipping' | 'billing'
  name: string
  fullName: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
  phone: string
  isDefault: boolean
}

type ValidationErrors = {
  [K in keyof Omit<Address, 'id' | 'isDefault'>]?: string
}

const AddressesPage = () => {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: '1',
      type: 'shipping',
      name: 'Home',
      fullName: 'John Doe',
      address: '123 Luxury Lane',
      city: 'Beverly Hills',
      state: 'CA',
      zipCode: '90210',
      country: 'United States',
      phone: '+1 (555) 123-4567',
      isDefault: true,
    },
    {
      id: '2',
      type: 'billing',
      name: 'Office',
      fullName: 'John Doe',
      address: '456 Business Ave',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90001',
      country: 'United States',
      phone: '+1 (555) 123-4567',
      isDefault: true,
    },
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [editingAddress, setEditingAddress] = useState<Address | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null)
  const [errors, setErrors] = useState<ValidationErrors>({})
  
  const [formData, setFormData] = useState<Omit<Address, 'id' | 'isDefault'>>({
    type: 'shipping' as const,
    name: '',
    fullName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: '',
  })

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {}

    // Name validation
    if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }

    // Full name validation
    if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters'
    }

    // Address validation
    if (formData.address.trim().length < 5) {
      newErrors.address = 'Please enter a valid address'
    }

    // City validation
    if (formData.city.trim().length < 2) {
      newErrors.city = 'Please enter a valid city'
    }

    // State validation
    if (formData.state.trim().length < 2) {
      newErrors.state = 'Please enter a valid state'
    }

    // ZIP code validation
    const zipRegex = /^\d{5}(-\d{4})?$/
    if (!zipRegex.test(formData.zipCode)) {
      newErrors.zipCode = 'Please enter a valid ZIP code (e.g., 12345 or 12345-6789)'
    }

    // Phone validation
    const phoneRegex = /^\+?1?\s*\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}$/
    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    try {
      if (editingAddress) {
        // Update existing address
        setAddresses(addresses.map(addr => 
          addr.id === editingAddress.id ? { ...addr, ...formData } : addr
        ))
      } else {
        // Add new address with isDefault set to false for new addresses
        const newAddress = { 
          ...formData, 
          id: Date.now().toString(), 
          isDefault: addresses.length === 0 // Make default if it's the first address
        }
        setAddresses([...addresses, newAddress])
      }
      
      // Reset form
      setShowAddForm(false)
      setEditingAddress(null)
      setFormData({
        type: 'shipping' as const,
        name: '',
        fullName: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        phone: '',
      })
      setErrors({})
    } catch (error) {
      console.error('Error saving address:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (address: Address) => {
    setEditingAddress(address)
    const { id, isDefault, ...formFields } = address
    setFormData(formFields)
    setShowAddForm(true)
    setErrors({})
  }

  const handleDelete = async (id: string) => {
    setShowDeleteConfirm(id)
  }

  const confirmDelete = async (id: string) => {
    setIsLoading(true)
    try {
      const addressToDelete = addresses.find(addr => addr.id === id)
      setAddresses(addresses.filter(addr => addr.id !== id))
      
      // If we're deleting a default address, make another one default
      if (addressToDelete?.isDefault && addresses.length > 1) {
        const remainingAddresses = addresses.filter(addr => addr.id !== id)
        const newDefault = remainingAddresses[0]
        setAddresses(remainingAddresses.map(addr => 
          addr.id === newDefault.id ? { ...addr, isDefault: true } : addr
        ))
      }
    } catch (error) {
      console.error('Error deleting address:', error)
    } finally {
      setIsLoading(false)
      setShowDeleteConfirm(null)
    }
  }

  const handleSetDefault = async (address: Address) => {
    if (address.isDefault) return

    setIsLoading(true)
    try {
      setAddresses(addresses.map(addr => ({
        ...addr,
        isDefault: addr.id === address.id
      })))
    } catch (error) {
      console.error('Error setting default address:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-playfair">My Addresses</h1>
          <button
            onClick={() => setShowAddForm(true)}
            className="luxury-button"
            disabled={isLoading}
          >
            Add New Address
          </button>
        </div>

        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white p-8 shadow-sm mb-8"
          >
            <h2 className="text-2xl font-playfair mb-6">
              {editingAddress ? 'Edit Address' : 'Add New Address'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as Address['type'] })}
                    className="luxury-input w-full"
                    disabled={isLoading}
                  >
                    <option value="shipping">Shipping</option>
                    <option value="billing">Billing</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value })
                      if (errors.name) {
                        setErrors({ ...errors, name: undefined })
                      }
                    }}
                    className={`luxury-input w-full ${errors.name ? 'border-red-500' : ''}`}
                    required
                    disabled={isLoading}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => {
                    setFormData({ ...formData, fullName: e.target.value })
                    if (errors.fullName) {
                      setErrors({ ...errors, fullName: undefined })
                    }
                  }}
                  className={`luxury-input w-full ${errors.fullName ? 'border-red-500' : ''}`}
                  required
                  disabled={isLoading}
                />
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => {
                    setFormData({ ...formData, address: e.target.value })
                    if (errors.address) {
                      setErrors({ ...errors, address: undefined })
                    }
                  }}
                  className={`luxury-input w-full ${errors.address ? 'border-red-500' : ''}`}
                  required
                  disabled={isLoading}
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-600">{errors.address}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => {
                      setFormData({ ...formData, city: e.target.value })
                      if (errors.city) {
                        setErrors({ ...errors, city: undefined })
                      }
                    }}
                    className={`luxury-input w-full ${errors.city ? 'border-red-500' : ''}`}
                    required
                    disabled={isLoading}
                  />
                  {errors.city && (
                    <p className="mt-1 text-sm text-red-600">{errors.city}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => {
                      setFormData({ ...formData, state: e.target.value })
                      if (errors.state) {
                        setErrors({ ...errors, state: undefined })
                      }
                    }}
                    className={`luxury-input w-full ${errors.state ? 'border-red-500' : ''}`}
                    required
                    disabled={isLoading}
                  />
                  {errors.state && (
                    <p className="mt-1 text-sm text-red-600">{errors.state}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    value={formData.zipCode}
                    onChange={(e) => {
                      setFormData({ ...formData, zipCode: e.target.value })
                      if (errors.zipCode) {
                        setErrors({ ...errors, zipCode: undefined })
                      }
                    }}
                    className={`luxury-input w-full ${errors.zipCode ? 'border-red-500' : ''}`}
                    required
                    disabled={isLoading}
                  />
                  {errors.zipCode && (
                    <p className="mt-1 text-sm text-red-600">{errors.zipCode}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => {
                      setFormData({ ...formData, country: e.target.value })
                      if (errors.country) {
                        setErrors({ ...errors, country: undefined })
                      }
                    }}
                    className={`luxury-input w-full ${errors.country ? 'border-red-500' : ''}`}
                    required
                    disabled={isLoading}
                  />
                  {errors.country && (
                    <p className="mt-1 text-sm text-red-600">{errors.country}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData({ ...formData, phone: e.target.value })
                      if (errors.phone) {
                        setErrors({ ...errors, phone: undefined })
                      }
                    }}
                    className={`luxury-input w-full ${errors.phone ? 'border-red-500' : ''}`}
                    required
                    disabled={isLoading}
                    placeholder="+1 (555) 123-4567"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false)
                    setEditingAddress(null)
                    setFormData({
                      type: 'shipping' as const,
                      name: '',
                      fullName: '',
                      address: '',
                      city: '',
                      state: '',
                      zipCode: '',
                      country: '',
                      phone: '',
                    })
                    setErrors({})
                  }}
                  className="px-6 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="luxury-button"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    editingAddress ? 'Update Address' : 'Add Address'
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        )}

        <AnimatePresence>
          {showDeleteConfirm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            >
              <div className="bg-white p-8 rounded-lg max-w-md w-full mx-4">
                <h3 className="text-xl font-medium mb-4">Confirm Delete</h3>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to delete this address? This action cannot be undone.
                </p>
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => setShowDeleteConfirm(null)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => showDeleteConfirm && confirmDelete(showDeleteConfirm)}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {addresses.map((address, index) => (
            <motion.div
              key={address.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 shadow-sm"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-playfair">{address.name}</h3>
                  <p className="text-sm text-gray-500 capitalize">{address.type} Address</p>
                </div>
                <div className="flex items-center space-x-2">
                  {address.isDefault ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      Default
                    </span>
                  ) : (
                    <button
                      onClick={() => handleSetDefault(address)}
                      className="text-sm text-[#C5A572] hover:text-[#8B7355]"
                      disabled={isLoading}
                    >
                      Set as Default
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-2 text-gray-600">
                <p>{address.fullName}</p>
                <p>{address.address}</p>
                <p>{address.city}, {address.state} {address.zipCode}</p>
                <p>{address.country}</p>
                <p>{address.phone}</p>
              </div>

              <div className="flex space-x-4 mt-6">
                <button
                  onClick={() => handleEdit(address)}
                  className="text-[#C5A572] hover:text-[#8B7355]"
                  disabled={isLoading}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(address.id)}
                  className="text-red-600 hover:text-red-800"
                  disabled={isLoading || (address.isDefault && addresses.length > 1)}
                >
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AddressesPage 