import { computed, ref } from 'vue'

const useMessageHandler = ({ emit }) => {
  const currentMessage = ref<string>('')

  const isMessageEmpty = computed(() => currentMessage.value?.trim() === '')

  const handleSendClick = () => {
    if (isMessageEmpty.value) return
    emit('sendMessage', currentMessage.value)
    currentMessage.value = ''
  }

  return {
    currentMessage,
    handleSendClick,
    isMessageEmpty
  }
}

export default useMessageHandler
