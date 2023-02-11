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
  },
  updateImage: async (image: File) => {
    try {
      const formData = new FormData()
      formData.append('image', image)
      const response = await instance.put('/user/image', formData, {
        headers: {
          'Content-type': 'multipart/form-data'
        }
      })
      return response
    } catch (error) {
      return error.response
    }
  },
  updateCredentials: async (userData: {
    username?: string,
    email?: string,
    password?: string
  }) => {
    try {
      const response = await instance.put('/user/credentials', userData)
      return response
    } catch (error) {
      return error.response
    }
  }
}
