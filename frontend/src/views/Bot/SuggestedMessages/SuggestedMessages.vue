<template>
  <div class="suggested-messages">
    <div
      v-for="message in suggestedMessages"
      :key="message"
      class="message"
      @click="$emit('sendMessage', message)"
    >
      {{ message }}
    </div>
  </div>
</template>

<script lang="ts">
import useSuggestedMessages from './SuggestedMessages'

export default {
  setup() {
    return useSuggestedMessages()
  }
}
</script>

<style lang="scss" scoped>
@import 'SuggestedMessages';
</style>
