import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/UserStore'

const useHeader = () => {
  const userStore = useUserStore()
  const { isAuthorized, isProfileLoading } = storeToRefs(userStore)

  return {
    isProfileLoading,
    isAuthorized
  }
}

export default useHeader
