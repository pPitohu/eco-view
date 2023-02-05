import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { TYPE } from 'vue-toastification'
import accountPlugImage from '@/assets/images/account-plug.svg'
import { fireToast } from '@/plugins/toast'
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
    image: accountPlugImage
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
      image: accountPlugImage
    }
  }

  const logout = () => {
    resetUserState()
    localStorage.removeItem('token')
    if (router.currentRoute.value.meta.isPrivateRoute)
      router.push({ name: 'login' }) // change to '/'
  }

  const changePassword = () => {
    fireToast(TYPE.SUCCESS, 'Пароль успешно изменен!')
  }

  return {
    user,
    isAuthorized,
    isProfileLoading,
    resetUserState,
    logout,
    changePassword,
    ...actions
  }
}

export const useUserStore = defineStore(
  'UserStore',
  userStore
)
