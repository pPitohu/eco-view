import { onMounted } from 'vue'
import { emailRules, passwordRules } from '@/components/common/TextField/TextFieldRules'

const useLogin = () => {
  const login = () => {
    console.log('login')
  }

  onMounted(() => console.log('mounted'))

  return {
    emailRules,
    passwordRules,
    login,
  }
}

export default useLogin
