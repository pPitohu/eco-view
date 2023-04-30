import { defineStore } from 'pinia'
import { ref } from 'vue'
import actions from './actions'
import type { Message, SuggestedMessage } from './types'

const botStore = () => {
  const defaultAuthor = 'eco-view'
  const messages = ref<Message[]>([])
  const suggestedMessages = ref<SuggestedMessage[]>([])

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
