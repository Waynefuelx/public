'use client'

import { 
  Star, 
  Package, 
  Truck,
  Wrench,
} from 'lucide-react'
import HeroSection from '@/components/organisms/HeroSection'
import Section from '@/components/organisms/Section'
import CTASection from '@/components/organisms/CTASection'
import FAQSection from '@/components/organisms/FAQSection'
import PricingCard from '@/components/molecules/PricingCard'
import ServiceCard from '@/components/molecules/ServiceCard'
import Button from '@/components/atoms/Button'

const BuyingPage = () => {
  const salesOptions = [
    {
      name: 'New Container',
      price: 'R25,000',
      description: 'Brand new container with full warranty',
      features: [
        'Full manufacturer warranty',
        'ISO certified',
        'Multiple size options',
        'Custom modifications available',
        'Delivery included',
        'Quality guarantee'
      ],
      popular: true
    },
    {
      name: 'Used Container',
      price: 'R15,000',
      description: 'Quality pre-owned container at competitive price',
      features: [
        'Quality inspected',
        'Good condition guarantee',
        'Cost-effective option',
        'Multiple sizes available',
        'Delivery available',
        '30-day warranty'
      ],
      popular: false
    },
    {
      name: 'Modified Container',
      price: 'Custom',
      description: 'Custom-converted container for specific needs',
      features: [
        'Custom design & build',
        'Professional installation',
        'Quality materials',
        'Compliance certified',
        'Project management',
        'Warranty included'
      ],
      popular: false
    }
  ]

  const additionalServices = [
    {
      name: 'Delivery & Setup',
      price: 'From R500',
      description: 'Professional delivery and installation service',
      icon: Truck
    },
    {
      name: 'Custom Modifications',
      price: 'Custom Quote',
      description: 'Tailored container modifications and conversions',
      icon: Wrench
    },
    {
      name: 'Bulk Orders',
      price: 'Volume Discounts',
      description: 'Special pricing for multiple container purchases',
      icon: Package
    },
    {
      name: 'Warranty & Support',
      price: 'Included',
      description: 'Comprehensive warranty and ongoing support',
      icon: Star
    }
  ]

  const faqs = [
    {
      question: 'Are there any hidden fees?',
      answer: 'No, our pricing is completely transparent. The price you see is the price you pay, with no hidden charges or surprise fees.'
    },
    {
      question: 'Do you offer volume discounts?',
      answer: 'Yes, we offer competitive volume discounts for bulk container purchases. Contact us for a personalized quote.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, bank transfers, and can arrange payment plans for larger orders.'
    },
    {
      question: 'Is delivery included in the price?',
      answer: 'Delivery costs are clearly stated upfront for all sales. We offer professional delivery and setup services.'
    },
    {
      question: 'What warranty do you provide?',
      answer: 'All new containers come with full manufacturer warranty. Used containers include our quality guarantee.'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection
        title="Buy Containers"
        subtitle="Own Your Solution"
        description="Purchase high-quality containers for permanent use. Competitive pricing with full ownership and customization options."
      />

      <Section
        title="Container Sales Options"
        description="Purchase containers for permanent use with competitive pricing and quality guarantees."
        bgColor="gray"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {salesOptions.map((option, index) => (
            <PricingCard
              key={index}
              name={option.name}
              price={option.price}
              description={option.description}
              features={option.features}
              popular={option.popular}
              href={`/purchase?container=${option.name.toLowerCase().replace(/\s+/g, '-')}&type=${encodeURIComponent(option.name)}&category=Purchase&dimensions=6m+%C3%97+2.4m+%C3%97+2.6m&capacity=37.4+cu+m&price=${option.price.replace(/[^\d]/g, '')}`}
            />
          ))}
        </div>
      </Section>

      <Section
        title="Additional Services"
        description="Value-added services to enhance your container experience."
        bgColor="white"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {additionalServices.map((service, index) => (
            <ServiceCard
              key={index}
              name={service.name}
              price={service.price}
              description={service.description}
              icon={service.icon}
            />
          ))}
        </div>
      </Section>

      <FAQSection
        title="Frequently Asked Questions"
        description="Common questions about purchasing containers."
        faqs={faqs}
      />

      <CTASection
        title="Ready to Buy?"
        description="Contact our sales team today to discuss your container purchase and get a personalized quote."
        actions={
          <>
            <Button href="/purchase" variant="secondary" size="lg" fullWidth className="bg-white text-primary-500 hover:bg-secondary-100">
              Buy Now
            </Button>
            <Button href="/contact" variant="secondary" size="lg" fullWidth>
              Contact Sales
            </Button>
          </>
        }
      />
    </div>
  )
}

export default BuyingPage
