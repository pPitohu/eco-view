<template>
  <div
    v-auto-animate="{ duration: 150 }"
    class="profile-menu"
  >
    <img
      class="profile-image"
      :class="{'active': isMenuOpen}"
      :src="user.image"
      alt="profile-image"
      @click="toggleMenu"
    >
    <img
      class="caret"
      :class="{'active': isMenuOpen}"
      src="@/assets/icons/caret-down.svg"
      alt="caret-down"
      @click="toggleMenu"
    >
    <div
      v-if="isMenuOpen"
      v-click-outside="closeMenu"
      class="profile-dropdown"
      @click="closeMenu"
    >
      <router-link
        class="item"
        to="/profile"
      >
        Профиль
      </router-link>
      <a
        class="item logout"
        @click="logout"
      >
        Выйти
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import useProfileMenu from './ProfileMenu'

export default {
  setup() {
    return useProfileMenu()
  }
}
</script>

<style lang="scss" scoped>
@import 'ProfileMenu';
</style>
