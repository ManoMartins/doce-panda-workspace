import { useMutation } from '@tanstack/react-query'
import api from '@services/api'

export interface InputSignIn {
  email: string
  password: string
}

interface SignInResponse {
  token: string
  user: {
    id: string
    name: string
  }
}

export async function signInUser(data: InputSignIn): Promise<SignInResponse> {
  const response = await api.post('/login', data)

  return response.data.data
}

export function useSignInUser() {
  return useMutation(signInUser)
}
