<template>
  <div
    ref="MapContainer"
    class="map-container"
  >
    <YandexMap
      :coordinates="MinskCoordinates"
      :zoom="12"
      :controls="['geolocationControl']"
      @created="created"
    >
      <YandexClusterer>
        <MapMarker
          v-for="marker in markersToDisplay"
          :key="marker.id"
          :marker-id="marker.id"
          :coordinates="marker.coords"
          :options="{
            balloonPanelMaxMapArea: 0,
            balloonOffset: [0, -15],
            iconLayout: 'default#image',
            iconImageHref: marker.icon,
          }"
          @click="handleMarkerClick"
        >
          <template #balloon>
            <div>
              {{ clickData }}
            </div>
          </template>
        </MapMarker>
      </YandexClusterer>
    </YandexMap>
    <div class="map-sidebar">
      <MapFilters />
    </div>
  </div>
</template>

<script lang="ts">
import useMap from './Map'
import MapFilters from './MapFilters/MapFilters.vue'
import MapMarker from './MapMarker/MapMarker.vue'

export default {
  components: {
    MapFilters,
    MapMarker
  },
  setup() {
    return useMap()
  }
}
</script>

<style lang="scss" scoped>
@import 'Map';
</style>
