import type { Message } from '@/stores/BotStore/types'
import { instance } from '@/utils/axios/instance'

export const BotService = {
  loadInitialMessages: async () => {
    try {
      const response = await instance.get('/bot/messages/initial')
      return response
    } catch (error) {
      return error.response
    }
  },
  sendMessage: async (userMessage: Message) => {
    try {
      const response = await instance.post('/bot/messages', { userMessage })
      return response
    } catch (error) {
      return error.response
    }
  }
}
