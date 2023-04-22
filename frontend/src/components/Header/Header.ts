import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/UserStore'
import { isLowerThan } from '@/utils/mobile'

const useHeader = () => {
  const userStore = useUserStore()
  const { isAuthorized, isProfileLoading } = storeToRefs(userStore)

  return {
    isProfileLoading,
    isAuthorized,
    isLowerThan
  }
}

export default useHeader
