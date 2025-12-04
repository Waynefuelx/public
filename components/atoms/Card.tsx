import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  onClick?: () => void
}

const Card = ({ children, className = '', hover = false, onClick }: CardProps) => {
  const baseStyles = 'bg-white rounded-xl shadow-soft border border-gray-200 p-6'
  const hoverStyles = hover ? 'hover:shadow-lg transition-all duration-300 cursor-pointer' : ''
  const clickStyles = onClick ? 'cursor-pointer' : ''
  
  return (
    <div
      onClick={onClick}
      className={`${baseStyles} ${hoverStyles} ${clickStyles} ${className}`}
    >
      {children}
    </div>
  )
}

export default Card

