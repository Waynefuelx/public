import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import Card from '../atoms/Card'

interface BranchCardProps {
  name: string
  city: string
  province: string
  phone: string
  email: string
  hours: string
}

const BranchCard = ({
  name,
  city,
  province,
  phone,
  email,
  hours,
}: BranchCardProps) => {
  return (
    <Card className="hover:border-primary-300 transition-colors duration-200">
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <MapPin className="w-6 h-6 text-primary-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {name}
            </h3>
            <p className="text-gray-600 mb-3">
              {city}, {province}
            </p>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary-600" />
                <a
                  href={`tel:${phone}`}
                  className="text-primary-600 hover:text-primary-800 transition-colors"
                >
                  {phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary-600" />
                <a
                  href={`mailto:${email}`}
                  className="text-primary-600 hover:text-primary-800 transition-colors"
                  title={`Click to email ${email}`}
                >
                  {email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary-600" />
                <span className="text-gray-600">{hours}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default BranchCard

