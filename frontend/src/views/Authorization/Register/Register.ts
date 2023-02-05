import { registerFormValidator } from '@/components/common/TextField/TextFieldRules'
import router from '@/router'
import { useUserStore } from '@/stores/UserStore'

const useRegister = () => {
  const userStore = useUserStore()

  const register = async values => {
    const { email, password, username } = values
    const { error } = await userStore.register({
      email: email,
      username: username,
      password: password,
    })
    if (!error) router.push({ name: 'profile' }) // change to '/'
  }

  return {
    register,
    registerFormValidator
  }
}

export default useRegister
