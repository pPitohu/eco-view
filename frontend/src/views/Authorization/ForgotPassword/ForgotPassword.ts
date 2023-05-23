import { ref } from 'vue'
import { TYPE } from 'vue-toastification'
import { emailFormValidator, newPasswordFormValidator } from '@/components/common/TextField/TextFieldRules'
import { fireToast } from '@/plugins/toast'
import { useUserStore } from '@/stores/UserStore'

const useLogin = () => {
  const userStore = useUserStore()
  const isSendingResetMessage = ref(false)
  const isResetCodeFormShown = ref(false)
  const isPasswordFormShown = ref(false)
  const isSendingPasswordReset = ref(false)
  const isFinalScreenShown = ref(false)
  const userEmail = ref()

  const sendResetMessage = async form => {
    isSendingResetMessage.value = true
    await userStore.sendResetMessage(form.email)
    isSendingResetMessage.value = false
    
    if (!userStore.resetCode) return
    
    isResetCodeFormShown.value = true
    userEmail.value = form.email
  }

  const checkResetCodes = form => {
    if (form.code?.trim() !== userStore.resetCode)
      return fireToast(TYPE.ERROR, 'Введенный код неверен, попробуйте снова')
    
    isResetCodeFormShown.value = false

    isPasswordFormShown.value = true
  }

  const sendPasswordReset = async form => {
    isSendingPasswordReset.value = true
    await userStore.resetPassword({
      email: userEmail.value,
      password: form.password
    })
    isSendingPasswordReset.value = false

    isFinalScreenShown.value = true
  }

  return {
    emailFormValidator,
    sendResetMessage,
    isSendingResetMessage,
    isResetCodeFormShown,
    checkResetCodes,
    isPasswordFormShown,
    isSendingPasswordReset,
    sendPasswordReset,
    newPasswordFormValidator,
    userEmail,
    isFinalScreenShown
  }
}

export default useLogin
