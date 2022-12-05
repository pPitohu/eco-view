<template>
  <div>hello from Home.vue</div>
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
