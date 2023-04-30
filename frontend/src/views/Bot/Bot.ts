import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import { useBotStore } from '@/stores/BotStore'

const useBot = () => {
  const botStore = useBotStore()
  const { messages } = storeToRefs(botStore)
  const { loadInitialMessages } = botStore

  const isInitialMessagesLoaded = ref(false)
  const isMessageSending = ref(false)
  
  const sendMessage = (message: string) => {
    isMessageSending.value = true
    console.log(message)
    setTimeout(() => {
      isMessageSending.value = false
    }, 1000)
  }

  onMounted(async () => {
    await loadInitialMessages()
    isInitialMessagesLoaded.value = true
  })
  
  return {
    sendMessage,
    isInitialMessagesLoaded,
    isMessageSending
  }
}

export default useBot
