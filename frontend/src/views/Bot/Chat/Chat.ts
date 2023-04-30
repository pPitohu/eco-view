import { storeToRefs } from 'pinia'
import accountPlugImage from '@/assets/images/account-plug.svg'
import { useBotStore } from '@/stores/BotStore'
import type { Message } from '@/stores/BotStore/types'
import { useUserStore } from '@/stores/UserStore'

const useChat = () => {
  const userStore = useUserStore()
  const { user } = storeToRefs(userStore)

  const botStore = useBotStore()
  const { messages } = storeToRefs(botStore)
  const { defaultAuthor } = botStore

  const isMyMessage = (message: Message) => {
    return message.author !== defaultAuthor
  }
  
  const isMessageFromTheSameAuthor = (author: Message['author'], index: number) => {
    return messages.value[index]?.author === author
  }

  return {
    messages,
    isMyMessage,
    user,
    accountPlugImage,
    isMessageFromTheSameAuthor
  }
}

export default useChat
