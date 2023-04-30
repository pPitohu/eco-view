<template>
  <div>{{ suggestedMessages }}</div>
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
