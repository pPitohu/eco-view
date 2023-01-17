import { onMounted } from 'vue'
import { loginFormValidator } from '@/components/common/TextField/TextFieldRules'

const useLogin = () => {
  const login = async values => {
    const { email, password } = values
    console.log(email, password)
  }

  onMounted(() => console.log('mounted'))

  return {
    loginFormValidator,
    login,
  }
}

export default useLogin
