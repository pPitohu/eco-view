import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useUserStore } from '@/stores/UserStore'
import { isLowerThan } from '@/utils/mobile'

const useProfileMenu = () => {
  const userStore = useUserStore()
  const { user } = storeToRefs(userStore)
  const { logout } = userStore
  const isMenuOpen = ref(false)
  
  const toggleMenu = () => isMenuOpen.value = !isMenuOpen.value
  const closeMenu = () => isMenuOpen.value = false

  return {
    logout,
    isMenuOpen,
    toggleMenu,
    closeMenu,
    user,
    isLowerThan
  }
}

export default useProfileMenu
