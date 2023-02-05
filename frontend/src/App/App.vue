<template>
  <Loader
    v-if="isShowLoader"
    :is-enabled="isPageHidden"
  />
  <main
    :class="{
      'auth-page': $route.meta.shouldHideHeader,
      'map-page': $route.name === 'map'
    }"
  >
    <div
      v-if="!isPageHidden && !$route.meta.shouldHideHeader"
      class="navigation"
    >
      <img
        class="logo"
        src="@/assets/images/logo.svg"
        alt="logo"
        @click="$router.push({ name: '/' })"
      >
      <Transition name="fade-in-bottom">
        <Header />
      </Transition>
    </div>
    <router-view v-show="!isPageHidden" />
  </main>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import Header from '@/components/Header/Header.vue'
import Loader from '@/components/Loader/Loader.vue'
import { useUserStore } from '@/stores/UserStore'

const userStore = useUserStore()
const isShowLoader = ref(true)
const isPageHidden = ref(true)

const disablePageHidden = () => {
  isPageHidden.value = false
  setTimeout(() => {
    isShowLoader.value = false
  }, 1400)
}
onMounted(async () => {
  if (!userStore.isAuthorized)
    await userStore.getCurrentUser()

  document.onreadystatechange = () => {
    if (document.readyState === 'complete')
      setTimeout(disablePageHidden, 1000)
  }
  // disablePageHidden()
})
</script>

<style lang="scss" scoped>
@import 'App';
</style>
