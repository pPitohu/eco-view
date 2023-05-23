import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { markerCreationFormValidator } from '@/components/common/TextField/TextFieldRules' 
import { useMapStore } from '@/stores/MapStore'
import { ruGarbageType } from '@/stores/MapStore/types'
import { useUserStore } from '@/stores/UserStore'

const useMarkerCreationForm = (props, { emit }) => {
  const userStore = useUserStore()
  const mapStore = useMapStore()
  const shouldShowError = ref(false)
  const isLoading = ref(false)
  const { isAuthorized } = storeToRefs(userStore)

  const selectedGarbageTypes = ref<string[]>([])

  const selectCheckbox = (value: string) => {
    if (selectedGarbageTypes.value.includes(value))
      selectedGarbageTypes.value = selectedGarbageTypes.value.filter(val => val !== value)
    else selectedGarbageTypes.value.push(value)
  }

  const addMarker = async event => {
    if (!isAuthorized.value) return
    shouldShowError.value = true
    if (selectedGarbageTypes.value.length === 0) return
    isLoading.value = true
    
    await mapStore.addMarker({
      name: event.markerName,
      coords: props.markerCoords,
      garbageType: selectedGarbageTypes.value,
      author: userStore.user.email as string
    })

    shouldShowError.value = false
    isLoading.value = false
    emit('created')
  }

  return {
    ruGarbageType,
    selectedGarbageTypes,
    selectCheckbox,
    markerCreationFormValidator,
    addMarker,
    shouldShowError,
    isLoading,
    isAuthorized
  }
}

export default useMarkerCreationForm
