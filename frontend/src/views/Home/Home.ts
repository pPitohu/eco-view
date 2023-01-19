import { useUserStore } from '@/stores/UserStore'

const useHome = () => {
  const userStore = useUserStore()

  return {
    userStore  
  }
}

export default useHome
