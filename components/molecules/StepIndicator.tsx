import { CheckCircle } from 'lucide-react'

interface StepIndicatorProps {
  currentStep: number
  totalSteps: number
}

const StepIndicator = ({ currentStep, totalSteps }: StepIndicatorProps) => {
  return (
    <div className="flex items-center justify-center mb-6 sm:mb-8 overflow-x-auto">
      {Array.from({ length: totalSteps }, (_, index) => {
        const step = index + 1
        const isCompleted = step < currentStep
        const isCurrent = step === currentStep
        
        return (
          <div key={step} className="flex items-center flex-shrink-0">
            <div
              className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium ${
                isCompleted || isCurrent
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {isCompleted ? (
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                step
              )}
            </div>
            {step < totalSteps && (
              <div
                className={`w-8 sm:w-16 h-0.5 mx-1 sm:mx-2 ${
                  isCompleted ? 'bg-primary-600' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

export default StepIndicator

