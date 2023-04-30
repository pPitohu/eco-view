import { storeToRefs } from 'pinia'
import { useBotStore } from '@/stores/BotStore'

const useSuggestedMessages = () => {
  const botStore = useBotStore()
  const { suggestedMessages } = storeToRefs(botStore)

  return {
    suggestedMessages
  }
}

export default useSuggestedMessages
