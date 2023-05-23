import { storeToRefs } from 'pinia'
import { onUnmounted, ref, watch } from 'vue'
import { loadYmap } from 'vue-yandex-maps'
import defaultMarkerIcon from '@/assets/icons/default-marker-icon.svg'
import { YmapSettings } from '@/main'
import { useMapStore } from '@/stores/MapStore'
import type { Marker } from '@/stores/MapStore/types'
import { ruGarbageType } from '@/stores/MapStore/types'
import { useUserStore } from '@/stores/UserStore'
import { UserRoles } from '@/stores/UserStore/types'
import { attachMarkerToMouseMove, detachMarkerFromMouseMove } from '@/utils/floatingMarkerMouseMove'
import type { Map } from 'yandex-maps'

const MinskCoordinates = [ 53.902287, 27.561824 ]

const useMap = () => {
  const userStore = useUserStore()
  const mapStore = useMapStore()

  const isEditingMode = ref(false)
  const newMarkerCoords = ref<number[]>([])

  const { isAuthorized, user } = storeToRefs(userStore)
  const {
    activeFiltersValues,
    isApprovingMarker,
    isDeletingMarker,
    markers,
    markersToDisplay
  } = storeToRefs(mapStore)
  const { approveMarker, deleteMarker, isMarkerVisible, loadMarkers } = mapStore

  const MapContainer = ref()
  const clickData = ref<any>()

  const setMapHeight = () => {
    if (MapContainer.value)
      MapContainer.value.style.height = `${window.innerHeight - 170}px`
  }

  const created = async (map: Map) => {
    await loadYmap(YmapSettings)
    await loadMarkers()

    setMapHeight()
    window.onresize = () => setMapHeight()
  }

  const handleMarkerClick = async (event, marker: Marker) => {
    const m = await ymaps.geocode(marker.coords, { results: 1 })
    clickData.value = m.geoObjects.get(0).properties.get('name', { d: 'error' })
  }

  const handleNewMarkerCoords = event => {
    console.log(event)
    newMarkerCoords.value = event.get('coords')
  }

  const disableEditingMode = () => {
    newMarkerCoords.value = []
    isEditingMode.value = false
  }

  const isMarkerPendingApproval = (marker: Marker) => {
    return marker.approvalStatus === 'pending' && user.value.role === UserRoles.ADMIN
  }
  
  onUnmounted(() => window.onresize = () => {})

  watch(isEditingMode, (isEditing: boolean) => {
    if (isEditing) attachMarkerToMouseMove(MapContainer.value, defaultMarkerIcon)
    else detachMarkerFromMouseMove(MapContainer.value)
  })

  return {
    isAuthorized,
    ruGarbageType,
    activeFiltersValues,
    created,
    MinskCoordinates,
    clickData,
    handleMarkerClick,
    MapContainer,
    markersToDisplay,
    isMarkerVisible,
    isEditingMode,
    defaultMarkerIcon,
    handleNewMarkerCoords,
    newMarkerCoords,
    disableEditingMode,
    markers,
    isMarkerPendingApproval,
    approveMarker,
    deleteMarker,
    isApprovingMarker,
    isDeletingMarker
  }
}

export default useMap
