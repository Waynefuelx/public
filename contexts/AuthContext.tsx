'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type UserType = 'customer' | 'driver' | 'admin'

export interface User {
  id: string
  email: string
  name: string
  type: UserType
  phone?: string
  company?: string
  driverId?: string
  isActive?: boolean
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Demo credentials for each user type
const DEMO_USERS = [
  {
    id: '1',
    email: 'customer@valley.com',
    password: 'customer123',
    name: 'John Smith',
    type: 'customer' as UserType,
    phone: '+27 82 123 4567',
    company: 'Smith Construction'
  },
  {
    id: '2',
    email: 'driver@valley.com',
    password: 'driver123',
    name: 'Mike Johnson',
    type: 'driver' as UserType,
    phone: '+27 82 555 1234',
    driverId: 'DRV001'
  },
  {
    id: '3',
    email: 'admin@valley.com',
    password: 'admin123',
    name: 'Sarah Wilson',
    type: 'admin' as UserType,
    phone: '+27 82 999 8888'
  }
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored user session
    try {
      const storedUser = localStorage.getItem('valley_user')
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser))
        } catch (error) {
          console.error('Error parsing stored user:', error)
          localStorage.removeItem('valley_user')
        }
      }
    } catch (error) {
      console.error('Error accessing localStorage:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const foundUser = DEMO_USERS.find(u => u.email === email && u.password === password)
    
    if (foundUser) {
      const userData: User = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
        type: foundUser.type,
        phone: foundUser.phone,
        company: foundUser.company,
        driverId: foundUser.driverId,
        isActive: true
      }
      
      setUser(userData)
      try {
        localStorage.setItem('valley_user', JSON.stringify(userData))
      } catch (error) {
        console.error('Error saving user to localStorage:', error)
      }
      setIsLoading(false)
      return true
    }
    
    setIsLoading(false)
    return false
  }

  const logout = () => {
    setUser(null)
    try {
      localStorage.removeItem('valley_user')
    } catch (error) {
      console.error('Error removing user from localStorage:', error)
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
