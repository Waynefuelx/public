import { Check, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Card from '../atoms/Card'
import Badge from '../atoms/Badge'

interface PricingCardProps {
  name: string
  price: string
  description: string
  features: string[]
  popular?: boolean
  href: string
}

const PricingCard = ({
  name,
  price,
  description,
  features,
  popular = false,
  href,
}: PricingCardProps) => {
  return (
    <Card
      className={`overflow-hidden ${
        popular ? 'border-primary-500 ring-2 ring-primary-200' : ''
      }`}
      hover
    >
      {popular && (
        <div className="bg-primary-500 text-white text-center py-2 text-sm font-medium">
          Best Value
        </div>
      )}
      
      <div className="p-6 sm:p-8">
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {name}
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            {description}
          </p>
          <div className="mb-4">
            <span className="text-3xl font-bold text-primary-600">
              {price}
            </span>
          </div>
        </div>

        <ul className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>

        <Link
          href={href}
          className="w-full bg-primary-500 hover:bg-primary-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 text-center inline-flex items-center justify-center group"
        >
          Buy Now
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
        </Link>
      </div>
    </Card>
  )
}

export default PricingCard

