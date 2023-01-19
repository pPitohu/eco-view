import { UserService } from '@/services/UserService'
import type { UserData, UserLoginData } from '@/services/UserService/types'
import { handleResponse } from '@/utils/axios/handleResponse'
import { setUserByToken } from './helpers'

const actions = {
  register: async (userData: UserData) => {
    const response = await UserService.register(userData)
    
    const handleSuccessStatus = async ({ token }: { token: string }) => {
      setUserByToken(token)
    }
    
    handleResponse({
      handleSuccessStatus,
      response,
      successStatus: 201
    })

    return { error: response.status !== 201 }
  },
  login: async (userLoginData: UserLoginData) => {
    const response = await UserService.login(userLoginData)
    
    const handleSuccessStatus = ({ token }: { token: string }) => {
      setUserByToken(token)
    }

    handleResponse({
      handleSuccessStatus,
      response,
      successStatus: 200
    })

    return { error: response.status !== 200 }
  },
  getCurrentUser: async () => {
    const response = await UserService.getCurrentUser()
    
    const handleSuccessStatus = ({ token }: { token: string }) => {
      setUserByToken(token)
    }

    handleResponse({
      handleSuccessStatus,
      response,
      successStatus: 200
    })
  }
}

export default actions
