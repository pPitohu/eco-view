import { storeToRefs } from 'pinia'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { loadYmap } from 'vue-yandex-maps'
import { YmapSettings } from '@/main'
import { useMapStore } from '@/stores/MapStore'
import { FilterValues } from '@/stores/MapStore/types'
import type { Map } from 'yandex-maps'

const MinskCoordinates = [ 53.902287, 27.561824 ]

const useMap = () => {
  const mapStore = useMapStore()
  const { activeFilters, markers } = storeToRefs(mapStore)
  const { findFilterByValue, loadMarkers } = mapStore

  const markersToDisplay = computed(() => {
    const markerList = markers.value.filter(marker => {
      if (findFilterByValue(FilterValues.all)?.isActive)
        return true
      
      return marker.garbageType.some(m => activeFilters.value.some(f => f.value === m))
    })
    return markerList.filter((marker, index) =>
      markerList.findIndex(m => m.id === marker.id) === index)
  })

  const MapContainer = ref()
  const clickData = ref<any>()

  const setMapHeight = (mapContainer: Map['container']) => {
    MapContainer.value.style.height = `${window.innerHeight - 170}px`
    mapContainer.fitToViewport()
  }

  const created = async (map: Map) => {
    await loadYmap(YmapSettings)

    setMapHeight(map.container)
    window.onresize = () => setMapHeight(map.container)
  }

  const handleMarkerClick = async e => {
    const m = await ymaps.geocode(e.get('coords'), { results: 1 })
    clickData.value = m.geoObjects.get(0).properties.get('name', { d: 'error' })
  }

  onMounted(async () => {
    await loadMarkers()
  })
  
  onUnmounted(() => window.onresize = () => {})

  return {
    created,
    markers,
    MinskCoordinates,
    clickData,
    handleMarkerClick,
    MapContainer,
    markersToDisplay
  }
}

export default useMap
