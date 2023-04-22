import { storeToRefs } from 'pinia'
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { loadYmap } from 'vue-yandex-maps'
import defaultMarkerIcon from '@/assets/icons/default-marker-icon.svg'
import { YmapSettings } from '@/main'
import { useMapStore } from '@/stores/MapStore'
import type { Marker } from '@/stores/MapStore/types'
import { attachMarkerToMouseMove, detachMarkerFromMouseMove } from '@/utils/floatingMarkerMouseMove'
import type { Map } from 'yandex-maps'

const MinskCoordinates = [ 53.902287, 27.561824 ]

const useMap = () => {
  const mapStore = useMapStore()

  const isEditingMode = ref(false)
  const newMarkerCoords = ref<number[]>([])

  const { activeFiltersValues, markers, markersToDisplay } = storeToRefs(mapStore)
  const { isMarkerVisible, loadMarkers } = mapStore

  const MapContainer = ref()
  const clickData = ref<any>()

  const setMapHeight = (mapContainer: Map['container']) => {
    MapContainer.value.style.height = `${window.innerHeight - 170}px`
    mapContainer.fitToViewport()
  }

  const created = async (map: Map) => {
    await loadYmap(YmapSettings)
    await loadMarkers()

    setMapHeight(map.container)
    window.onresize = () => setMapHeight(map.container)
  }

  const handleMarkerClick = async (event, marker: Marker) => {
    const m = await ymaps.geocode(marker.coords, { results: 1 })
    clickData.value = m.geoObjects.get(0).properties.get('name', { d: 'error' })
  }

  const handleUpdatedGeoObjects = (mapGeoObjects: Map['geoObjects']) => {
  }

  const handleNewMarkerCoords = event => {
    console.log(event)
    newMarkerCoords.value = event.get('coords')
  }

  const disableEditingMode = () => {
    newMarkerCoords.value = []
    isEditingMode.value = false
  }
  
  onMounted(async () => {
  })
  
  onUnmounted(() => window.onresize = () => {})
  
  watch(markersToDisplay, v => console.log(v))

  watch(isEditingMode, (isEditing: boolean) => {
    if (isEditing) attachMarkerToMouseMove(MapContainer.value, defaultMarkerIcon)
    else detachMarkerFromMouseMove(MapContainer.value)
  })

  return {
    activeFiltersValues,
    created,
    MinskCoordinates,
    clickData,
    handleMarkerClick,
    MapContainer,
    markersToDisplay,
    handleUpdatedGeoObjects,
    isMarkerVisible,
    isEditingMode,
    defaultMarkerIcon,
    handleNewMarkerCoords,
    newMarkerCoords,
    disableEditingMode,
    markers,
  }
}

export default useMap
