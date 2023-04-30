<template>
  <div
    class="button-wrapper"
    :class="{
      'icon': icon,
      'circle': circle,
      'large': large,
      'loading': isLoading,
      [variant]: true
    }"
  >
    <button
      v-wave="!disabled || isLoading"
      class="button"
      :class="{
        'appended-icon': $slots.appendIcon,
      }"
      :type="type"
      :disabled="disabled || isLoading"
    >
      <span class="button-text">
        <slot />
      </span>
      <div class="append-icon">
        <slot name="appendIcon" />
      </div>
      <img
        v-if="isLoading"
        class="loading-icon"
        src="@/assets/icons/loader.svg"
        alt="loading"
      >
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
    },
    circle: {
      type: Boolean,
      required: false,
      default: false
    },
    icon: {
      type: Boolean,
      required: false,
      default: false
    },
    isLoading: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'BaseButton';
</style>
