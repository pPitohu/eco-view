import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import actions from './actions'
import type { UserState } from './types'

const userStore = () => {
  const user = ref<UserState>({
    id: null,
    email: null,
    username: null,
    createdAt: null,
    updatedAt: null,
    role: null
  })
  
  const isAuthorized = computed((): boolean => Boolean(user.value.id))

  return {
    user,
    isAuthorized,
    ...actions
  }
}

export const useUserStore = defineStore(
  'UserStore',
  userStore
)
