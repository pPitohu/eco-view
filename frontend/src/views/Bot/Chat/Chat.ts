import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import accountPlugImage from '@/assets/images/account-plug.svg'
import { useBotStore } from '@/stores/BotStore'
import type { Message } from '@/stores/BotStore/types'
import { useUserStore } from '@/stores/UserStore'

const useChat = () => {
  const chatRef = ref()

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

  botStore.$subscribe((mutation, state) => {
    if (mutation.type !== 'direct') return
    if (chatRef.value.scrollHeight < chatRef.value.height) return
    console.log(mutation, state)
    setTimeout(() => {
      chatRef.value.scrollTo({ top: chatRef.value.scrollHeight, behavior: 'smooth' })
    }, 200)
  })

  return {
    messages,
    isMyMessage,
    user,
    accountPlugImage,
    isMessageFromTheSameAuthor,
    chatRef
  }
}

export default useChat
