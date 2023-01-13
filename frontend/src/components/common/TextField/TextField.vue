<template>
  <div
    class="text-field"
    :class="{
      [type]: true,
      'large': large
    }"
  >
    <label v-if="label">{{ label }}</label>
    <div
      class="text-field__input-wrapper"
      :class="{ 'error': errorMessage }"
    >
      <div class="prepend-icon">
        <slot
          name="prependIcon"
        />
      </div>     
      <Field
        class="text-field__input"
        :name="name"
        :value="value"
        :type="inputType"
        :rules="rules"
        :placeholder="placeholder"
        @input="$emit('input', $event)"
      />
      <div
        v-auto-animate="{ duration: 150 }"
        class="append-icon"
      >
        <slot
          name="appendIcon"
          :valid="meta.valid"
        />
        <PasswordEye
          v-if="isPasswordInput"
          :is-eye-opened="isPasswordVisible"
          @click="togglePasswordVisibility"
        />
      </div>
    </div>
    <Transition name="slide-from-top">
      <span
        v-if="errorMessage"
        class="text-field__error"
      >{{ errorMessage }}</span>
    </Transition>
  </div>
</template>

<script lang="ts">
import { Field } from 'vee-validate'
import PasswordEye from '@/components/icons/PasswordEye.vue'
import useTextField from './TextField'

export default {
  components: {
    Field,
    PasswordEye,
  },
  props: {
    large: {
      type: Boolean,
      required: false,
      default: false,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'text'
    },
    label: {
      type: String,
      required: false,
      default: '',
    },
    placeholder: {
      type: String,
      required: false,
      default: '',
    },
    rules: {
      type: [ String, Object ],
      required: false,
      default: null,
    },
    value: {
      type: [ String, Number ],
      required: false,
      default: null,
    },
  },
  setup(props) {
    return useTextField(props)
  }
}
</script>

<style lang="scss">
@import 'TextField';
</style>
