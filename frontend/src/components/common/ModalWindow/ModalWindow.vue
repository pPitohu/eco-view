<template>
  <Teleport to="#app">
    <Transition>
      <div
        v-if="isOpen"
        class="modal"
      >
        <div class="modal__overlay" />
        <div
          v-click-outside="() => $emit('close')"
          class="modal__content"
        >
          <div class="modal__header">
            <button
              class="modal__close"
              @click="$emit('close')"
            >
              <img
                src="@/assets/icons/close.svg"
                alt="close"
              >
            </button>
          </div>
          <div class="modal__body">
            <slot />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script lang="ts">
import { watch } from 'vue'

export default {
  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    watch(() => props.isOpen, isOpen => {
      if (isOpen) document.body.style.overflow = 'hidden'
      else document.body.style.overflow = 'auto'
    })
  }
}
</script>

<style lang="scss" scoped>
@import 'ModalWindow';
</style>
