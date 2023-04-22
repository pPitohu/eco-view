<template>
  <div
    v-auto-animate="{ duration: 150 }"
    class="profile-menu"
    v-on="isLowerThan(1024) ? { click: () => $router.push('/profile') } : {}"
  >
    <img
      class="profile-image"
      :class="{'active': isMenuOpen}"
      :src="user.image.imageLink"
      alt="profile-image"
      v-on="isLowerThan(1024) ? {} : { click: toggleMenu }"
    >
    <p
      v-if="isLowerThan(1024)"
      class="profile-text"
    >
      Профиль
    </p>
    <img
      v-else
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
