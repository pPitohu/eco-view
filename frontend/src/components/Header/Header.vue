<template>
  <header>
    <nav class="links">
      <router-link to="/map">
        Главная
      </router-link>
      <router-link to="/">
        Сортируй правильно!
      </router-link>
      <router-link to="/">
        О нас
      </router-link>
      <router-link to="/">
        Поддержать проект
      </router-link>
    </nav>
    <div
      v-auto-animate="{ duration: 150 }"
      class="auth-menu"
    >
      <!-- loader here -->
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
import useHeader from './Header'

export default {
  components: {
    BaseButton,
    ProfileMenu,
  },
  setup() {
    return useHeader()
  }
}
</script>

<style lang="scss" scoped>
@import 'Header';
</style>
