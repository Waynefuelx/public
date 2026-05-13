import { LucideIcon } from 'lucide-react'
import Card from '../atoms/Card'

interface ServiceCardProps {
  name: string
  price: string
  description: string
  icon: LucideIcon
}

const ServiceCard = ({ name, price, description, icon: Icon }: ServiceCardProps) => {
  return (
    <Card className="bg-gray-50 hover:bg-gray-100 transition-colors duration-200 text-center">
      <div className="p-6">
        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon className="w-8 h-8 text-primary-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {name}
        </h3>
        <div className="text-2xl font-bold text-primary-600 mb-2">
          {price}
        </div>
        <p className="text-gray-600 text-sm">
          {description}
        </p>
      </div>
    </Card>
  )
}

export default ServiceCard

