<template>
  <div class="authorization-wrapper">
    <LogoStroke
      class="logo"
      @click="() => $router.push({ name: 'home' })"
    />
    <TopLeftLeafs />

    <router-view v-slot="{ Component }">
      <transition
        name="fade-in-bottom"
        mode="out-in"
        appear
      >
        <component :is="Component" />
      </transition>
    </router-view>

    <BackgroundSVG class="background" />
    <BottomRightLeafs />
  </div>
</template>

<script lang="ts">
import BackgroundSVG from '@/components/icons/LoginBackground.vue'
import LogoStroke from '@/components/icons/LogoStroke.vue'
import BottomRightLeafs from './BottomRightLeafs.vue'
import TopLeftLeafs from './TopLeftLeafs.vue'

export default {
  components: {
    BackgroundSVG,
    LogoStroke,
    TopLeftLeafs,
    BottomRightLeafs,
  },
}
</script>

<style lang="scss" scoped>
@import 'Authorization';
</style>
