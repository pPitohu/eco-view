import { storeToRefs } from 'pinia'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/UserStore'
import { isLowerThan } from '@/utils/mobile'

const useHeader = () => {
  const userStore = useUserStore()
  const { isAuthorized, isProfileLoading } = storeToRefs(userStore)

  const isHeaderHidden = ref(false)
  const prevScrollPos = ref(window.scrollY)

  const handleScroll = () => {
    isHeaderHidden.value = prevScrollPos.value < window.scrollY
    prevScrollPos.value = window.scrollY
  }

  onMounted(() => window.addEventListener('scroll', handleScroll))
    
  onBeforeUnmount(() => window.removeEventListener('scroll', handleScroll))

  return {
    isHeaderHidden,
    isProfileLoading,
    isAuthorized,
    isLowerThan
  }
}

export default useHeader
