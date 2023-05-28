<template>
  <BurgerMenu v-if="isLowerThan(1024)" />
  <header
    v-else
    :class="{'hide': isHeaderHidden}"
  >
    <nav class="links">
      <router-link to="/">
        Главная
      </router-link>
      <router-link to="/sorting-rules">
        Сортируй правильно!
      </router-link>
      <router-link to="/user-guide">
        Руководство пользователя
      </router-link>
    </nav>
    <div
      v-auto-animate="{ duration: 150 }"
      class="auth-menu"
    >
      <div v-if="isProfileLoading" />
      
      <ProfileMenu v-else-if="isAuthorized" />
      <BaseButton
        v-else
        class="login-button"
        variant="secondary"
        @click="$router.push({ name: 'login' })"
      >
        ВОЙТИ
      </BaseButton>
    </div>
  </header>
</template>

<script lang="ts">
import BaseButton from '@/components/common/BaseButton/BaseButton.vue'
import ProfileMenu from '@/components/ProfileMenu/ProfileMenu.vue'
import BurgerMenu from './BurgerMenu/BurgerMenu.vue'
import useHeader from './Header'

export default {
  components: {
    BaseButton,
    ProfileMenu,
    BurgerMenu
  },
  setup() {
    return useHeader()
  }
}
</script>

<style lang="scss" scoped>
@import 'Header';
</style>
