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
    <Transition name="fade-in-bottom">
      <LeftMenu v-if="!$route.meta.shouldHideLeftMenu" />
    </Transition>
    <router-view
      v-show="!isPageHidden"
      v-slot="{ Component }"
    >
      <Transition
        name="fade"
        mode="out-in"
      >
        <component :is="Component" />
      </Transition>
    </router-view>
  </main>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import Header from '@/components/Header/Header.vue'
import LeftMenu from '@/components/LeftMenu/LeftMenu.vue'
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
onMounted(() => {
  window.onload = async () => {
    if (!userStore.isAuthorized)
      await userStore.getCurrentUser()

    setTimeout(disablePageHidden, 1000)
  }
})
</script>

<style lang="scss" scoped>
@import 'App';
</style>
