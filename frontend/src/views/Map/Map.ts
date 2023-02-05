import { onMounted, onUnmounted, ref } from 'vue'
import { loadYmap } from 'vue-yandex-maps'
import { YmapSettings } from '@/main'
import type { Map } from 'yandex-maps'

const MinskCoordinates = [ 53.902287, 27.561824 ]

const useMap = () => {
  const MapContainer = ref()
  const clickData = ref<any>()

  const setMapHeight = (mapContainer: Map['container']) => {
    MapContainer.value.style.height = `${window.innerHeight - 170}px`
    mapContainer.fitToViewport()
    MapContainer.value.style.height = '100%'
  }

  const created = async (map: Map) => {
    setMapHeight(map.container)
    window.onresize = () => setMapHeight(map.container)
  }

  const handleMarkerClick = async e => {
    const m = await ymaps.geocode(e.get('coords'), { results: 1 })
    clickData.value = m.geoObjects.get(0).properties.get('name', { d: 'error' })
  }
  
  onMounted(async () => {
    await loadYmap(YmapSettings)
  })

  onUnmounted(() => {
    window.onresize = () => {}
  })

  return {
    created,
    MinskCoordinates,
    clickData,
    handleMarkerClick,
    MapContainer,
  }
}

export default useMap
