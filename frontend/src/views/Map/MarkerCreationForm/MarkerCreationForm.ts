import { ref } from 'vue'
import { markerCreationFormValidator } from '@/components/common/TextField/TextFieldRules'
import { useMapStore } from '@/stores/MapStore' 
import { FilterValues } from '@/stores/MapStore/types'
import { useUserStore } from '@/stores/UserStore'

const useMarkerCreationForm = (props, { emit }) => {
  const userStore = useUserStore()
  const mapStore = useMapStore()
  const shouldShowError = ref(false)
  const isLoading = ref(false)

  const garbageType = {
    [FilterValues.paper]: 'Бумага',
    [FilterValues.plastic]: 'Пластик',
    [FilterValues.metal]: 'Металл',
    [FilterValues.glass]: 'Стекло',
    [FilterValues.clothes]: 'Одежда'
  }

  const selectedGarbageTypes = ref<string[]>([])

  const selectCheckbox = (value: string) => {
    if (selectedGarbageTypes.value.includes(value))
      selectedGarbageTypes.value = selectedGarbageTypes.value.filter(val => val !== value)
    else selectedGarbageTypes.value.push(value)
  }

  const addMarker = async event => {
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
    garbageType,
    selectedGarbageTypes,
    selectCheckbox,
    markerCreationFormValidator,
    addMarker,
    shouldShowError,
    isLoading
  }
}

export default useMarkerCreationForm
