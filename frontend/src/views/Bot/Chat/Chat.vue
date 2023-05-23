<template>
  <div
    v-auto-animate="{ duration: 150 }"
    class="chat"
  >
    <div
      v-for="(message, index) in messages"
      :key="index"
      class="message"
      :class="{ 'my-message': isMyMessage(message) }"
    >
      <img
        class="message-image"
        :class="{ 'message-image_hidden': isMessageFromTheSameAuthor(message.author, index - 1) }"
        :src="isMyMessage(message)
          ? user.image.imageLink
          : accountPlugImage"
        alt="author"
      >
      <p class="message-text">
        {{ message.text }}
        <span class="message-text__datetime">{{ message.datetime }}</span>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import useChat from './Chat'

export default {
  setup() {
    return useChat()
  }
}
</script>

<style lang="scss" scoped>
@import 'Chat';
</style>
