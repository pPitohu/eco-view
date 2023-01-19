import { loginFormValidator } from '@/components/common/TextField/TextFieldRules'
import router from '@/router'
import { useUserStore } from '@/stores/UserStore'

const useLogin = () => {
  const userStore = useUserStore()

  const login = async values => {
    const { email, password } = values
    const { error } = await userStore.login({ email, password })
    if (!error) router.push({ name: 'home' })
  }

  return {
    loginFormValidator,
    login,
  }
}

export default useLogin
