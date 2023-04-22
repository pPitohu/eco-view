<template>
  <BaseButton
    class="toggle-menu"  
    icon
    variant="secondary"
    @click="isOpen = true"
  >
    <template #appendIcon>
      <img
        src="@/assets/icons/burger-menu.svg"
        alt="burger menu icon"
      >
    </template>
  </BaseButton>
  <Teleport to="body">
    <Slide
      right
      no-overlay
      width="260"
      :is-open="isOpen"
      :burger-icon="false"
      :cross-icon="false"
      :close-on-navigation="true"
      @closeMenu="isOpen = false"
    >
      <div class="burger-menu">
        <Transition name="fade-in-right">
          <BaseButton
            v-if="isOpen"
            class="close-button"  
            icon
            variant="secondary"
            @click="isOpen = false"
          >
            <template #appendIcon>
              <img
                src="@/assets/icons/close-icon.svg"
                alt="burger menu icon"
              >
            </template>
          </BaseButton>
        </Transition>
        <div class="links">
          <router-link to="/map">
            Главная
          </router-link>
          <router-link to="/">
            Сортируй правильно!
          </router-link>
          <router-link to="/">
            Руководство пользователя
          </router-link>
        </div>
        <div class="profile">
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
      </div>
    </Slide>
  </Teleport>
</template>

<script lang="ts">
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { Slide } from 'vue3-burger-menu'
import BaseButton from '@/components/common/BaseButton/BaseButton.vue'
import ProfileMenu from '@/components/ProfileMenu/ProfileMenu.vue'
import { useUserStore } from '@/stores/UserStore'

export default {
  components: {
    Slide,
    BaseButton,
    ProfileMenu
  },
  setup() {
    const isOpen = ref(false)
    const userStore = useUserStore()
    const { isAuthorized, isProfileLoading } = storeToRefs(userStore)
    
    return {
      isOpen,
      isAuthorized,
      isProfileLoading
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'BurgerMenu';
</style>
