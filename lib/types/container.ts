export interface Container {
  id: string
  containerNumber: string
  containerType: string
  customerName: string
  customerEmail: string
  customerPhone: string
  location: {
    lat: number
    lng: number
    address: string
    city: string
    province: string
  }
  deliveryDate: string
  rentalDuration: number // in days
  paymentStatus: 'paid' | 'overdue' | 'pending'
  lastPaymentDate: string
  nextPaymentDate: string
  monthlyRate: number
  totalOwed: number
  notes?: string
}

