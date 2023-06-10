import { defineStore } from 'pinia'
import { ref } from 'vue'
import actions from './actions'
import type { Message } from './types'

const botStore = () => {
  const defaultAuthor = 'eco-view'
  const messages = ref<Message[]>([])
  const suggestedMessages = ref<string[]>([])

  return {
    messages,
    suggestedMessages,
    defaultAuthor,
    ...actions
  }
}

export const useBotStore = defineStore(
  'BotStore',
  botStore
)
