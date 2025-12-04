import { ReactNode } from 'react'

interface CTASectionProps {
  title: string
  description: string
  actions: ReactNode
  className?: string
}

const CTASection = ({
  title,
  description,
  actions,
  className = '',
}: CTASectionProps) => {
  return (
    <section className={`py-16 sm:py-20 bg-primary-500 text-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
          {title}
        </h2>
        <p className="text-lg sm:text-xl text-primary-50 mb-6 sm:mb-8 max-w-2xl mx-auto">
          {description}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          {actions}
        </div>
      </div>
    </section>
  )
}

export default CTASection

