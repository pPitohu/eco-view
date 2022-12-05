import type { UserData } from '@/services/UserService/types'
import { UserService } from '@/services/UserService/UserService'
import { handleResponse } from '@/utils/axios/handleResponse'
import { useUserStore } from './UserStore'

const actions = {
  register: async (userData: UserData) => {
    const response = await UserService.register(userData)
    
    const handleSuccessStatus = (data: any) => {
      const userStore = useUserStore()
      console.log(userStore.$state, data)
    }
    
    handleResponse({
      handleSuccessStatus,
      response,
      successStatus: 201
    })
  }
}

export default actions
