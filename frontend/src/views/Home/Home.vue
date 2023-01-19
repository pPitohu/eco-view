<template>
  <div
    v-for="item in Object.entries(userStore.user)"
    :key="item"
  >
    {{ item }}
  </div>
</template>

<script lang="ts">
import useHome from './Home'

export default {
  setup() {
    return useHome()
  }
}
</script>

<style lang="scss" scoped>
@import 'Home';
</style>
