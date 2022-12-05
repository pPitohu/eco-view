import { ref } from 'vue'
import { TYPE } from 'vue-toastification'
import { fireToast } from '@/plugins/toast'
import { useUserStore } from '@/stores/UserStore/UserStore'

const useRegister = () => {
  const userStore = useUserStore()

  const email = ref('')
  const username = ref('')
  const password = ref('')
  const confirmPassword = ref('')

  const register = async () => {
    if (password.value !== confirmPassword.value)
      return fireToast(TYPE.ERROR, 'Пароли не совпадают!')
    await userStore.register({
      email: email.value,
      username: username.value,
      password: password.value,
    })
  }

  return {
    email,
    username,
    password,
    confirmPassword,
    register
  }
}

export default useRegister
