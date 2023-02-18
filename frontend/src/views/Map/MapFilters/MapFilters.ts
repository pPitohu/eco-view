
import { storeToRefs } from 'pinia'
import { useMapStore } from '@/stores/MapStore'

const useMapFilters = () => {
  const mapStore = useMapStore()
  const { filters } = storeToRefs(mapStore)
  const { toggleFilterActive } = mapStore

  return {
    filters,
    toggleFilterActive
  }
}

export default useMapFilters
