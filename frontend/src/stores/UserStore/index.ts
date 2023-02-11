import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import accountPlugImage from '@/assets/images/account-plug.svg'
import router from '@/router'
import actions from './actions'
import type { UserState } from './types'

const userStore = () => {
  const user = ref<UserState>({
    id: null,
    email: null,
    username: null,
    createdAt: null,
    updatedAt: null,
    role: null,
    image: {
      imageLink: accountPlugImage,
      fileId: null
    }
  })

  const isProfileLoading = ref(true)
  const isAuthorized = computed((): boolean => Boolean(user.value.id))

  const resetUserState = () => {
    user.value = {
      id: null,
      email: null,
      username: null,
      createdAt: null,
      updatedAt: null,
      role: null,
      image: {
        imageLink: accountPlugImage,
        fileId: null
      }
    }
  }

  const logout = () => {
    resetUserState()
    localStorage.removeItem('token')
    if (router.currentRoute.value.meta.isPrivateRoute)
      router.push({ name: 'login' }) // change to '/'
  }

  return {
    user,
    isAuthorized,
    isProfileLoading,
    resetUserState,
    logout,
    ...actions
  }
}

export const useUserStore = defineStore(
  'UserStore',
  userStore
)
