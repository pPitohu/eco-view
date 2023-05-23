import { useUserStore } from '.'
import { TYPE } from 'vue-toastification'
import { fireToast } from '@/plugins/toast'
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
    const userStore = useUserStore()
    userStore.isProfileLoading = true

    const response = await UserService.getCurrentUser()
    
    const handleSuccessStatus = ({ token }: { token: string }) => {
      setUserByToken(token)
    }

    handleResponse({
      handleSuccessStatus,
      response,
      successStatus: 200
    })

    userStore.isProfileLoading = false
  },

  updateImage: async (image: File) => {
    const userStore = useUserStore()
    const response = await UserService.updateImage(image)
    
    const handleSuccessStatus = ({ imageLink }: { imageLink: string }) => {
      userStore.user.image.imageLink = imageLink
      fireToast(TYPE.SUCCESS, 'Аватар успешно изменен!')
    }

    handleResponse({
      handleSuccessStatus,
      response,
      successStatus: 200
    })
  },

  updateCredentials: async (userData: {
    username?: string,
    email?: string,
    password?: string
  }) => {
    const response = await UserService.updateCredentials(userData)
    
    const handleSuccessStatus = ({ token }: { token: string }) => {
      setUserByToken(token)
      fireToast(TYPE.SUCCESS, 'Данные успешно изменены!')
    }

    handleResponse({
      handleSuccessStatus,
      response,
      successStatus: 200
    })
  },
  
  sendResetMessage: async (email: string) => {
    const userStore = useUserStore()
    const response = await UserService.sendResetMessage(email)
    
    const handleSuccessStatus = ({ resetCode }: { resetCode: string }) => {
      userStore.resetCode = resetCode
    }

    handleResponse({
      handleSuccessStatus,
      response,
      successStatus: 200
    })
  },

  resetPassword: async (passwordData: { email: string, password: string }) => {
    const response = await UserService.resetPassword(passwordData)

    handleResponse({
      response,
      successStatus: 200
    })
  }
}

export default actions
