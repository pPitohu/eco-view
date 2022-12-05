import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import actions from './actions'
import type { UserState } from './types'

const userStore = () => {
  const user = ref<UserState>({
    _id: null,
    email: null,
    username: null,
    createdAt: null,
    updatedAt: null,
    role: null
  })

  const token = ref<string>()
  
  const isAuthorized = computed((): boolean => Boolean(user.value._id))

  return {
    user,
    isAuthorized,
    token,
    ...actions
  }
}

export const useUserStore = defineStore(
  'UserStore',
  userStore
)
