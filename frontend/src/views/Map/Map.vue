<template>
  <div
    ref="MapContainer"
    v-auto-animate="{ duration: 150 }"
    class="map-container"
  >
    <YandexMap
      :coordinates="MinskCoordinates"
      :zoom="12"
      :controls="['geolocationControl']"
      :options="{
        restrictMapArea: [
          [54.007462191413666, 27.293045893761068],
          [53.75267738032513, 27.92407311544074],
        ],
        suppressMapOpenBlock: true,
      }"
      @created="created"
      @geo-objects-updated="handleUpdatedGeoObjects"
      v-on="isEditingMode ? { click: handleNewMarkerCoords } : {}"
    >
      <div
        v-for="marker in markersToDisplay"
        :key="marker._id"
      >
        <YandexMarker
          v-if="!isEditingMode"
          :marker-id="marker._id"
          :coordinates="marker.coords"
          :options="{
            balloonPanelMaxMapArea: 0,
            balloonOffset: [0, -15],
            iconLayout: 'default#image',
            iconImageHref: marker.icon,
            imageSize: [34, 41]
          }"
          @click="$event => handleMarkerClick($event, marker)"
        >
          <template #component>
            <div>
              {{ clickData }}
              {{ marker._id }}
              {{ marker.garbageType }}
            </div>
          </template>
        </YandexMarker>
      </div>
      <YandexMarker
        v-if="isEditingMode && newMarkerCoords"
        marker-id="1488"
        :coordinates="newMarkerCoords"
        :options="{
          balloonPanelMaxMapArea: 0,
          balloonOffset: [0, -15],
          iconLayout: 'default#image',
          iconImageHref: defaultMarkerIcon,
          imageSize: [34, 41]
        }"
      />
    </YandexMap>
    <BaseButton
      v-if="isEditingMode"
      class="close-editing-mode"
      variant="secondary"
      icon
      @click="disableEditingMode"
    >
      <template #appendIcon>
        <img
          src="@/assets/icons/close-icon.svg"
          alt="close icon"
        >
      </template>
    </BaseButton>
    <BaseButton
      v-else
      class="add-marker"
      circle
      icon
      @click="isEditingMode = true"
    >
      <template #appendIcon>
        <img
          class="add-marker-button__icon"
          src="@/assets/icons/add-marker-icon.svg"
          alt="marker icon"
        >
      </template>
    </BaseButton>
    <div class="map-sidebar">
      <Transition
        name="fade-in-bottom"
        mode="out-in"
      >
        <MarkerCreationForm
          v-if="isEditingMode"
          :marker-coords="newMarkerCoords"
          @created="disableEditingMode"
        />
        <MapFilters v-else />
      </Transition>
    </div>
  </div>
</template>

<script lang="ts">
import BaseButton from '@/components/common/BaseButton/BaseButton.vue'
import useMap from './Map'
import MapFilters from './MapFilters/MapFilters.vue'
import MarkerCreationForm from './MarkerCreationForm/MarkerCreationForm.vue'

export default {
  components: {
    MapFilters,
    BaseButton,
    MarkerCreationForm
  },
  setup() {
    return useMap()
  }
}
</script>

<style lang="scss" scoped>
@import 'Map';
</style>
