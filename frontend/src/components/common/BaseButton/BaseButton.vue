<template>
  <div class="button-wrapper">
    <button
      v-wave
      class="button"
      :class="{
        'appended-icon': $slots.appendIcon,
      }"
      :type="type"
      :disabled="disabled"
    >
      <span class="button-text">
        <slot />
      </span>
      <div class="append-icon">
        <slot name="appendIcon" />
      </div>
    </button>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    type: {
      type: String,
      required: false,
      default: 'button',
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  }
}
</script>

<style lang="scss" scoped>
@import 'BaseButton';
</style>
