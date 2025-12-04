import Section from './Section'
import FAQItem from '../molecules/FAQItem'

interface FAQ {
  question: string
  answer: string
}

interface FAQSectionProps {
  title: string
  description?: string
  faqs: FAQ[]
  className?: string
}

const FAQSection = ({
  title,
  description,
  faqs,
  className = '',
}: FAQSectionProps) => {
  return (
    <Section
      title={title}
      description={description}
      bgColor="gray"
      centered
      className={className}
    >
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            question={faq.question}
            answer={faq.answer}
          />
        ))}
      </div>
    </Section>
  )
}

export default FAQSection

