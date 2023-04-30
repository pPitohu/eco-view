import { ref } from 'vue'
import { loginFormValidator } from '@/components/common/TextField/TextFieldRules'
import router from '@/router'
import { useUserStore } from '@/stores/UserStore'

const useLogin = () => {
  const userStore = useUserStore()
  const isLoading = ref(false)

  const login = async values => {
    const { email, password } = values
    isLoading.value = true
    const { error } = await userStore.login({ email, password })
    if (!error) router.push({ name: 'profile' })
    isLoading.value = false
  }

  return {
    loginFormValidator,
    login,
    isLoading
  }
}

export default useLogin
