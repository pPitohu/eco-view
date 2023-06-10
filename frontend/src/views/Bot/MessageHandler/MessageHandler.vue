<template>
  <div class="message-handler">
    <input
      ref="input"
      v-model="currentMessage"
      autofocus
      class="message-handler__textarea"
      placeholder="Сообщение..."
      :disabled="disabled || isLoading"
      @keydown.enter.exact.prevent.stop="handleSendClick"
    >
    <BaseButton
      class="message-handler__send-button"
      circle
      icon
      :is-loading="isLoading"
      :disabled="disabled || isMessageEmpty"
      v-on="disabled ? {} : { click: handleSendClick }"
    >
      <template #appendIcon>
        <img
          class="send-icon"
          src="@/assets/icons/send-icon.svg"
          alt="send"
        >
      </template>
    </BaseButton>
  </div>
</template>

<script lang="ts">
import BaseButton from '@/components/common/BaseButton/BaseButton.vue'
import useMessageHandler from './MessageHandler'

export default {
  components: {
    BaseButton
  },
  props: {
    disabled: {
      type: Boolean,
      required: true
    },
    isLoading: {
      type: Boolean,
      required: true
    }
  },
  setup(_, context) {
    return useMessageHandler(context)
  }
}
</script>

<style lang="scss" scoped>
@import 'MessageHandler';
</style>
