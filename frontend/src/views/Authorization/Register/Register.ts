import { ref } from 'vue'
import { registerFormValidator } from '@/components/common/TextField/TextFieldRules'
import router from '@/router'
import { useUserStore } from '@/stores/UserStore'

const useRegister = () => {
  const userStore = useUserStore()

  const email = ref('')
  const username = ref('')
  const password = ref('')
  const confirmPassword = ref('')

  const register = async values => {
    const { email, password, username } = values
    const { error } = await userStore.register({
      email: email,
      username: username,
      password: password,
    })
    if (!error) router.push({ name: 'home' })
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
