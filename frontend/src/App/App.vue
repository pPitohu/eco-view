<template>
  <Transition name="fade-in-bottom">
    <div v-if="!isPageHidden && !$route.meta.shouldHideHeader">
      123
    </div>
  </Transition>
  <Loader
    v-if="isShowLoader"
    :is-enabled="isPageHidden"
  />
  <router-view v-show="!isPageHidden" />
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import Loader from '@/components/Loader/Loader.vue'

const isShowLoader = ref(true)
const isPageHidden = ref(true)

const togglePageHidden = () => {
  isPageHidden.value = false
  setTimeout(() => {
    isShowLoader.value = false
  }, 2000)
}
onMounted(() => {
  document.onreadystatechange = () => {
    if (document.readyState === 'complete')
      setTimeout(togglePageHidden, 1000)
  }
})
</script>

<style lang="scss" scoped>
@import 'App';
</style>
