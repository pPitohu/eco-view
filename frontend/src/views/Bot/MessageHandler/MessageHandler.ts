import { ref } from 'vue'

const useMessageHandler = () => {
  const currentMessage = ref<string>()

  return {
    currentMessage
  }
}

export default useMessageHandler
