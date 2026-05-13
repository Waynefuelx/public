import { LucideIcon, CheckCircle, ArrowRight } from 'lucide-react'
import Card from '../atoms/Card'
import Badge from '../atoms/Badge'

interface ConversionCardProps {
  id: number
  name: string
  description: string
  features: string[]
  image: string
  icon: LucideIcon
  popular?: boolean
}

const ConversionCard = ({
  name,
  description,
  features,
  image,
  icon: Icon,
  popular = false,
}: ConversionCardProps) => {
  return (
    <Card className="overflow-hidden group" hover>
      {/* Conversion Image */}
      <div className="w-full h-48 bg-gray-200 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-contain scale-110 group-hover:scale-115 transition-transform duration-300"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
            const nextSibling = e.currentTarget.nextElementSibling
            if (nextSibling) {
              ;(nextSibling as HTMLElement).style.display = 'flex'
            }
          }}
        />
        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
          <Icon className="w-16 h-16 text-gray-400" />
        </div>
      </div>

      {/* Conversion Header */}
      <div className="p-6 sm:p-8">
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-200 transition-colors duration-200">
            <Icon className="w-6 h-6 text-primary-600" />
          </div>
          {popular && (
            <Badge variant="primary">Popular</Badge>
          )}
        </div>

        {/* Conversion Info */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {name}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {description}
          </p>
        </div>

        {/* Features */}
        <div className="space-y-2 mb-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
              <span className="text-sm text-gray-700">{feature}</span>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <a
          href="mailto:info@valleycontainers.co.za?subject=Container Services Quote Request&body=Hi, I would like to request a quote for container services. Please contact me with more information about your services and pricing."
          className="bg-primary-500 hover:bg-primary-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 w-full text-center inline-flex items-center justify-center group"
        >
          Get Quote
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
        </a>
      </div>
    </Card>
  )
}

export default ConversionCard

