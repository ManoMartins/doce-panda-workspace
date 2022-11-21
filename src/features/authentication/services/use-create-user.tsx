import { useMutation } from '@tanstack/react-query'
import api from '@services/api'

interface CreateUserRequest {
  name: string
  email: string
  gender: string
  password: string
  phoneNumber: string
  documentNumber: string
}

async function createUser(data: CreateUserRequest) {
  await api.post('/users', data)
}

export function useCreateUser() {
  return useMutation(createUser)
}
