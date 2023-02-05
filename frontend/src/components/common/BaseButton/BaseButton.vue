<template>
  <div
    class="button-wrapper"
    :class="{
      'large': large,
      [variant]: true
    }"
  >
    <button
      v-wave="!disabled"
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
import type { ButtonHTMLAttributes } from 'vue'

export default {
  props: {
    type: {
      type: String as () => ButtonHTMLAttributes['type'],
      required: false,
      default: 'button'
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    large: {
      type: Boolean,
      required: false,
      default: false,
    },
    variant: {
      type: String,
      required: false,
      default: 'primary'
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'BaseButton';
</style>
