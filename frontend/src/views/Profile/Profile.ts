import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import {
  emailFormValidator,
  newPasswordFormValidator,
  userNameFormValidator
} from '@/components/common/TextField/TextFieldRules'
import { useUserStore } from '@/stores/UserStore'

const useProfile = () => {
  const userStore = useUserStore()
  const { user } = storeToRefs(userStore)
  const { changePassword, logout } = userStore

  const isEditingUsername = ref(false)
  const isEditingEmail = ref(false)
  const isPasswordModalOpen = ref(false)
  
  const toggleEditingUsername = () => {
    isEditingUsername.value = !isEditingUsername.value
  }
  
  const toggleEditingEmail = () => {
    isEditingEmail.value = !isEditingEmail.value
  }

  const togglePasswordModal = () =>
    isPasswordModalOpen.value = !isPasswordModalOpen.value
  
  const saveUsername = e => {
    user.value.username = e.username
    toggleEditingUsername()
  }

  const saveEmail = e => {
    user.value.email = e.email
    toggleEditingEmail()
  }

  return {
    user,
    logout,
    isPasswordModalOpen,
    isEditingUsername,
    isEditingEmail,
    togglePasswordModal,
    toggleEditingUsername,
    toggleEditingEmail,
    newPasswordFormValidator,
    changePassword,
    emailFormValidator,
    userNameFormValidator,
    saveUsername,
    saveEmail
  }
}

export default useProfile
