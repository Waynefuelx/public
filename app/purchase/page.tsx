'use client'

import { useState, useEffect, Suspense, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Truck, CreditCard, Package } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import PurchaseBookingForm from '@/components/PurchaseBookingForm'

function PurchasePageContent() {
  const [showBookingForm, setShowBookingForm] = useState(true)
  const searchParams = useSearchParams()
  const formRef = useRef<HTMLDivElement>(null)
  
  // Extract container information from URL parameters
  const containerId = searchParams.get('container')
  const containerType = searchParams.get('type')
  const containerCategory = searchParams.get('category')
  const containerDimensions = searchParams.get('dimensions')
  const containerCapacity = searchParams.get('capacity')
  const containerPrice = searchParams.get('price')
  
  // Helper function to parse price from query parameter
  const parsePrice = (priceString: string | null): number => {
    if (!priceString) return 15000 // default price for purchase
    
    // Extract numeric value from price string (e.g., "R150/day" -> 150)
    const numericMatch = priceString.match(/\d+/)
    return numericMatch ? parseInt(numericMatch[0], 10) : 15000
  }
  
  // Container data to pass to the form
  const selectedContainerData = containerId && containerType ? {
    id: containerId,
    name: containerType,
    category: containerCategory || '',
    description: `${containerType} container for ${containerCategory || 'general use'}`,
    dimensions: containerDimensions || '6m × 2.4m × 2.6m',
    capacity: containerCapacity || '37.4 cu m',
    price: parsePrice(containerPrice),
    image: '/api/placeholder/300/200'
  } : null

  const purchaseSteps = [
    {
      icon: Package,
      title: 'Select Container & Service',
      description: 'Choose your container type and delivery/collection preference'
    },
    {
      icon: Truck,
      title: 'Delivery Details',
      description: 'Provide delivery address and special requirements'
    },
    {
      icon: CreditCard,
      title: 'Payment & Confirmation',
      description: 'Complete your purchase with secure payment'
    }
  ]

  // Auto-scroll to form when page loads with container parameters
  useEffect(() => {
    if (selectedContainerData && formRef.current) {
      // Small delay to ensure page is fully loaded
      setTimeout(() => {
        formRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        })
      }, 500)
    }
  }, [selectedContainerData])

  return (
    <div className="min-h-screen bg-secondary-200">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-6">
            <Link 
              href="/buying"
              className="flex items-center gap-2 text-primary-100 hover:text-white transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Buying Options
            </Link>
          </div>
          
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Purchase Your Container
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-primary-50 max-w-2xl mx-auto"
            >
              Complete your container purchase in just a few simple steps. Our team will confirm your order within 24 hours.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Purchase Steps */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">Simple 3-Step Process</h2>
            <p className="text-lg text-secondary-600">Get your container delivered in no time</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {purchaseSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-8 h-8 text-primary-500" />
                </div>
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                  {index + 1}. {step.title}
                </h3>
                <p className="text-secondary-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Purchase Form */}
      <section ref={formRef} className="py-16 bg-secondary-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-secondary-900 mb-2">Complete Your Purchase</h2>
              <p className="text-secondary-600">Fill out the form below to secure your container purchase</p>
            </div>
            
            <PurchaseBookingForm 
              onSuccess={() => console.log('Purchase successful!')} 
              selectedContainer={selectedContainerData}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Need Help with Your Purchase?</h2>
          <p className="text-xl text-primary-50 mb-8 max-w-2xl mx-auto">
            Our team is here to help you find the perfect container solution for your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/buying"
              className="btn-primary text-lg px-8 py-3 bg-white text-primary-500 hover:bg-secondary-100"
            >
              Browse Containers
            </Link>
            <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-500 font-medium py-3 px-8 rounded-lg transition-colors duration-200 text-lg">
              Contact Sales
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default function PurchasePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-secondary-200 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading purchase form...</p>
        </div>
      </div>
    }>
      <PurchasePageContent />
    </Suspense>
  )
}
