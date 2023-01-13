<template>
  <div
    class="loader-wrapper"
    :class="{
      'hidden': !isEnabled,
    }"
  >
    <div class="left-gradient" />
    <div class="left-gradient2" />
    <div class="left-gradient3" />

    <div class="right-gradient" />
    <div class="right-gradient2" />
    <div class="right-gradient3" />
    
    <LogoFilled class="logo" />
    <div class="spinner" />
  </div>
</template>

<script lang="ts">
import LogoFilled from '@/components/icons/LogoFilled.vue'
export default {
  components: {
    LogoFilled,
  },
  props: {
    isEnabled: {
      type: Boolean,
      required: false,
      default: true,
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'Loader';
</style>
