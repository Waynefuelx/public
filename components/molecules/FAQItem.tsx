import Card from '../atoms/Card'

interface FAQItemProps {
  question: string
  answer: string
}

const FAQItem = ({ question, answer }: FAQItemProps) => {
  return (
    <Card>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {question}
        </h3>
        <p className="text-gray-600">
          {answer}
        </p>
      </div>
    </Card>
  )
}

export default FAQItem

