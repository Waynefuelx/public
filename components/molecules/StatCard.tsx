import Card from '../atoms/Card'

interface StatCardProps {
  label: string
  value: string
  change: string
  changeType: 'positive' | 'negative'
}

const StatCard = ({ label, value, change, changeType }: StatCardProps) => {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`text-sm font-medium ${
          changeType === 'positive' ? 'text-green-600' : 'text-red-600'
        }`}>
          {change}
        </div>
      </div>
    </Card>
  )
}

export default StatCard
