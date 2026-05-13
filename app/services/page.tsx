'use client'

import { useState } from 'react'
import { 
  Wrench, 
  Building2, 
  Package, 
  Users, 
  Coffee, 
  GraduationCap,
  Sun,
  Droplets,
} from 'lucide-react'
import HeroSection from '@/components/organisms/HeroSection'
import Section from '@/components/organisms/Section'
import CTASection from '@/components/organisms/CTASection'
import ConversionCard from '@/components/molecules/ConversionCard'
import BranchCard from '@/components/molecules/BranchCard'
import Button from '@/components/atoms/Button'
import BranchLocationModal from '@/components/BranchLocationModal'
import ConversionQuoteModal from '@/components/ConversionQuoteModal'

const ConversionsPage = () => {
  const [isBranchModalOpen, setIsBranchModalOpen] = useState(false)
  const [isConversionQuoteModalOpen, setIsConversionQuoteModalOpen] = useState(false)
  const [selectedConversionType, setSelectedConversionType] = useState<string>('')
  
  const conversionTypes = [
    {
      id: 1,
      name: 'Site Offices',
      description: 'Professional office spaces converted from containers, perfect for construction sites and temporary workspaces.',
      icon: Building2,
      features: [
        'Fully equipped workstations',
        'Air conditioning & heating',
        'Electrical & internet ready',
        'Security features',
        'Quick setup & removal'
      ],
      image: 'https://valleycontainers.co.za/wp-content/uploads/2025/04/6m-office-container.png',
      popular: true
    },
    {
      id: 2,
      name: 'Free-standing / Mobile Office Units',
      description: 'Independent office solutions that can be positioned anywhere on your property with full mobility.',
      icon: Building2,
      features: [
        'Self-contained units',
        'Easy relocation',
        'Professional appearance',
        'Customizable layouts',
        'Cost-effective solution'
      ],
      image: 'https://valleycontainers.co.za/wp-content/uploads/2025/04/Elite-office-unit.png',
      popular: false
    },
    {
      id: 3,
      name: 'Specialised Storage Solutions',
      description: 'Custom storage containers designed for specific industries and unique storage requirements.',
      icon: Package,
      features: [
        'Industry-specific designs',
        'Climate control options',
        'Security enhancements',
        'Custom shelving',
        'Accessibility features'
      ],
      image: 'https://valleycontainers.co.za/wp-content/uploads/2025/02/storage_container.png',
      popular: false
    },
    {
      id: 4,
      name: 'Accommodation Units',
      description: 'Comfortable living spaces converted from containers, perfect for workers, students, or temporary housing.',
      icon: Users,
      features: [
        'Sleeping quarters',
        'Basic amenities',
        'Climate control',
        'Security features',
        'Flexible configurations'
      ],
      image: 'https://valleycontainers.co.za/wp-content/uploads/2025/04/6-m-sleeper-container-2.png',
      popular: true
    },
    {
      id: 5,
      name: 'Ablution Facilities',
      description: 'Sanitation and hygiene facilities converted from containers for construction sites and events.',
      icon: Droplets,
      features: [
        'Bathroom facilities',
        'Shower units',
        'Hygiene stations',
        'Water management',
        'Easy maintenance'
      ],
      image: 'https://valleycontainers.co.za/wp-content/uploads/2025/03/Ablution-Container.png',
      popular: false
    },
    {
      id: 6,
      name: 'Mobile Workshops',
      description: 'Fully equipped workshop spaces that can be moved to different locations as needed.',
      icon: Wrench,
      features: [
        'Workbench areas',
        'Tool storage',
        'Power distribution',
        'Ventilation systems',
        'Mobile capability'
      ],
      image: 'https://valleycontainers.co.za/wp-content/uploads/2025/02/storage_office.png',
      popular: false
    },
    {
      id: 7,
      name: 'Pre-schools / Classrooms',
      description: 'Educational spaces converted from containers, providing safe learning environments.',
      icon: GraduationCap,
      features: [
        'Child-safe design',
        'Educational layouts',
        'Natural lighting',
        'Safety features',
        'Easy maintenance'
      ],
      image: 'https://valleycontainers.co.za/wp-content/uploads/2025/03/container-conversions-5.webp',
      popular: false
    },
    {
      id: 8,
      name: 'Soup Kitchens',
      description: 'Food service facilities converted from containers for community feeding programs.',
      icon: Users,
      features: [
        'Kitchen equipment',
        'Serving areas',
        'Storage space',
        'Hygiene facilities',
        'Community access'
      ],
      image: 'https://valleycontainers.co.za/wp-content/uploads/2025/03/container-conversions-3.png_1-400x284.webp',
      popular: false
    },
    {
      id: 9,
      name: 'Remote Solar Grids',
      description: 'Solar power installations integrated into containers for off-grid energy solutions.',
      icon: Sun,
      features: [
        'Solar panel integration',
        'Battery storage',
        'Power distribution',
        'Monitoring systems',
        'Off-grid capability'
      ],
      image: 'https://valleycontainers.co.za/wp-content/uploads/2025/03/container-conversions-7-400x284.webp',
      popular: false
    },
    {
      id: 10,
      name: 'Coffee Shops',
      description: 'Mobile coffee shop solutions converted from containers for events and permanent locations.',
      icon: Coffee,
      features: [
        'Coffee equipment',
        'Serving counter',
        'Storage space',
        'Customer seating',
        'Mobile operation'
      ],
      image: 'https://valleycontainers.co.za/wp-content/uploads/2025/04/6m-pavilion.png',
      popular: false
    },
    {
      id: 11,
      name: 'Promotion Stands / Site Branding',
      description: 'Marketing and promotional spaces converted from containers for brand visibility.',
      icon: Building2,
      features: [
        'Brand integration',
        'Display areas',
        'Interactive elements',
        'Mobile deployment',
        'Custom graphics'
      ],
      image: 'https://valleycontainers.co.za/wp-content/uploads/2025/04/6m-pavilion.png',
      popular: false
    },
    {
      id: 12,
      name: 'Water Purification Systems',
      description: 'Water treatment facilities converted from containers for clean water production.',
      icon: Droplets,
      features: [
        'Filtration systems',
        'Treatment processes',
        'Storage tanks',
        'Monitoring equipment',
        'Mobile deployment'
      ],
      image: 'https://valleycontainers.co.za/wp-content/uploads/2025/02/storage_refrigeration.png',
      popular: false
    }
  ]

  const branches = [
    {
      name: 'George Branch',
      city: 'George',
      province: 'Western Cape',
      phone: '+27 44 878 0878',
      email: 'info@valleycontainers.co.za',
      hours: 'Mon-Fri: 8:00 AM - 5:00 PM'
    },
    {
      name: 'Cape Town Branch',
      city: 'Cape Town',
      province: 'Western Cape',
      phone: '+27 72 211 1052',
      email: 'cpt@valleycontainers.co.za',
      hours: 'Mon-Fri: 8:00 AM - 5:00 PM'
    },
    {
      name: 'Mossel Bay Branch',
      city: 'Mossel Bay',
      province: 'Western Cape',
      phone: '+27 (0)44 695 2555',
      email: 'msb@valleycontainers.co.za',
      hours: 'Mon-Fri: 8:00 AM - 5:00 PM'
    },
    {
      name: 'Gqeberha Branch',
      city: 'Gqeberha',
      province: 'Eastern Cape',
      phone: '+27 (0) 61 451 8829',
      email: 'sales@valleycontainers.co.za',
      hours: 'Mon-Fri: 8:00 AM - 5:00 PM'
    },
    {
      name: 'Kimberley Branch',
      city: 'Kimberley',
      province: 'Northern Cape',
      phone: '+27 (0)53 831 1554',
      email: 'kimberley@valleycontainers.co.za',
      hours: 'Mon-Fri: 8:00 AM - 5:00 PM'
    },
    {
      name: 'Johannesburg Branch',
      city: 'Johannesburg',
      province: 'Gauteng',
      phone: '+27 71 371 2972',
      email: 'jhb@valleycontainers.co.za',
      hours: 'Mon-Fri: 8:00 AM - 5:00 PM'
    },
    {
      name: 'Mauritius Branch',
      city: 'Mauritius',
      province: 'International',
      phone: '+230 606 7684',
      email: 'info@valleycontainersma.mu',
      hours: 'Mon-Fri: 8:00 AM - 5:00 PM'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection
        title="Container Conversions"
        subtitle="Custom Solutions"
        description="Valley Containers has over a decade of container conversion experience. Transform standard containers into versatile, functional spaces."
        actions={
          <>
            <Button
              onClick={() => {
                setSelectedConversionType('')
                setIsConversionQuoteModalOpen(true)
              }}
              variant="secondary"
              size="lg"
              fullWidth
              className="bg-white text-primary-500 hover:bg-secondary-100"
            >
              Get A Quote
            </Button>
            <Button
              onClick={() => setIsBranchModalOpen(true)}
              variant="secondary"
              size="lg"
              fullWidth
            >
              Contact Us
            </Button>
          </>
        }
      />

      <Section bgColor="white" centered>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            CUSTOM CONTAINERS
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
            You can transform a standard containers into versatile, functional spaces with our expert container conversions near me. 
            Whatever your need for modified shipping containers is, we can bring your vision to life. Our team specialises in 
            creating custom shipping containers tailored to your specific needs, handling everything from design to sourcing 
            appliances and furniture.
          </p>
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-6">
            <p className="text-primary-800 font-medium">
              All modified shipping container are thoroughly tested, including electrical and plumbing, 
              to ensure it's ready for immediate use upon delivery.
            </p>
          </div>
        </div>
      </Section>

      <Section
        title="Types of Shipping Container Conversions"
        description="From office spaces to specialized facilities, we can convert containers for any purpose."
        bgColor="gray"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {conversionTypes.map((conversion) => (
            <ConversionCard
              key={conversion.id}
              id={conversion.id}
              name={conversion.name}
              description={conversion.description}
              features={conversion.features}
              image={conversion.image}
              icon={conversion.icon}
              popular={conversion.popular}
            />
          ))}
        </div>
      </Section>

      <Section
        title="Get in touch with us"
        description="Contact us by phone for immediate live assistance – or send us an email. We'll get back to you as soon as we can."
        bgColor="white"
        centered
      >
        <p className="text-lg text-gray-700 mb-8">
          Get in touch with any of our branches to arrange a visit to our depot or to discuss your specific requirements.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {branches.map((branch) => (
            <BranchCard
              key={branch.name}
              name={branch.name}
              city={branch.city}
              province={branch.province}
              phone={branch.phone}
              email={branch.email}
              hours={branch.hours}
            />
          ))}
        </div>
      </Section>

      <CTASection
        title="Get your quote today!"
        description="Ready to transform your container into something extraordinary? Contact our team today to discuss your conversion needs."
        actions={
          <>
            <Button
              href="mailto:info@valleycontainers.co.za?subject=Container Conversion Quote Request&body=Hi, I would like to request a quote for container conversion services. Please contact me with more information about your conversion options and pricing."
              variant="secondary"
              size="lg"
              fullWidth
            >
              Get A Quote
            </Button>
            <Button
              onClick={() => setIsBranchModalOpen(true)}
              variant="secondary"
              size="lg"
              fullWidth
            >
              Contact Us
            </Button>
          </>
        }
      />

      <BranchLocationModal 
        isOpen={isBranchModalOpen}
        onClose={() => setIsBranchModalOpen(false)}
      />

      <ConversionQuoteModal 
        isOpen={isConversionQuoteModalOpen}
        onClose={() => setIsConversionQuoteModalOpen(false)}
        conversionType={selectedConversionType}
      />
    </div>
  )
}

export default ConversionsPage
