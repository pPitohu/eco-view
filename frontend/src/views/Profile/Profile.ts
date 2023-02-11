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
  const { logout } = userStore

  const isEditingUsername = ref(false)
  const isEditingEmail = ref(false)
  const isPasswordModalOpen = ref(false)

  const imageInput = ref()
  
  const toggleEditingUsername = () => {
    isEditingUsername.value = !isEditingUsername.value
  }
  
  const toggleEditingEmail = () => {
    isEditingEmail.value = !isEditingEmail.value
  }

  const togglePasswordModal = () =>
    isPasswordModalOpen.value = !isPasswordModalOpen.value
  
  const saveUsername = async e => {
    if (e.username !== user.value.username)
      await userStore.updateCredentials({ username: e.username })
    toggleEditingUsername()
  }

  const saveEmail = async e => {
    if (e.email !== user.value.email)
      await userStore.updateCredentials({ email: e.email })
    toggleEditingEmail()
  }

  const changePassword = async e => {
    await userStore.updateCredentials({ password: e.password })
    togglePasswordModal()
  }

  const selectImage = () => {
    if (imageInput.value)
      imageInput.value.click()
  }

  const updateImage = async (e: Event) => {
    const file = (e?.target as HTMLInputElement)?.files?.[0]
    if (file)
      await userStore.updateImage(file)
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
    saveEmail,
    selectImage,
    imageInput,
    updateImage
  }
}

export default useProfile
