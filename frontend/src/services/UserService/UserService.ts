import { instance } from '@/utils/axios/instance'
import type { UserData, UserLoginData } from './types'

export const UserService = {
  register: async (userData: UserData) => {
    try {
      const response = await instance.post('/auth/register', userData)
      return response
    } catch (error) {
      return error.response
    }
  },
  login: async (userLoginData: UserLoginData) => {
    try {
      const response = await instance.post('/auth/login', userLoginData)
      return response
    } catch (error) {
      return error.response
    }
  }
}
