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
          [54.3171795,26.7150761],
          [53.6433875,28.2391009],
        ],
        suppressMapOpenBlock: true,
        yandexMapDisablePoiInteractivity: true,
        suppressObsoleteBrowserNotifier: true,
        autoFitToViewport: 'always'
      }"
      @created="created"
      v-on="isEditingMode ? { click: handleNewMarkerCoords } : {}"
    >
      <YandexClusterer>
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
              balloonOffset: [0, -25],
              iconOffset: [-5, 0],
              iconLayout: 'default#image',
              iconImageHref: marker.icon,
              imageSize: [34, 41],
              hideIconOnBalloonOpen: false
            }"
            @click="$event => handleMarkerClick($event, marker)"
          >
            <template #component>
              <div class="balloon">
                <h2 class="marker-heading">
                  <img
                    class="marker-heading__icon"
                    :src="marker.icon"
                    alt="marker icon"
                  >
                  <div class="marker-heading__content">
                    <span
                      class="marker-name"
                      :title="marker.name"
                    >{{ marker.name }}</span>
                    <p class="marker-author">
                      от {{ marker.author }}
                    </p>
                  </div>
                </h2>
                <ul class="marker-garbage">
                  <li
                    v-for="garbageType in marker.garbageType"
                    :key="garbageType"
                    class="marker-garbage__type"
                  >
                    <img
                      width="24"
                      class="marker-garbage__type-checkmark"
                      src="@/assets/icons/double-checkmarks.svg"
                      alt="checkmark"
                    >
                    <span>{{ ruGarbageType[garbageType] }}</span>
                  </li>
                </ul>
                <p class="marker-coords">
                  координаты:<br> {{ marker.coords.toString()
                    .replaceAll('[', '').replaceAll(']', '') }}
                </p>
                <div
                  v-if="isMarkerPendingApproval(marker)"
                  class="marker-approval"
                >
                  <BaseButton
                    small  
                    class="approve"
                    variant="primary"
                    :is-loading="isApprovingMarker"
                    @click="approveMarker(marker)"
                  >
                    Сохранить
                  </BaseButton>
                  <BaseButton
                    small
                    class="cancel"
                    variant="danger"
                    :is-loading="isDeletingMarker"
                    @click="deleteMarker(marker)"
                  >
                    Удалить
                  </BaseButton>
                </div>
              </div>
            </template>
          </YandexMarker>
        </div>
      </YandexClusterer>
      <YandexMarker
        v-if="isEditingMode && newMarkerCoords"
        marker-id="1488"
        :coordinates="newMarkerCoords"
        :options="{
          balloonPanelMaxMapArea: 0,
          iconOffset: [-5, 0],
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
      :disabled="!isAuthorized"
      class="add-marker"
      circle
      icon
      v-on="isAuthorized ? {
        click: () => isEditingMode = true
      } : {}"
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
    MarkerCreationForm,
  },
  setup() {
    return useMap()
  }
}
</script>

<style lang="scss" scoped>
@import 'Map';
</style>
