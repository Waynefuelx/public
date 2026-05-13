import { useMutation, useQueryClient } from '@tanstack/react-query'
import { authApi, AccessTokenResponse, RegisterRequest } from './services'
import { setAuthTokens, clearAuthTokens } from '../api-client'

// Auth Hooks
export const useLogin = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ email, password, useCookies }: { email: string; password: string; useCookies?: boolean }) =>
      authApi.login(email, password, useCookies),
    onSuccess: (data: AccessTokenResponse) => {
      // Store tokens
      setAuthTokens(data.accessToken, data.refreshToken, data.expiresIn)
      // Invalidate queries to refetch user data
      queryClient.invalidateQueries({ queryKey: ['auth', 'user'] })
    },
  })
}

export const useRegister = () => {
  return useMutation({
    mutationFn: (data: RegisterRequest) => authApi.register(data),
  })
}

export const useRefreshToken = () => {
  return useMutation({
    mutationFn: (refreshToken: string) => authApi.refresh(refreshToken),
    onSuccess: (data: AccessTokenResponse) => {
      setAuthTokens(data.accessToken, data.refreshToken, data.expiresIn)
    },
    onError: () => {
      clearAuthTokens()
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('auth:logout'))
      }
    },
  })
}

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (email: string) => authApi.forgotPassword(email),
  })
}

export const useResetPassword = () => {
  return useMutation({
    mutationFn: (data: any) => authApi.resetPassword(data),
  })
}

export const useConfirmEmail = () => {
  return useMutation({
    mutationFn: (token: string) => authApi.confirmEmail(token),
  })
}

export const useResendConfirmationEmail = () => {
  return useMutation({
    mutationFn: (email: string) => authApi.resendConfirmationEmail(email),
  })
}

