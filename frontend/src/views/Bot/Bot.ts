import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import { useBotStore } from '@/stores/BotStore'
import { useUserStore } from '@/stores/UserStore'

const useBot = () => {
  const userStore = useUserStore()
  const botStore = useBotStore()
  const { messages } = storeToRefs(botStore)
  const { isAuthorized, user } = storeToRefs(userStore)
  const { loadInitialMessages } = botStore

  const isInitialMessagesLoaded = ref(false)
  const isMessageSending = ref(false)
  
  const sendMessage = async (text: string) => {
    isMessageSending.value = true

    const message = {
      text: text.trim(),
      author: user.value.username!,
      datetime: new Date().toLocaleString('ru-RU')
    }

    messages.value.push(message)

    setTimeout(async () => {
      await botStore.sendMessage(message)
    }, 300)
    
    isMessageSending.value = false
  }

  onMounted(async () => {
    await loadInitialMessages()
    isInitialMessagesLoaded.value = true
  })
  
  return {
    sendMessage,
    isInitialMessagesLoaded,
    isMessageSending,
    isAuthorized,
  }
}

export default useBot
