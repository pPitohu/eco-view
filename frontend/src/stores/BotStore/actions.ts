import { useBotStore } from '.'
import { BotService } from '@/services/BotService'
import { handleResponse } from '@/utils/axios/handleResponse'
import type { Message } from './types'

const actions = {
  loadInitialMessages: async () => {
    const botStore = useBotStore()
    const response = await BotService.loadInitialMessages()

    const handleSuccessStatus = (messages: Message[]) => {
      botStore.messages = messages
    }

    handleResponse({
      handleSuccessStatus,
      response,
      successStatus: 200
    })
  },
  sendMessage: async (userMessage: Message) => {
    const botStore = useBotStore()
    const response = await BotService.sendMessage(userMessage)

    const handleSuccessStatus = (message: Message) => {
      botStore.messages.push(message)
    }

    handleResponse({
      handleSuccessStatus,
      response,
      successStatus: 200
    })
  },
}

export default actions
