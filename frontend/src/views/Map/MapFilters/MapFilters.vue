<template>
  <div class="map-filters">
    <div
      v-for="filter in filters"
      :key="filter.name"
      class="filter"
      :class="{ 'active': filter.isActive }"
      @click="filter.action && filter.action(); toggleFilterActive(filter.value);"
    >
      <div
        class="filter-image"
        :style="filter.isActive ? {
          'background': filter.activeColor,
        }: ''"
      >
        <img
          :src="filter.icon"
          :alt="filter.name"
        >
      </div>
      <div class="filter-name">
        {{ filter.name }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import useMapFilters from './MapFilters'

export default {
  setup() {
    return useMapFilters()
  }
}
</script>

<style lang="scss" scoped>
@import 'MapFilters';
</style>
