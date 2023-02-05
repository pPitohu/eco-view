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
        <YandexMarker
          :coordinates="[53.943997, 27.712215]"
          marker-id="123"
          :options="{
            balloonPanelMaxMapArea: 0,
            preset: 'islands#blueStretchyIcon',
            balloonOffset: [0, -40],
          }"
          @click="handleMarkerClick"
        >
          <template #component>
            <div style="padding: 40px;">
              {{ clickData }}
            </div>
          </template>
        </YandexMarker>
      </YandexClusterer>
    </YandexMap>
    <div class="map-filters" />
  </div>
</template>

<script lang="ts">
import useMap from './Map'

export default {
  setup() {
    return useMap()
  }
}
</script>

<style lang="scss" scoped>
@import 'Map';
</style>
