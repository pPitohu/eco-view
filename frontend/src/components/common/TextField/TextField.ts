import { useField } from 'vee-validate'
import { ref } from 'vue'

const useTextField = (props: any) => {
  const inputType = ref(props.type)
  const isPasswordInput = props.type === 'password'
  const isPasswordVisible = ref(false)

  const { errorMessage, meta } = useField(props.name)

  const togglePasswordVisibility = () => {
    inputType.value = inputType.value === 'password' ? 'text' : 'password'
    isPasswordVisible.value = !isPasswordVisible.value
  }

  return {
    togglePasswordVisibility,
    inputType,
    isPasswordInput,
    isPasswordVisible,
    errorMessage,
    meta,
  }
}

export default useTextField
