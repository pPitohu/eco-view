import { instance } from '@/utils/axios/instance'
import type { UserData, UserLoginData } from './types'

export const UserService = {
  register: async (userData: UserData) => {
    try {
      const response = await instance.post('/user/register', userData)
      return response
    } catch (error) {
      return error.response
    }
  },
  login: async (userLoginData: UserLoginData) => {
    try {
      const response = await instance.post('/user/login', userLoginData)
      return response
    } catch (error) {
      return error.response
    }
  },
  getCurrentUser: async () => {
    try {
      const response = await instance.get('/user/me')
      return response
    } catch (error) {
      return error.response
    }
  }
}
