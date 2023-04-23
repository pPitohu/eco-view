<template>
  <div class="left-menu">
    <router-link
      v-for="([ key, value ]) in Object.entries(menuItems)"
      :key="key"
      class="left-menu__item"
      :class="{ 'active': $route.path === value.link }"
      :to="value.link"
    >
      <img
        :src="value.icon"
        :alt="key"
      >
      <p class="name">
        {{ value.name }}
      </p>
    </router-link>
    <div class="slider" />
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import leftMenuMarkerIcon from '@/assets/icons/left-menu-marker-icon.svg'
import leftMenuBotIcon from '@/assets/icons/left-menu-robot-icon.svg'

export default {
  setup() {
    const menuItems = ref({
      map: {
        icon: leftMenuMarkerIcon,
        link: '/map',
        name: 'Карта'
      },
      bot: {
        icon: leftMenuBotIcon,
        link: '/bot',
        name: 'Бот'
      }
    })

    return {
      menuItems
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'LeftMenu';
</style>
