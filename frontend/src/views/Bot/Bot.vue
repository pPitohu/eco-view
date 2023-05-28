<template>
  <div class="bot">
    <Chat />
    <MessageHandler
      :disabled="!isInitialMessagesLoaded || !isAuthorized"
      :is-loading="isMessageSending"
      @sendMessage="sendMessage($event)"
    />
    <SuggestedMessages />
  </div>
</template>

<script lang="ts">
import useBot from './Bot'
import Chat from './Chat/Chat.vue'
import MessageHandler from './MessageHandler/MessageHandler.vue'
import SuggestedMessages from './SuggestedMessages/SuggestedMessages.vue'

export default {
  components: {
    Chat,
    MessageHandler,
    SuggestedMessages
  },
  setup() {
    return useBot()
  }
}
</script>

<style lang="scss" scoped>
@import 'Bot';
</style>
