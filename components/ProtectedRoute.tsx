'use client'

import { useAuth } from '@/contexts/AuthContext'
import { UserType } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedTypes?: UserType[]
  redirectTo?: string
}

export default function ProtectedRoute({ 
  children, 
  allowedTypes, 
  redirectTo = '/login' 
}: ProtectedRouteProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push(redirectTo)
        return
      }

      if (allowedTypes && !allowedTypes.includes(user.type)) {
        // Redirect to appropriate dashboard based on user type
        switch (user.type) {
          case 'customer':
            router.push('/customer')
            break
          case 'driver':
            router.push('/driver')
            break
          case 'admin':
            router.push('/admin')
            break
          default:
            router.push('/login')
        }
        return
      }
    }
  }, [user, isLoading, allowedTypes, redirectTo, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  if (!user || (allowedTypes && !allowedTypes.includes(user.type))) {
    return null
  }

  return <>{children}</>
}
