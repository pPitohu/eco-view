<template>
  <YandexMarker
    :marker-id="markerId"
    :coordinates="coordinates"
    :options="options"
    v-bind="$attrs"
    @click="$emit('click', $event)"
  >
    <template #component>
      <slot name="balloon" />
    </template>
  </YandexMarker>
</template>

<script lang="ts">
export default {
  props: {
    coordinates: {
      type: Array,
      required: true
    },
    options: {
      type: Object,
      required: false,
      default: () => ({})
    },
    markerId: {
      type: String,
      required: true
    }
  },
  setup() {

  }
}
</script>

<style lang="scss" scoped>

</style>
