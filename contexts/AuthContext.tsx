'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { authApi, CurrentUserProfile } from '@/lib/api/services'
import { setAuthTokens, clearAuthTokens, getAuthToken } from '@/lib/api-client'

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
  register: (data: { email: string; password: string; confirmPassword: string; firstName?: string; lastName?: string; phone?: string }) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Offline demo accounts — used as a fallback when the backend API is unreachable, so
// the app is fully demoable without a backend. These match the credentials shown on the
// login page. When the backend IS available, the real API auth path is used instead.
const DEMO_SESSION_KEY = 'topshell_demo_session'

const DEMO_USERS: Array<User & { password: string }> = [
  { id: 'demo-customer', email: 'customer@valley.com', password: 'P@ssword1', name: 'John Smith', type: 'customer', phone: '+27 82 123 4567', company: 'Smith Construction', isActive: true },
  { id: 'demo-driver', email: 'driver@valley.com', password: 'P@ssword1', name: 'Mike Johnson', type: 'driver', phone: '+27 82 555 1234', driverId: 'DRV001', isActive: true },
  { id: 'demo-admin', email: 'admin@valley.com', password: 'P@ssword1', name: 'Sarah Wilson', type: 'admin', phone: '+27 82 999 8888', isActive: true },
]

// A failed fetch (backend down / unreachable) surfaces as a TypeError ("Failed to fetch").
const isNetworkError = (error: any): boolean =>
  error instanceof TypeError || /failed to fetch|networkerror|load failed/i.test(error?.message || '')

// Helper function to fetch user info from unified endpoint
async function fetchUserInfo(): Promise<User | null> {
  const token = getAuthToken()
  if (!token) return null

  try {
    const profile: CurrentUserProfile = await authApi.getCurrentUser()
    const roles = (profile.roles || []).map((role) => role?.toLowerCase?.() ?? '')

    let userType: UserType = 'customer'
    if (roles.includes('admin')) {
      userType = 'admin'
    } else if (roles.includes('driver')) {
      userType = 'driver'
    } else if (roles.includes('customer')) {
      userType = 'customer'
    }

    return {
      id: String(profile.id ?? ''),
      email: profile.email || '',
      name: profile.name || 'User',
      type: userType,
      phone: profile.phoneNumber || undefined,
      company: profile.company || undefined,
      isActive: true,
    }
  } catch (error) {
    console.error('Error fetching user info:', error)
    return null
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load user from token on mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        // Restore an offline demo session (backend unavailable) without calling the API.
        const storedUser = localStorage.getItem('topshell_user')
        if (localStorage.getItem(DEMO_SESSION_KEY) === 'true' && storedUser) {
          setUser(JSON.parse(storedUser))
          return
        }

        const token = getAuthToken()
        if (token) {
          const userInfo = await fetchUserInfo()
          if (userInfo) {
            setUser(userInfo)
            // Store user info in localStorage for quick access
            try {
              localStorage.setItem('topshell_user', JSON.stringify(userInfo))
            } catch (error) {
              console.error('Error saving user to localStorage:', error)
            }
          } else {
            // Token exists but couldn't fetch user, clear tokens
            clearAuthTokens()
          }
        } else {
          // No token, clear any stale user data
          try {
            localStorage.removeItem('topshell_user')
          } catch (error) {
            console.error('Error removing user from localStorage:', error)
          }
        }
      } catch (error) {
        console.error('Error loading user:', error)
        clearAuthTokens()
      } finally {
        setIsLoading(false)
      }
    }

    loadUser()

    // Listen for logout events (from token refresh failures)
    const handleLogout = () => {
      setUser(null)
      try {
        localStorage.removeItem('topshell_user')
        localStorage.removeItem(DEMO_SESSION_KEY)
      } catch (error) {
        console.error('Error removing user from localStorage:', error)
      }
    }

    window.addEventListener('auth:logout', handleLogout)
    return () => {
      window.removeEventListener('auth:logout', handleLogout)
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    
    try {
      // Call login API
      const tokenResponse = await authApi.login(email, password)
      
      // Store tokens
      setAuthTokens(
        tokenResponse.accessToken,
        tokenResponse.refreshToken,
        tokenResponse.expiresIn
      )
      
      // Fetch user info
      const userInfo = await fetchUserInfo()
      
      if (userInfo) {
        setUser(userInfo)
        try {
          localStorage.setItem('topshell_user', JSON.stringify(userInfo))
        } catch (error) {
          console.error('Error saving user to localStorage:', error)
        }
        setIsLoading(false)
        return true
      } else {
        // Login succeeded but couldn't fetch user info
        clearAuthTokens()
        setIsLoading(false)
        return false
      }
    } catch (error: any) {
      console.error('Login error:', error)
      // Offline fallback: if the backend is unreachable, let the demo accounts sign in
      // client-side so the app is fully demoable without a backend running.
      if (isNetworkError(error)) {
        const demo = DEMO_USERS.find((u) => u.email === email && u.password === password)
        if (demo) {
          const { password: _password, ...userData } = demo
          setUser(userData)
          try {
            localStorage.setItem('topshell_user', JSON.stringify(userData))
            localStorage.setItem(DEMO_SESSION_KEY, 'true')
          } catch (e) {
            console.error('Error saving demo session:', e)
          }
          setIsLoading(false)
          return true
        }
      }
      clearAuthTokens()
      setIsLoading(false)
      return false
    }
  }

  const register = async (data: {
    email: string
    password: string
    confirmPassword: string
    firstName?: string
    lastName?: string
    phone?: string
  }): Promise<boolean> => {
    setIsLoading(true)
    
    try {
      await authApi.register(data)
      setIsLoading(false)
      return true
    } catch (error: any) {
      console.error('Registration error:', error)
      setIsLoading(false)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    clearAuthTokens()
    try {
      localStorage.removeItem('topshell_user')
      localStorage.removeItem(DEMO_SESSION_KEY)
    } catch (error) {
      console.error('Error removing user from localStorage:', error)
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, register }}>
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
