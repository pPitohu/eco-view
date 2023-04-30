import { ref } from 'vue'
import { registerFormValidator } from '@/components/common/TextField/TextFieldRules'
import router from '@/router'
import { useUserStore } from '@/stores/UserStore'

const useRegister = () => {
  const userStore = useUserStore()
  const isLoading = ref(false)

  const register = async values => {
    const { email, password, username } = values
    isLoading.value = true
    const { error } = await userStore.register({
      email: email,
      username: username,
      password: password,
    })
    if (!error) router.push({ name: 'profile' })
    isLoading.value = false
  }

  return {
    register,
    registerFormValidator,
    isLoading
  }
}

export default useRegister
