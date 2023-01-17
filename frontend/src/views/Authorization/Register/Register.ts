import { ref } from 'vue'
import { registerFormValidator } from '@/components/common/TextField/TextFieldRules'
import { useUserStore } from '@/stores/UserStore/UserStore'

const useRegister = () => {
  const userStore = useUserStore()

  const email = ref('')
  const username = ref('')
  const password = ref('')
  const confirmPassword = ref('')

  const register = async values => {
    const { email, password, username } = values
    await userStore.register({
      email: email,
      username: username,
      password: password,
    })
  }

  return {
    email,
    username,
    password,
    confirmPassword,
    register,
    registerFormValidator
  }
}

export default useRegister
