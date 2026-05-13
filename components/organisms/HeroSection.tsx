import { ReactNode } from 'react'

interface HeroSectionProps {
  title: string
  subtitle?: string
  description: string
  actions?: ReactNode
  className?: string
}

const HeroSection = ({
  title,
  subtitle,
  description,
  actions,
  className = '',
}: HeroSectionProps) => {
  return (
    <section className={`relative bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 text-white overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-32">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            {title}
            {subtitle && (
              <span className="block text-primary-100">{subtitle}</span>
            )}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-primary-50 mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
            {description}
          </p>
          {actions && (
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              {actions}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default HeroSection

