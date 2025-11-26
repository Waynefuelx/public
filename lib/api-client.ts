const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:7002'

// Token storage keys
const ACCESS_TOKEN_KEY = 'valley_access_token'
const REFRESH_TOKEN_KEY = 'valley_refresh_token'
const TOKEN_EXPIRY_KEY = 'valley_token_expiry'

// Helper function to get auth token from localStorage
export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null
  
  const token = localStorage.getItem(ACCESS_TOKEN_KEY)
  if (!token) return null
  
  // Check if token is expired
  const expiry = localStorage.getItem(TOKEN_EXPIRY_KEY)
  if (expiry) {
    const expiryTime = parseInt(expiry, 10)
    if (Date.now() >= expiryTime) {
      // Token expired, clear it
      clearAuthTokens()
      return null
    }
  }
  
  return token
}

// Helper function to store auth tokens
export function setAuthTokens(accessToken: string, refreshToken: string, expiresIn: number | string) {
  if (typeof window === 'undefined') return
  
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
  
  // Calculate expiry time (expiresIn is in seconds)
  const expiresInSeconds = typeof expiresIn === 'string' ? parseInt(expiresIn, 10) : expiresIn
  const expiryTime = Date.now() + (expiresInSeconds * 1000)
  localStorage.setItem(TOKEN_EXPIRY_KEY, expiryTime.toString())
}

// Helper function to clear auth tokens
export function clearAuthTokens() {
  if (typeof window === 'undefined') return
  
  localStorage.removeItem(ACCESS_TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)
  localStorage.removeItem(TOKEN_EXPIRY_KEY)
}

// Helper function to get refresh token
export function getRefreshToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(REFRESH_TOKEN_KEY)
}

// Helper function to handle API responses
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: response.statusText }))
    throw new Error(error.message || `API Error: ${response.status}`)
  }
  
  // Handle empty responses
  const contentType = response.headers.get('content-type')
  if (!contentType || !contentType.includes('application/json')) {
    return {} as T
  }
  
  return response.json()
}

// API Client class
export class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    retry = true
  ): Promise<T> {
    const token = getAuthToken()
    const url = `${this.baseUrl}${endpoint}`
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    }
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    const config: RequestInit = {
      ...options,
      headers,
      // Allow self-signed certificates in development
      ...(process.env.NODE_ENV === 'development' && {
        // @ts-ignore - for development only
        rejectUnauthorized: false,
      }),
    }

    try {
      const response = await fetch(url, config)
      
      // Handle 401 Unauthorized - try to refresh token
      if (response.status === 401 && retry) {
        const refreshToken = getRefreshToken()
        if (refreshToken) {
          try {
            // Try to refresh the token
            const refreshResponse = await fetch(`${this.baseUrl}/auth/refresh`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ refreshToken }),
            })
            
            if (refreshResponse.ok) {
              const tokenData = await refreshResponse.json()
              setAuthTokens(
                tokenData.accessToken,
                tokenData.refreshToken,
                tokenData.expiresIn
              )
              
              // Retry the original request with new token
              const newToken = getAuthToken()
              if (newToken) {
                const newHeaders: Record<string, string> = {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${newToken}`,
                  ...(options.headers as Record<string, string>),
                }
                
                // Preserve original request body for POST/PUT/PATCH
                const retryConfig: RequestInit = {
                  method: options.method,
                  headers: newHeaders,
                  body: options.body, // Preserve original body
                }
                
                const retryResponse = await fetch(url, retryConfig)
                return handleResponse<T>(retryResponse)
              }
            }
          } catch (error) {
            // Refresh failed, clear tokens
            clearAuthTokens()
            // Trigger logout event
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent('auth:logout'))
            }
          }
        }
        
        // No refresh token or refresh failed
        clearAuthTokens()
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('auth:logout'))
        }
      }
      
      return handleResponse<T>(response)
    } catch (error) {
      console.error(`API Error [${endpoint}]:`, error)
      throw error
    }
  }

  async get<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'GET' })
  }

  async post<T>(endpoint: string, data?: any, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async put<T>(endpoint: string, data?: any, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async patch<T>(endpoint: string, data?: any, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async delete<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' })
  }
}

export const apiClient = new ApiClient()

