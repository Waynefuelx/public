import { ReactNode } from 'react'

interface SectionProps {
  title?: string
  description?: string
  children: ReactNode
  className?: string
  bgColor?: 'white' | 'gray'
  centered?: boolean
}

const Section = ({
  title,
  description,
  children,
  className = '',
  bgColor = 'white',
  centered = false,
}: SectionProps) => {
  const bgStyles = bgColor === 'gray' ? 'bg-gray-50' : 'bg-white'
  const containerStyles = centered ? 'max-w-4xl mx-auto' : 'max-w-7xl mx-auto'
  
  return (
    <section className={`py-16 sm:py-20 ${bgStyles} ${className}`}>
      <div className={`${containerStyles} px-4 sm:px-6 lg:px-8`}>
        {(title || description) && (
          <div className={`text-center mb-12 sm:mb-16 ${centered ? '' : ''}`}>
            {title && (
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                {description}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}

export default Section

